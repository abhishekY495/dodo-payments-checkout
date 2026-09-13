import { useEffect } from "react";
import { CHECKOUT_STATUS } from "./utils/constants";
import { PaymentForm } from "./components/payment-form";

const params = new URLSearchParams(window.location.search);
const parentOrigin = params.get("parentOrigin") ?? "*";

function App() {
  useEffect(() => {
    window.parent.postMessage({ type: CHECKOUT_STATUS.READY }, parentOrigin);
  }, []);

  return (
    <div className="bg-neutral-900 flex flex-col gap-5 justify-center h-full w-125 mx-auto">
      <p className="text-2xl font-semibold">Complete Your Purchase</p>
      <PaymentForm />
    </div>
  );
}

export default App;
