// types/user.type.ts
import { RoleName } from "@/constants/role.constant";

export type User = {
  [x: string]: any;
  id: string;
  email: string;
  role: RoleName;
};
