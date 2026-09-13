export const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path
          fill="#4caf50"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        />
        <path
          fill="#ccff90"
          d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
        />
      </svg>
      <div className="text-center space-y-1">
        <p className="text-xl font-semibold text-white">Payment successful</p>
        <p className="text-sm text-neutral-400">
          Your payment has been processed
        </p>
      </div>
      <button className="bg-neutral-100 text-black text-sm font-semibold p-1 pb-1.5 px-5 rounded w-fit cursor-pointer">
        Done
      </button>
    </div>
  );
};
