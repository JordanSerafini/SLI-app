interface ToastProps {
  message: string;
  show: boolean; 
}

function MiddleToast({ message, show }: ToastProps) {
  return (
    <div className={show ? "toast toast-middle toast-center z-50 text-sm" : "hidden"}>
      <div className="alert alert-info bg-secondary text-accent">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default MiddleToast;
