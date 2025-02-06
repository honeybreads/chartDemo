import { memo } from "react";
// 차트 컴포넌트
import { BasicWaffleChart } from "@/components/chart/waffle/WaffleChart";
import {
  BasicHeatMapChart,
  RiskHeatMapChart,
} from "@/components/chart/waffle/HeatMapChart";

const Waffle = memo(function Waffle() {
  return (
    <>
      <h2 className="chart-title">와플 & 히트맵 차트</h2>
      <div className="chart-layout">
        {/* 기본 와플 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Waffle Chart</p>
          <div className="chart-con">
            <BasicWaffleChart />
          </div>
        </div>
        {/* 기본 히트맵 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Heat Map Chart</p>
          <div className="chart-con">
            <BasicHeatMapChart />
          </div>
        </div>
        {/* 위험(?) 히트맵 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Risk Heat Map Chart</p>
          <div className="chart-con">
            <RiskHeatMapChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Waffle;
