interface ToastProps {
  message: string;
}

function TopToast({ message }: ToastProps) {
  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-info bg-secondary text-accent">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default TopToast;