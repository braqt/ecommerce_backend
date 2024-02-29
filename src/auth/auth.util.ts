import { Role } from './auth.enum';

export const matchRoles = (role: string, requiredRoles: Role[]) => {
  for (const r of requiredRoles) {
    if (role === r) {
      return true;
    }
  }
  return false;
};
