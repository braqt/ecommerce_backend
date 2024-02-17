import AccountStatistics from './accountStatistics.model';

export default class Account {
  id: number;
  firebaseAuthID: string;
  firstName: string;
  lastName: string;
  phone: string;
  documentNumber: string;
  email: string;
  accountStatistics?: AccountStatistics;
}
