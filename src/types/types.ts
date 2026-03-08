export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  image: string;
  role: string;
  phone?: string;
  age?: number;
  birthDate?: string;
}