import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async getAccountByFirebaseUID(firebaseUID: string) {
    const query = {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
        role: true,
        accountStatistics: {
          select: {
            totalSpentInCents: true,
            numberOfCompletedOrders: true,
            lastOrderCompletedDate: true,
          },
        },
      },
      where: { firebaseAuthID: firebaseUID },
    };
    const account = await this.prismaService.account.findUnique(query);
    return account;
  }
}
