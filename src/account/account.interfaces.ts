import { AccountWithAccountStatistics } from '../interfaces/account';

export interface GetAllAccountsResult {
  accounts: AccountWithAccountStatistics[];
  count: number;
}
