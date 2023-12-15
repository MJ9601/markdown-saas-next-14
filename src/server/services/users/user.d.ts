export enum Role {
  normal = "normal",
  admin = "admin",
  premium = "premium",
}

export enum AuthProvider {
  google = "google",
  github = "github",
  credentials = "credentials",
}

export interface ICreateNewUser {
  name: string;
  email: string;
  password?: string;
  authProvider: AuthProvider[];
  providerId?: string;
  access: Role;
}
