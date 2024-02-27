interface ToastProps {
  message: string;
  css: string;
}

function TopToast({ message, css }: ToastProps) {
  return (
    <div className="toast toast-top toast-center z-50 text-sm ">
      <div className={`alert alert-info bg-secondary text-accent ${css}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default TopToast;