import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import AccountDto from './dto/account.dto';
import AccountStatisticsRepository from './accountStatistics.repository';
import { GetAccountDto, GetAccountsDto } from './dto/getAccounts.dto';
import { FirebaseAuthGuard } from '../auth/guard/firebaseAuth.guard';
import { GetFirebaseUser } from '../auth/decorator/getFirebaseUser.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import AccountService from './account.service';

@Controller('accounts')
export default class AccountController {
  constructor(
    private accountService: AccountService,
    private accountStatistics: AccountStatisticsRepository,
  ) {}

  @Post('create')
  @UseGuards(FirebaseAuthGuard)
  async createAccount(
    @Body() accountDto: AccountDto,
    @GetFirebaseUser() firebaseUser: DecodedIdToken,
  ) {
    const account = await this.accountService.createAccount(
      firebaseUser.uid,
      accountDto,
    );
    await this.accountStatistics.createAccountStatistics(account.id);
  }

  @Get('getAccounts')
  @UseGuards(FirebaseAuthGuard)
  async getAllAccounts(@Body() getAccountsDto: GetAccountsDto) {
    const { accounts, count } =
      await this.accountService.getAccounts(getAccountsDto);
    const pageNumberLimit = Math.ceil(count / getAccountsDto.pageSize);
    return { accounts, pageNumberLimit };
  }

  @Get('getAccount')
  @UseGuards(FirebaseAuthGuard)
  async getAccount(@Body() getAccountDto: GetAccountDto) {
    const account = await this.accountService.getAccount(getAccountDto);
    return account;
  }

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async me(@GetFirebaseUser() firebaseUser: DecodedIdToken) {
    const account = await this.accountService.getAccountByFirebaseUID(
      firebaseUser.uid,
    );
    delete account.role;
    delete account.firebaseAuthID;
    delete account.id;
    return account;
  }
}
