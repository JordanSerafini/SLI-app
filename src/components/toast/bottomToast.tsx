interface ToastProps {
    message: string;
  }
  
  function BottomToast({ message }: ToastProps) {
    return (
      <div className="toast toast-bottom toast-center z-50 text-sm ">
        <div className="alert alert-info bg-secondary text-accent ">
          <span>{message}</span>
        </div>
      </div>
    );
  }
  
  export default BottomToast;