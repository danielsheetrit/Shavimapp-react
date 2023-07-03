export interface IRegisterForm {
  username: string;
  firstName: string;
  lastName: string;
  workGroup: number;
  userType: string;
  password: string;
  verifiedPassword: string;
  [key: string]: any;
}
