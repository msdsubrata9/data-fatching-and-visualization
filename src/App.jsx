import { useEffect, useState } from "react";
import { DATA_FATCHING_API_URL } from "./utils/constants";

function App() {
  const [frequency, setFrequency] = useState(undefined);
  const [yAxis, setYAxis] = useState([]);

  async function fetchData() {
    const data = await fetch(DATA_FATCHING_API_URL);
    const text = await data.text();
    const dataList = text.split("\n").filter(Boolean);
    const dataFrequency = {};
    dataList.forEach((data) => {
      if (dataFrequency[data]) dataFrequency[data] = dataFrequency[data] + 1;
      else dataFrequency[data] = 1;
    });
    setFrequency(dataFrequency);
  }

  useEffect(() => {
    if (frequency) {
      const maxi = Math.max(...Object.values(frequency));
      const maxValue = Math.ceil(maxi / 10) * 10;
      let arr = [];
      for (let i = maxValue / 10; i >= 0; i--) {
        arr.push(i * 10);
      }
      setYAxis(arr);
    }
  }, [frequency]);

  console.log(yAxis);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8">
        <div className="flex flex-row items-stretch">
          {/* Y-axis */}
          <div className="relative w-10 pr-6 border-r border-gray-300 mb-11">
            <div className="absolute inset-y-0 right-6 flex flex-col justify-between">
              {yAxis.map((label, idx) => (
                <div
                  key={idx}
                  className="text-gray-500 text-sm font-semibold text-right"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Bars container */}
          <div className="flex-1 pl-6">
            <div className="relative h-80 flex items-end">
              {frequency &&
                Object.entries(frequency).map(([key, value], index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 w-12 mx-4 flex justify-center items-end rounded-t-md transition-transform transform hover:scale-105"
                    style={{
                      height: `${
                        (value / Math.max(...Object.values(frequency))) * 100
                      }%`,
                    }}
                  >
                    <span className="absolute top-[-24px] text-xs text-blue-700 font-bold">
                      {value}
                    </span>
                  </div>
                ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-6">
              {frequency &&
                Object.entries(frequency).map(([key], index) => (
                  <div
                    key={index}
                    className="text-gray-700 text-sm font-semibold text-center"
                    style={{ width: "10%" }}
                  >
                    {key}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
