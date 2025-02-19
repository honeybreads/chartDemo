import { memo } from "react";
// 차트 컴포넌트
import {
  HoneycombChart,
  PictogramChart,
  InfograpicChart,
  CarbonZeroChart,
  BasicWaffleChart,
  RiskHeatMapChart,
  BasicHeatMapChart,
  BasicWordCloudChart,
} from "@/components/chart/etc/EtcChart";

const Etc = memo(function Etc() {
  return (
    <>
      <h2 className="chart-title">기타 차트</h2>
      <div className="chart-layout">
        {/* 기본 히트맵 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Heat Map Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicHeatMapChart />
          </div>
        </div>
        {/* 위험(?) 히트맵 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Risk Heat Map Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <RiskHeatMapChart />
          </div>
        </div>
        {/* carbon 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">CarbonZero Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 240 }}>
            <CarbonZeroChart />
          </div>
        </div>
        {/* 픽토그램 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Pictogram Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <PictogramChart />
          </div>
        </div>
        {/* 인포그래픽 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Infograpic Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 420 }}>
            <InfograpicChart />
          </div>
        </div>
        {/* 기본 와플 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Waffle Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicWaffleChart />
          </div>
        </div>
        {/* 기본 워드 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Word Cloud Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicWordCloudChart />
          </div>
        </div>
        {/* 벌집 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Honeycomb Chart</p>
          {/* 높이와 넓이 비율 고정으로 인해 차트 자체에서 높이와 넓이를 지정 */}
          <div className="chart-con" style={{ width: "100%", height: "auto" }}>
            <HoneycombChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Etc;
