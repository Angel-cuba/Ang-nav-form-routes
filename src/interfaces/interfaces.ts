export interface User{
  id: number;
  name: string;
  email: string;
  password: string;
  date: string;
}

export interface UserLogin{
  id: number;
  username: string;
  password: string;
  role: string;
}