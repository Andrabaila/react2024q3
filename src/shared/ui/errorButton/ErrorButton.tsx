const ErrorButton = () => {
  const handleError = () => {
    window.location.href = '/error';
  };

  return (
    <button className="text-red-500 border border-current" onClick={handleError}>
      Error
    </button>
  );
};

export default ErrorButton;
