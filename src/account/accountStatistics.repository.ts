import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class AccountStatisticsRepository {
  constructor(private prismaService: PrismaService) {}

  async createAccountStatistics(accountId: number): Promise<void> {
    await this.prismaService.accountStatistics.create({
      data: {
        lastOrderCompletedDate: null,
        numberOfCompletedOrders: 0,
        totalSpentInCents: 0,
        accountId,
      },
    });
  }
}
