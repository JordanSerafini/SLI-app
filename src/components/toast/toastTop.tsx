interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;