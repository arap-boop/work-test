export interface LoginProps {
  email: string;

  username: string;

  password: string;
}

export interface SignUpProps {
  email: string | null;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
}
