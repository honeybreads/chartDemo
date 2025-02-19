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
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <BasicMekkoChart />
          </div>
        </div>
        {/* 불규칙한 간격 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Irregular Interver Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <IrregularInterverChart />
          </div>
        </div>
        {/* 채워진 XY 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Fills to the Axis Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <FillToXyChart />
          </div>
        </div>
        {/* 산점도 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Scatter Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <ScatterChart />
          </div>
        </div>
        {/* 바이올린 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Violin Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <ViolinChart />
          </div>
        </div>
        {/* 인구 피라미드 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Population Pyramid Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 620 }}>
            <PopulationPyramidChart />
          </div>
        </div>
        {/* 픽토리얼(?) 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Pictorial Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <PictorialChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Xy;
