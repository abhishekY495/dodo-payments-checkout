import { useEffect } from "react";
import { CHECKOUT_STATUS } from "./utils/constants";
import { PaymentForm } from "./components/payment-form";

function App() {
  const params = new URLSearchParams(window.location.search);
  const parentOrigin = params.get("parentOrigin");

  useEffect(() => {
    if (parentOrigin) {
      window.parent.postMessage({ type: CHECKOUT_STATUS.READY }, parentOrigin);
    }
  }, [parentOrigin]);

  if (!parentOrigin) {
    return <div className="text-center py-5">Missing parent origin</div>;
  }

  return (
    <div className="bg-neutral-900 flex flex-col gap-5 justify-center h-full w-125 mx-auto">
      <PaymentForm parentOrigin={parentOrigin} />
    </div>
  );
}

export default App;
