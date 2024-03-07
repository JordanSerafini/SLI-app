
function DisconnectButton() {
  const handleDisconnect = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <button onClick={handleDisconnect}>Se déconnecter</button>
  );
}

export default DisconnectButton;
