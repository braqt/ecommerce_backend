import { Module } from '@nestjs/common';
import AccountController from './account.controller';
import AccountRepository from './account.repository';
import AccountStatisticsRepository from './accountStatistics.repository';
import AccountService from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, AccountStatisticsRepository],
  exports: [AccountRepository],
})
export class AccountModule {}
