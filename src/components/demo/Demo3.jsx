import {
  ShoppingBag,
  Coins,
  View,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import LineAndBarChart from "../chart/bar/LineAndBarChart";
import SmoothedStackedLineChart from "../chart/line/SmoothedStackedLineChart";
import SemiPieChart from "../chart/pie/SemiPieChart";
import PopulationPyramidChart from "../chart/xy/PopulationPyramidChart";

export default function Demo3() {
  return (
    <article className="demo">
      <div className="demo-head">
        <p className="demo-title">DEMO3</p>
      </div>
      <div className="demo-grid">
        <div className="demo-grid-item half bg-transparent border-0 gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: "Total Sales",
                value: "32,981",
                percent: 0.29,
                icon: <ShoppingBag size={20} strokeWidth={1} />,
                fill: "bg-blue-500",
              },
              {
                name: "Total Revenue",
                value: "$21,981",
                percent: 22.13,
                icon: <Coins size={20} strokeWidth={1} />,
                fill: "bg-orange-500",
              },
              {
                name: "Page Views",
                value: "44,981",
                percent: 13.45,
                icon: <View size={20} strokeWidth={1} />,
                fill: "bg-green-500",
              },
            ].map((item, index) => {
              const up = item.percent >= 20 ? true : false;
              return (
                <div
                  key={index}
                  className="flex justify-between bg-background rounded-md border border-solid border-border p-4"
                >
                  <div className="flex flex-col justify-between">
                    <p className="text-sm mb-3">{item.name}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${item.fill}`}
                    >
                      {item.icon}
                    </div>
                    <p
                      className={`flex items-end text-xs mb-1 gap-1 ${
                        up ? "text-red-500" : "text-blue-500"
                      }`}
                    >
                      {up ? (
                        <TrendingDown size={16} />
                      ) : (
                        <TrendingUp size={16} />
                      )}
                      {item.percent}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="demo-grid">
            <div className="demo-grid-item">
              <div className="demo-grid-item-head">
                <p className="demo-grid-item-title">Visitors Report</p>
              </div>
              <div
                className="demo-grid-chart"
                style={{ flex: 1, minHeight: 280 }}
              >
                <LineAndBarChart />
              </div>
            </div>
            <div className="demo-grid-item half">
              <div className="demo-grid-item-head">
                <p className="demo-grid-item-title">Order Statistics</p>
                <div className="demo-radio">
                  {["year", "month", "week"].map((item, index) => {
                    return (
                      <div className="demo-radio" key={index}>
                        <input
                          type="radio"
                          name="range"
                          id={item}
                          defaultChecked={item === "year" ? true : false}
                        />
                        <label htmlFor={item} className="demo-btn capitalize">
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="demo-grid-chart" style={{ height: 280 }}>
                <SmoothedStackedLineChart />
              </div>
            </div>
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">Reports Snapshot</p>
            <select>
              <option>Select Date</option>
            </select>
          </div>

          <div className="demo-grid-chart" style={{ minHeight: 220 }}>
            <SemiPieChart />
          </div>
          <div className="demo-grid-item-box p-0 divide-y divide-solid divide-border">
            {[
              {
                name: "Electronics",
                value: 1024,
                crease: "Increased",
                percent: 0.64,
              },
              {
                name: "Accessories",
                value: 420,
                crease: "Decreased",
                percent: 2.75,
              },
              {
                name: "Home Appliances",
                value: 278,
                crease: "Increased",
                percent: -2.6,
              },
            ].map((item, index) => {
              const up = item.percent >= 0 ? true : false;
              return (
                <div key={index} className="flex justify-between px-4 py-2">
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="flex text-gray-500 text-xs gap-1">
                      {item.crease} by
                      <span className="flex items-center">
                        {up ? (
                          <TrendingDown size={14} />
                        ) : (
                          <TrendingUp size={14} />
                        )}
                        {item.percent}%
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.value}</p>
                    <p className="text-xs">Sales</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="demo-grid-item full">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">Country Wise Sales</p>
          </div>
          <div
            className="demo-grid-chart"
            style={{ minHeight: 540, overflowX:"auto" }}
          >
            <PopulationPyramidChart />
          </div>
        </div>
      </div>
    </article>
  );
}
