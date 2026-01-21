// types/user.type.ts
import { RoleName } from "@/constants/role.constant";

export type User = {
  id: string;
  email: string;
  role: RoleName;
};
