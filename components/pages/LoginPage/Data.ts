type LoginField = {
  label: string;
  name: "email" | "password";
  type: string;
};

export const fields: LoginField[] = [
  { label: "Email", name: "email", type: "email" },
  { label: "Mật khẩu", name: "password", type: "password" },
];
