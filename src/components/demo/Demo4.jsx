import { Home } from "lucide-react";
import BasicPieChart from "../chart/pie/BasicPieChart";
import LineMixColumnChart from "../chart/column/LineMixColumnChart";
import ReversedValueLineChart from "../chart/line/ReversedValueLineChart";
import ChordDiagramChart from "../chart/etc/ChordDiagramChart";
import BasicRadarChart from "../chart/radar/BasicRadarChart";
import BasicBarChart from "../chart/bar/BasicBarChart";

export default function Demo4() {
  return (
    <article className="demo">
      <div className="demo-head">
        <p className="demo-title">DEMO4</p>
        <ul className="demo-breadcrumb">
          <li>
            <Home size={14} />
          </li>
          <li>Demo</li>
          <li>Demo2</li>
        </ul>
      </div>
      <div className="demo-grid">
        <div className="demo-grid-item md">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트1</p>
            <select>
              <option>셀렉트 샘플</option>
            </select>
          </div>
          <div className="demo-grid-chart" style={{ height: 330 }}>
            <BasicBarChart />
          </div>
        </div>
        <div className="demo-grid-item md">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트2</p>
            <div className="demo-radio">
              <input type="radio" name="demo" id="demo1" defaultChecked />
              <label htmlFor="demo1">ON</label>
              <input type="radio" name="demo" id="demo2" />
              <label htmlFor="demo2">OFF</label>
            </div>
          </div>
          <div className="demo-grid-chart" style={{ height: 250 }}>
            <LineMixColumnChart />
          </div>
          <div className="demo-grid-item-box">
            <div className="flex divide-x divide-solid divide-border">
              <div className="flex items-center flex-col flex-1">
                <p className="text-sm text-gray-400">Income</p>
                <p className="text-2xl font-bold ">30</p>
              </div>
              <div className="flex items-center flex-col flex-1">
                <p className="text-sm text-gray-400">Expenses</p>
                <p className="text-2xl font-bold">35</p>
              </div>
            </div>
          </div>
        </div>
        <div className="demo-grid-item full" style={{ height: "auto" }}>
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트3</p>
          </div>
          <div
            className="demo-grid-chart"
            style={{ height: 320, flex: "none" }}
          >
            <ReversedValueLineChart />
          </div>
          <div className="demo-grid-item-box flex flex-col">
            <p className="pb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              tempore, ullam repudiandae, reiciendis officiis aliquid tenetur
              perferendis repellendus earum similique qui accusantium libero,
              veritatis id et? Nihil nobis eaque ut?
            </p>
            <table className="demo-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Name</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Ave</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Italy", min: 1, max: 5, ave: 4 },
                  { name: "Germany", min: 1, max: 5, ave: 4 },
                  { name: "Uk", min: 1, max: 6, ave: 5 },
                ].map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.min}</td>
                      <td>{item.max}</td>
                      <td>{item.ave}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트4</p>
          </div>
          <div className="demo-grid-chart" style={{ height: 300 }}>
            <BasicPieChart />
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트5</p>
          </div>
          <div className="demo-grid-chart" style={{ height: 250 }}>
            <BasicRadarChart />
          </div>
        </div>
        <div className="demo-grid-item">
          <div className="demo-grid-item-head">
            <p className="demo-grid-item-title">차트6</p>
          </div>
          <div className="demo-grid-chart" style={{ height: 250 }}>
            <ChordDiagramChart />
          </div>
        </div>
      </div>
    </article>
  );
}
