export interface Account {
  firebaseAuthID: string;
  firstName: string;
  lastName: string;
  phone: string;
  documentNumber: string;
  email: string;
}

export interface AccountStatistics {
  totalSpentInCents: number;
  lastOrderCompletedDate: Date | null;
  numberOfCompletedOrders: number;
}

export interface AccountWithId extends Account {
  id: number;
}

export interface AccountWithAccountStatistics extends Account {
  accountStatistics: AccountStatistics;
}
