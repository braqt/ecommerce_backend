import { Module } from '@nestjs/common';
import AccountController from './account.controller';
import AccountRepository from './account.repository';
import AccountStatisticsRepository from './accountStatistics.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountRepository, AccountStatisticsRepository],
  exports: [AccountRepository],
})
export class AccountModule {}
