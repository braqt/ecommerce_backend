import { Body, Controller, Get, Post } from '@nestjs/common';
import AccountDto from './dto/account.dto';
import AccountRepository from './account.repository';
import AccountStatisticsRepository from './accountStatistics.repository';
import { GetAccountDto, GetAccountsDto } from './dto/getAccounts.dto';

@Controller('accounts')
export default class AccountController {
  constructor(
    private accountRepository: AccountRepository,
    private accountStatistics: AccountStatisticsRepository,
  ) {}

  @Post('create')
  async createAccount(@Body() accountDto: AccountDto) {
    const user = await this.accountRepository.createAccount(accountDto);
    await this.accountStatistics.createAccountStatistics(user.id);
  }

  @Get('getAllAccounts')
  async getAllAccounts(@Body() getAccountsDto: GetAccountsDto) {
    const { accounts, count } =
      await this.accountRepository.getAllAccounts(getAccountsDto);
    const pageNumberLimit = Math.ceil(count / getAccountsDto.pageSize);
    return { accounts, pageNumberLimit };
  }

  @Get('getAccount')
  async getAccount(@Body() getAccountDto: GetAccountDto) {
    const account = await this.accountRepository.getAccount(getAccountDto);
    return account;
  }
}
