import UserStatistics from './userStatistics.model';

export default class User {
  id: number;
  firebaseAuthID: string;
  firstName: string;
  lastName: string;
  phone: string;
  documentNumber: string;
  email: string;
  userStatistics: UserStatistics;
}
