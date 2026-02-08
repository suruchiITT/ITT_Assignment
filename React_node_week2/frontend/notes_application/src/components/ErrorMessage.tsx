type ErrorMessageProps = {
  messageText: string;
};

const ErrorMessage = ({ messageText }: ErrorMessageProps) => {
  if (!messageText) return null;

  return <div className="error-box">{messageText}</div>;
};

export default ErrorMessage;
