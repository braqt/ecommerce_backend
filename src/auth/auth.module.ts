import { Global, Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './strategy/firebaseAuth.strategy';
import AuthService from './auth.service';
import AuthRepository from './auth.repository';

@Global()
@Module({
  providers: [FirebaseAuthStrategy, AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
