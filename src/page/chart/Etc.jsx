import { memo } from "react";
// 차트 컴포넌트
import {
  ExportingChart,
  HoneycombChart,
  PictogramChart,
  InfograpicChart,
  CarbonZeroChart,
  BasicWaffleChart,
  RiskHeatMapChart,
  VennDiagramChart,
  RangeBulletChart,
  BasicHeatMapChart,
  BasicPyramidChart,
  SentenceCloudChart,
  BasicWordCloudChart,
  ForceDirectedTreeChart,
  PatternsVennDiagramChart,
  BasicTreeChart,
  BasicTreemapChart,
} from "@/components/chart/etc/EtcChart";
import { Guitar } from "lucide-react";

const Etc = memo(function Etc() {
  return (
    <>
      <h2 className="chart-title">
        <Guitar />
        기타 차트
      </h2>
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
        {/* 피라미드 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Pyramid Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicPyramidChart />
          </div>
        </div>
        {/* 이미지 추출 기능 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Exporting Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <SentenceCloudChart />
          </div>
        </div>
        {/* 벤 다이어그램 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Venn Diagram Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <VennDiagramChart />
          </div>
        </div>
        {/* 패턴 벤 다이어그램 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Patterns Venn Diagram Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <PatternsVennDiagramChart />
          </div>
        </div>
        {/* 기본 트리 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Tree Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicTreeChart />
          </div>
        </div>
        {/* 힘 방향 트리 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Force Directed Tree Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ForceDirectedTreeChart />
          </div>
        </div>
        {/* 기본 트리 맵 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Tree Map Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicTreemapChart />
          </div>
        </div>
        {/* 범위 불렛 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Range Bullet Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 240 }}>
            <RangeBulletChart />
          </div>
        </div>
        {/* 이미지 추출 기능 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Exporting Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ExportingChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Etc;
