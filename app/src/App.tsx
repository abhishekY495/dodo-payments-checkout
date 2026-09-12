import { useEffect } from "react";
import { CHECKOUT_STATUS } from "./utils/constants";

const params = new URLSearchParams(window.location.search);
const parentOrigin = params.get("parentOrigin") ?? "*";

function App() {
  useEffect(() => {
    window.parent.postMessage({ type: CHECKOUT_STATUS.READY }, parentOrigin);
  }, []);

  const handleSuccess = () => {
    window.parent.postMessage(
      { type: CHECKOUT_STATUS.SUCCESS, sessionId: `sess_456456` },
      parentOrigin,
    );
  };

  return (
    <div
      style={{
        background: "#ddd",
      }}
    >
      <h1>Checkout</h1>
      <button onClick={handleSuccess}>Fake Payment Success</button>
    </div>
  );
}

export default App;
