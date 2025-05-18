import { type ReactNode } from "react";

export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}

export interface AuthFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  renderError?: () => ReactNode | null;
  isLoading: boolean;
  isLogin?: boolean;
}
