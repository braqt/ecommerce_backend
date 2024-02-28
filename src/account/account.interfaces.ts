export interface Account {
  firebaseAuthID: string;
  firstName: string;
  lastName: string;
  phone: string;
  documentNumber: string;
  email: string;
  role: string;
}

export interface AccountStatistics {
  totalSpentInCents: bigint;
  lastOrderCompletedDate: Date | null;
  numberOfCompletedOrders: number;
}

export interface AccountWithId extends Account {
  id: number;
}

export interface AccountWithAccountStatistics extends Account {
  accountStatistics: AccountStatistics;
}

export interface GetAllAccountsResult {
  accounts: AccountWithAccountStatistics[];
  count: number;
}
