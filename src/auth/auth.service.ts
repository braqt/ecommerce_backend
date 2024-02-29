import { Injectable } from '@nestjs/common';
import AuthRepository from './auth.repository';

@Injectable()
export default class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async getAccountByFirebaseUID(firebaseUID: string) {
    return this.authRepository.getAccountByFirebaseUID(firebaseUID);
  }
}
