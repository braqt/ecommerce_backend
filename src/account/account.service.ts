import { Injectable } from '@nestjs/common';
import {
  AccountWithAccountStatistics,
  AccountWithId,
  GetAllAccountsResult,
} from './account.interfaces';
import AccountRepository from './account.repository';
import AccountDto from './dto/account.dto';
import { GetAccountDto, GetAccountsDto } from './dto/getAccounts.dto';

@Injectable()
export default class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(
    firebaseUID: string,
    accountDto: AccountDto,
  ): Promise<AccountWithId> {
    return this.accountRepository.createAccount(firebaseUID, accountDto);
  }

  async getAccounts(
    getAccountsDto: GetAccountsDto,
  ): Promise<GetAllAccountsResult> {
    return this.accountRepository.getAccounts(getAccountsDto);
  }

  async getAccount(
    getAccountDto: GetAccountDto,
  ): Promise<AccountWithAccountStatistics> {
    return this.accountRepository.getAccount(getAccountDto.id);
  }

  async getAccountByFirebaseUID(firebaseUID: string): Promise<AccountWithId> {
    return this.accountRepository.getAccountByFirebaseAuthID(firebaseUID);
  }
}
