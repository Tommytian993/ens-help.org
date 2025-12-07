interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  gradient?: string;
}

const SubmitButton = ({
  isLoading,
  text,
  loadingText,
  gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-100 btn btn-lg fw-semibold rounded-3 btn-hover-lift ${
        isLoading ? "btn-secondary" : ""
      }`}
      style={{
        background: isLoading ? "#ccc" : gradient,
        color: "white",
        border: "none",
        padding: "16px",
        boxShadow: isLoading
          ? "none"
          : "0 4px 15px rgba(102, 126, 234, 0.4)",
      }}
    >
      {isLoading ? (
        <span>
          <span
            className="d-inline-block me-2"
            style={{ animation: "spin 1s linear infinite" }}
          >
            ⏳
          </span>
          {loadingText}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
