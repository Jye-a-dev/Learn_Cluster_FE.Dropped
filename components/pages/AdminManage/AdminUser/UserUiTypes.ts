// src/components/pages/AdminManage/AdminUser/types.ts

export type UserUI = {
  id: string;
  username: string;
  email: string;
  roleName?: string;
  created_at?: string;
  updated_at?: string;
};
export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
};