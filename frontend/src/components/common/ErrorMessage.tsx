interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="alert alert-danger d-flex align-items-center mb-4 rounded-3 animate-shake" role="alert">
      <span className="me-2">⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
