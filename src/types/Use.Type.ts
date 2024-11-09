export type TSession = {
  id: string | number | null;
  username?: string;
  email?: string;
  token: string | number | null;
} | null;

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  username: string;
  email: string;
  password: string;
  fisrtName:string;
  lastName:string;
  phone:string;
}

export type TUser = {
  id?: string;
  username?: string;
  email?: string;
}