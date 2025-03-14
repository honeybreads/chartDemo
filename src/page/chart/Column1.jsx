import { memo } from "react";
// 차트 컴포넌트
import {
  BasicColumnChart,
  ParetoColumnChart,
  CurvedColumnChart,
  LineMixColumnChart,
  VarianceColumnChart,
  DragChangeValueChart,
  StepCountColumnChart,
  WaterfallColumnChart,
  RotateLabelColumnChart,
  DataSortingColumnChart,
  GrainyGradientColumnChart,
} from "@/components/chart/column/ColumnChart";
import { BarChart3 } from "lucide-react";

const Column1 = memo(function Column1() {
  return (
    <>
      <h2 className="chart-title"><BarChart3/>컬럼 차트1</h2>
      <div className="chart-layout">
        {/* 기본 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <BasicColumnChart />
          </div>
        </div>
        {/* 회전 라벨 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Rotated Label Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <RotateLabelColumnChart />
          </div>
        </div>
        {/* 드래그 값 조절 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Drag Change Value Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DragChangeValueChart />
          </div>
        </div>
        {/* 분산 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Variance Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <VarianceColumnChart />
          </div>
        </div>
        {/* 거친 그라데이션 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Grainy Gradient Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <GrainyGradientColumnChart />
          </div>
        </div>
        {/* 데이터 정렬 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Data Sorting Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <DataSortingColumnChart />
          </div>
        </div>
        {/* 파레토(?) 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Pareto Diagrem Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <ParetoColumnChart />
          </div>
        </div>
        {/* 라인 믹스 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Line Mix Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <LineMixColumnChart />
          </div>
        </div>
        {/* 커브 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Curved Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <CurvedColumnChart />
          </div>
        </div>
        {/* 스템 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Step Count Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <StepCountColumnChart />
          </div>
        </div>
        {/* 폭포 컬럼 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Waterfall Column Chart</p>
          <div className="chart-con" style={{ width: "100%", height: 340 }}>
            <WaterfallColumnChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Column1;
