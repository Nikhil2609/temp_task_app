import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || `524340837487-kbmrqlrj4bo5fnvo7oasf2r66ruqrvar.apps.googleusercontent.com`,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || `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`  ,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const user = {
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      googleId: id,
    };
    done(null, user);
  }
} 