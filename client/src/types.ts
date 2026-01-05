export type User = {
    id: string;
    email: string;
  };
  
  export type AuthLoginResponse = {
    message: string;
    token: string;
    user: User;
  };
  
  export type AuthMeResponse = {
    user: User;
  };
  