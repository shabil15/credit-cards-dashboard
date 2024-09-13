import { useState } from "react";
import CreditCards from "./components/creditCards";
import Banks from "./components/banks";
import { BgLightGridGradient2 } from "./components/background";

function App() {
  const [selectedTab, setSelectedTab] = useState("creditCards");

  return (
    <div className="font-poppins h-screen flex flex-col">
      <BgLightGridGradient2 />
      
      {/* Tab buttons */}
      <div className="flex justify-start gap-x-2 p-4   border-b">
        <button
          className={`px-4 py-2 font-semibold shadow-lg rounded-3xl ${
            selectedTab === "creditCards" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("creditCards")}
        >
          Credit Cards
        </button>

        <button
          className={`px-4 py-2 font-semibold shadow-lg rounded-3xl ${
            selectedTab === "banks" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("banks")}
        >
          Banks
        </button>
      </div>

      {/* Conditional rendering based on the selected tab */}
      <div className="flex-grow px-4 overflow-auto">
        {selectedTab === "creditCards" && <CreditCards />}
        {selectedTab === "banks" && <Banks />}
      </div>
    </div>
  );
}

export default App;
