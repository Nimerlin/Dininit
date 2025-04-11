export const Pricing = () => {
    return (
      <div className="mt-28">
        <h1 className="text-center text-6xl max-sm:text-5xl font-bold">
          Packages
        </h1>
        <div className="flex sm:space-x-4 max-sm:space-y-4 max-sm:flex-col">
          <div className="flex-1 text-xl mt-14 rounded-xl border border-[#9966FF]/25 bg-[#1A1528] p-10 w-full">
            <div className="text-[#9966FF]">Basic Plan</div>
            <div className="text-6xl my-5 font-light">$600</div>
            <div>
              Short description
            </div>
            <button
              className="my-5 w-full text-white p-5 max-sm:p-2 rounded-3xl bg-indigo-600 text-xl max-sm:text-lg hover:bg-indigo-700 transition-all"
            >
              Purchase
            </button>
            <ul>
              <li>First feature</li>
              <li>Second feature</li>
            </ul>
          </div>
          <div
            className="flex-1 text-xl mt-14 rounded-xl border border-[#9966FF]/25 bg-[#120D1D] p-10 w-full"
          >
            <div className="text-[#8257E6]">Advanced Plan</div>
            <div className="text-6xl my-5 font-light">$1500</div>
            <div>
              Short Description
            </div>
            <button
              className="my-5 w-full text-white p-5 max-sm:p-2 rounded-3xl bg-indigo-600 text-xl max-sm:text-lg hover:bg-indigo-700 transition-all"
            >
              Purchase
            </button>
            <ul>
              <li>First Feature</li>
              <li>Second Feature</li>
              <li>Third Feature</li>
            </ul>
          </div>
          <div
            className="flex-1 text-xl mt-14 rounded-xl border border-[#9966FF]/25 bg-[#0A0812] p-10 w-full"
          >
            <div className="text-[#6B48CD]">Ultimate Plan</div>
            <div className="text-6xl my-5 font-light">$1800</div>
            <div>
              Short Description
            </div>
            <button
              className="my-5 w-full text-white p-5 max-sm:p-2 rounded-3xl bg-indigo-600 text-xl max-sm:text-lg hover:bg-indigo-700 transition-all"
            >
              Purchase
            </button>
            <ul>
              <li>First Feature</li>
              <li>Second Feature</li>
              <li>Third Feature</li>
              <li>Fourth Feature</li>
              <li>Fifth Feature</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };