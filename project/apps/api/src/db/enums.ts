export const Role = {
  ADMIN: 'ADMIN',
  PRO_USER: 'PRO_USER',
  USER: 'USER',
} as const;
export type Role = (typeof Role)[keyof typeof Role];
