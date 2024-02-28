import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './strategy/firebaseAuth.strategy';

@Module({
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
