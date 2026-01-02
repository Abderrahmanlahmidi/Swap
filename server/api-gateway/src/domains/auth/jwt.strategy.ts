import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // Note: Use the same secret as auth-service ('untoZUw4pz1hDy0DJ1tS8Zni8p')
    const jwtSecret = process.env.JWT_SECRET || 'untoZUw4pz1hDy0DJ1tS8Zni8p';

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ]),
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: any) {
    // The payload will be available as req.user
    return payload;
  }
}
