export const KAFKA_CONFIG = {
    KAFKA_SERVICE: 'KAFKA_SERVICE',
    PAYMENT_RESULT_TOPIC: 'payment.result',
} as const;

export const STRIPE_CONFIG = {
    STRIPE_SECRET_KEY: 'STRIPE_SECRET_KEY',
    API_VERSION: '2023-10-16',
} as const;

export const PAYMENT_STATUS = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
} as const;

export const PAYMENT_METHODS = {
    CARD: 'card',
} as const;
