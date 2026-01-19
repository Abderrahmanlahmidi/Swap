import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import {
  KAFKA_CONFIG,
  STRIPE_CONFIG,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
} from './constants/payment.constants';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    @Inject(KAFKA_CONFIG.KAFKA_SERVICE) private kafka: ClientKafka,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>(STRIPE_CONFIG.STRIPE_SECRET_KEY)!,
      {
        apiVersion: STRIPE_CONFIG.API_VERSION as any,
      },
    );
  }

  async processPayment(data: {
    orderId: string;
    amount: number;
    currency: string;
  }) {
    const intent = await this.stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      automatic_payment_methods: { enabled: true },
    });

    await this.prisma.payment.create({
      data: {
        orderId: data.orderId,
        amount: data.amount / 100,
        currency: data.currency,
        method: PAYMENT_METHODS.CARD,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        status: PAYMENT_STATUS.PENDING as any,
        stripePaymentIntentId: intent.id,
      },
    });

    this.kafka.emit(KAFKA_CONFIG.PAYMENT_RESULT_TOPIC, {
      orderId: data.orderId,
      paymentIntentId: intent.id,
      status: PAYMENT_STATUS.PENDING,
      clientSecret: intent.client_secret,
    });
  }
}
