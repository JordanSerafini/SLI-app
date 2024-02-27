interface ToastProps {
    message: string;
  }
  
  function MiddleToast({ message }: ToastProps) {
    return (
      <div className="toast toast-middle toast-center z-50 text-sm ">
        <div className="alert alert-info bg-secondary text-accent ">
          <span>{message}</span>
        </div>
      </div>
    );
  }
  
  export default MiddleToast;