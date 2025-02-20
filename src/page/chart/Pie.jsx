import { memo } from "react";
import {
  SemiPieChart,
  BasicPieChart,
  BrokenPieChart,
  NestedPieChart,
  TwoLevelPieChart,
  ExplodingPieChart,
} from "@/components/chart/pie/PieChart";
import { PieChart } from "lucide-react";

const Pie = memo(function Pie() {
  return (
    <>
      <h2 className="chart-title"><PieChart/>파이 차트</h2>
      <div className="chart-layout">
        {/* 기본 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicPieChart />
          </div>
        </div>
        {/* 반쪽 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Semi Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <SemiPieChart />
          </div>
        </div>
        {/* 부서진(분할) 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Broken Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BrokenPieChart />
          </div>
        </div>
        {/* 2단 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Two Level Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <TwoLevelPieChart />
          </div>
        </div>
        {/* 중첩 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Nested Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <NestedPieChart />
          </div>
        </div>
        {/* 폭발하는(?) 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Exploding Pie Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ExplodingPieChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Pie;
