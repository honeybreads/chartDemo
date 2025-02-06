import { memo } from "react";
import {
  SemiPieChart,
  BasicPieChart,
  BrokenPieChart,
  NestedPieChart,
  TwoLevelPieChart,
  ExplodingPieChart,
} from "@/components/chart/pie/PieChart";

const Pie = memo(function Pie() {
  return (
    <>
      <h2 className="chart-title">파이 차트</h2>
      <div className="chart-layout">
        {/* 기본 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Pie Chart</p>
          <div className="chart-con">
            <BasicPieChart />
          </div>
        </div>
        {/* 반쪽 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Semi Pie Chart</p>
          <div className="chart-con">
            <SemiPieChart />
          </div>
        </div>
        {/* 부서진(분할) 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Broken Pie Chart</p>
          <div className="chart-con">
            <BrokenPieChart />
          </div>
        </div>
        {/* 2단 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Two Level Pie Chart</p>
          <div className="chart-con">
            <TwoLevelPieChart />
          </div>
        </div>
        {/* 중첩 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Nested Pie Chart</p>
          <div className="chart-con">
            <NestedPieChart />
          </div>
        </div>
        {/* 폭발하는(?) 파이 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Exploding Pie Chart</p>
          <div className="chart-con">
            <ExplodingPieChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Pie;
