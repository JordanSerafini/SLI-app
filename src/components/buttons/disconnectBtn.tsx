import url from "../../axios/url";



function DisconnectButton() {
  const handleDisconnect = async () => {
    await fetch(`${url.main}/invalidateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <button onClick={handleDisconnect}>Se déconnecter</button>
  );
}

export default DisconnectButton;
