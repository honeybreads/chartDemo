import { memo } from "react";
import {
  ViolinChart,
  ScatterChart,
  FillToXyChart,
  PictorialChart,
  BasicMekkoChart,
  PopulationPyramidChart,
  IrregularInterverChart,
} from "@/components/chart/xy/XyChart";

const Xy = memo(function Xy() {
  return (
    <>
      <h2 className="chart-title">XY 차트</h2>
      <div className="chart-layout">
        {/* 기본 메코(?) 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Mekko Chart</p>
          <div className="chart-con">
            <BasicMekkoChart />
          </div>
        </div>
        {/* 불규칙한 간격 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Irregular Interver Chart</p>
          <div className="chart-con">
            <IrregularInterverChart />
          </div>
        </div>
        {/* 채워진 XY 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Fills to the Axis Chart</p>
          <div className="chart-con">
            <FillToXyChart />
          </div>
        </div>
        {/* 산점도 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Scatter Chart</p>
          <div className="chart-con">
            <ScatterChart />
          </div>
        </div>
        {/* 바이올린 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Violin Chart</p>
          <div className="chart-con">
            <ViolinChart />
          </div>
        </div>
        {/* 바이올린 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Violin Chart</p>
          <div className="chart-con">
            <PopulationPyramidChart />
          </div>
        </div>
        {/* 픽토리얼(?) 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Pictorial Chart</p>
          <div className="chart-con">
            <PictorialChart />
          </div>
        </div>
        
      </div>
    </>
  );
});

export default Xy;
