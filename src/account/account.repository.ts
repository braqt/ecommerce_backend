import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AccountWithAccountStatistics,
  AccountWithId,
} from './account.interfaces';
import { Prisma } from '@prisma/client';
import { GetAllAccountsResult } from './account.interfaces';

@Injectable()
export default class AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async getAccount(id: number): Promise<AccountWithAccountStatistics> {
    const query = {
      select: {
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
        accountStatistics: {
          select: {
            totalSpentInCents: true,
            numberOfCompletedOrders: true,
            lastOrderCompletedDate: true,
          },
        },
      },
      where: { id },
    };
    const account = await this.prismaService.account.findUnique(query);
    return account;
  }

  async getAccountByFirebaseAuthID(
    firebaseAuthID: string,
  ): Promise<AccountWithId> {
    const query = {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
        accountStatistics: {
          select: {
            totalSpentInCents: true,
            numberOfCompletedOrders: true,
            lastOrderCompletedDate: true,
          },
        },
      },
      where: { firebaseAuthID },
    };
    const account = await this.prismaService.account.findUnique(query);
    return account;
  }

  async getAccounts(params: {
    pageNumber: number;
    pageSize: number;
    name: string;
  }): Promise<GetAllAccountsResult> {
    const query: Prisma.AccountFindManyArgs = {
      select: {
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
      },
      where: params.name
        ? {
            OR: [
              { firstName: { contains: params.name } },
              { lastName: { contains: params.name } },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
      skip: params.pageSize * (params.pageNumber - 1),
      take: params.pageSize,
    };
    const [accounts, count] = await this.prismaService.$transaction([
      this.prismaService.account.findMany({
        ...query,
        select: {
          ...query.select,
          accountStatistics: {
            select: {
              totalSpentInCents: true,
              numberOfCompletedOrders: true,
              lastOrderCompletedDate: true,
            },
          },
        },
      }),
      this.prismaService.account.count({ where: query.where }),
    ]);
    return { accounts, count };
  }

  async createAccount(
    firebaseUID: string,
    accountParams: {
      firstName: string;
      lastName: string;
      phone: string;
      documentNumber: string;
      role: string;
      email: string;
    },
  ): Promise<AccountWithId> {
    const account = await this.prismaService.account.create({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
      },
      data: {
        ...accountParams,
        firebaseAuthID: firebaseUID,
      },
    });

    return account;
  }
}
