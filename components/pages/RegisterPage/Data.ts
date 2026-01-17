type RegisterField = {
  label: string;
  name: "username" | "email" | "password";
  type: string;
};

export  const fields: RegisterField[] = [
    { label: "Tên người dùng", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mật khẩu", name: "password", type: "password" },
  ];