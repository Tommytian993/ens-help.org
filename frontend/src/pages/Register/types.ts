export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface RegisterState {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  errorMessage: string | null;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  focusedField: string | null;
}
