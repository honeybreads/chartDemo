import {
  TrendingUp,
  PieChart,
  Eye,
  FileBarChart,
  LucideAreaChart,
  TrendingDown,
  CircleDashed
} from "lucide-react";
import LineMixColumnChart from "../chart/column/LineMixColumnChart";
import DifferentNegativeLineChart from "../chart/line/DifferentNegativeLineChart";
import CurvedColumnChart from "../chart/column/CurvedColumnChart";
import HeatmapBubbleChart from "../chart/bubble/HeatmapBubbleChart";

export default function Demo2() {
  return (
    <article className="demo">
      <div className="demo-head">
        <p className="demo-title">DEMO2</p>
      </div>
      <div className="demo-grid">
        <div className="demo-grid-item half">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">
              Reports Snapshot
              <span className="block text-xs text-gray-400">
                Demographic properties of your customer
              </span>
            </p>
            <select>
              <option>Select Date</option>
            </select>
          </div>
          <div className="grid gap-4 px-4 pb-4 grid-cols-2 sm:grid-cols-4">
            {[
              {
                name: "Total",
                value: 10234,
                fill: "bg-violet-500",
                text: "text-violet-100",
              },
              {
                name: "Event Count",
                value: 536,
                fill: "bg-amber-500",
                text: "text-amber-100",
              },
              {
                name: "Conversations",
                value: 21,
                fill: "bg-sky-500",
                text: "text-sky-100",
              },
              {
                name: "New User",
                value: 3321,
                fill: "bg-emerald-500",
                text: "text-emerald-100",
              },
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between flex-1 p-3 ${item.fill} rounded overflow-hidden relative`}
                >
                  <p className="text-sm text-white break-words">{item.name}</p>
                  <span className={`${item.text} font-bold`}>
                    {item.value.toLocaleString()}
                  </span>
                  <CircleDashed size={42} className="absolute -top-3 -right-3 text-white/80"/>
                </div>
              );
            })}
          </div>
          <div className="demo-grid-chart" style={{ minHeight: 280, flex: 1 }}>
            <DifferentNegativeLineChart />
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">
              Users
              <span className="block text-xs text-gray-400">
                In Last 30 Minutes
              </span>
            </p>
            <p className="flex font-bold text-2xl text-red-500">
              36
              <TrendingUp />
            </p>
          </div>
          <div className="demo-grid-chart my-0" style={{ height: 180 }}>
            <LineMixColumnChart />
          </div>
          <div className="demo-grid-item-box pt-0 border-t-0">
            <table className="demo-table">
              <thead>
                <tr>
                  <th>Top5 Countries</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Bangladesh", value: 5 },
                  { name: "India", value: 6 },
                  { name: "Pakistan", value: 4 },
                  { name: "Australia", value: 10 },
                  { name: "America", value: 8 },
                ].map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        {item.value >= 10 ? item.value : "0" + item.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="demo-grid-item border-0 bg-transparent md grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "Sessions",
              icon: <PieChart size={12} />,
              value: "6,132",
              percentage: 150,
            },
            {
              name: "Page Views",
              icon: <Eye size={12} />,
              value: "11,236",
              percentage: 200,
            },
            {
              name: "Avg. Duration",
              icon: <FileBarChart size={12} />,
              value: "46s",
              percentage: 30,
            },
            {
              name: "Bounce Rate",
              icon: <LucideAreaChart size={12} />,
              value: "46s",
              percentage: 22,
            },
          ].map((item, index) => {
            const up = item.percentage >= 100 ? true : false;
            return (
              <div
                key={index}
                className="bg-background rounded-md border border-solid border-border p-4 relative"
              >
                <p className="text-sm">{item.name}</p>
                <p className="text-xl my-2 font-bold">{item.value}</p>
                <p
                  className={`flex gap-1 text-xs font-bold ${
                    up ? "text-red-500" : "text-sky-500"
                  }`}
                >
                  {item.percentage}%
                  {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                </p>
                <p className="text-xs">vs Previous 30 Days</p>
                <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center border border-border border-solid rounded-full">
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>
        <div className="demo-grid-item md">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">Device Breakdown</p>
          </div>
          <div className="demo-grid-chart my-0" style={{ minHeight: 220 }}>
            <CurvedColumnChart />
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">Top 10 Referrals</p>
          </div>
          <div className="demo-grid-item-box p-0 border-t-0">
            <ul>
              {[
                { name: "Facebook", link: "www.facebook.com", value: 4963 },
                { name: "Instagram", link: "www.instagram.com", value: 2963 },
                { name: "Dribble", link: "www.dribble.com", value: 1963 },
                { name: "LinkedIn", link: "www.linkedin.com", value: 963 },
                { name: "GitHub", link: "www.github.com", value: 663 },
                { name: "Behance", link: "www.behance.com", value: 363 },
                { name: "Twitter", link: "www.twitter.com", value: 333 },
                { name: "Pinterest", link: "www.pinterest.com", value: 293 },
                { name: "WhatsApp", link: "www.whatsapp.com", value: 213 },
                { name: "Reddit", link: "www.reddit.com", value: 113 },
              ].map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between border-t border-solid border-border py-1.5 px-4 hover:bg-border"
                  >
                    <p className="flex flex-col">
                      <b className="text-sm capitalize font-bold">
                        {item.name}
                      </b>
                      <span className="text-xs font-normal text-gray-500">
                        {item.link}
                      </span>
                    </p>
                    <p className="flex font-bold text-lg">
                      {item.value}
                      <Eye
                        size={16}
                        className="ml-1 fill-green-500 stroke-green-200"
                      />
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="demo-grid-item half">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">Visiting Hours</p>
          </div>
          <div className="demo-grid-chart" style={{ flex: 1, minHeight: 320 }}>
            <HeatmapBubbleChart />
          </div>
        </div>
      </div>
    </article>
  );
}
