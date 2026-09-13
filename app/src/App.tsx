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
    <div className="bg-neutral-900 flex flex-col justify-center h-full w-125 mx-auto">
      <div>
        <p>Enter your payment details to complete your order.</p>
      </div>
      {/*  */}
      <div>
        <span>Card Information</span>
        <div>
          <div>
            <input
              type="number"
              placeholder="1234 1234 1234 1234"
              className="w-full border border-neutral-700 rounded-t-md"
            />
          </div>
          <div className="flex">
            <input
              type="number"
              placeholder="MM / YY"
              className="w-full border border-neutral-700 rounded-bl-md"
            />
            <input
              type="number"
              placeholder="CVC"
              className="w-full border border-neutral-700 rounded-br-md"
            />
          </div>
        </div>
      </div>
      {/*  */}
      <button
        onClick={handleSuccess}
        className="bg-neutral-200 text-black font-semibold p-1 pb-1.5 rounded w-full cursor-pointer hover:bg-neutral-300"
      >
        Pay
      </button>
    </div>
  );
}

export default App;
