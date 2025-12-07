export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginState {
  username: string;
  password: string;
  errorMessage: string | null;
  isLoading: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  focusedField: string | null;
}
