import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AccountDto from './dto/account.dto';
import {
  AccountWithAccountStatistics,
  AccountWithId,
} from '../interfaces/account';
import { GetAccountDto, GetAccountsDto } from './dto/getAccounts.dto';
import { Prisma } from '@prisma/client';
import { GetAllAccountsResult } from './account.interfaces';

@Injectable()
export default class AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async getAccount(
    getAccountDto: GetAccountDto,
  ): Promise<AccountWithAccountStatistics> {
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
      where: { id: getAccountDto.id },
    };
    const account = await this.prismaService.account.findUnique(query);
    return account;
  }

  async getAllAccounts(
    getAccountsDto: GetAccountsDto,
  ): Promise<GetAllAccountsResult> {
    const query: Prisma.AccountFindManyArgs = {
      select: {
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phone: true,
        firebaseAuthID: true,
      },
      where: getAccountsDto.name
        ? {
            OR: [
              { firstName: { contains: getAccountsDto.name } },
              { lastName: { contains: getAccountsDto.name } },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
      skip: getAccountsDto.pageSize * (getAccountsDto.pageNumber - 1),
      take: getAccountsDto.pageSize,
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

  async createAccount(accountDto: AccountDto): Promise<AccountWithId> {
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
        ...accountDto,
      },
    });

    return account;
  }
}
