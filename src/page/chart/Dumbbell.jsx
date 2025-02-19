import { memo } from "react";
// 차트 컴포넌트
import {
  BasicDumbbellChart,
  HorizontalDumbbellChart,
} from "@/components/chart/dumbbell/DumbbellChart";
import {
  BasicLollipopChart,
  HorizontalLollipopChart,
} from "@/components/chart/dumbbell/LollipopChart";

const Dumbbell = memo(function Dumbbell() {
  return (
    <>
      <h2 className="chart-title">덤벨 & 롤리팝 차트</h2>
      <div className="chart-layout">
        {/* 기본 덤벨 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Dumbbell Chart</p>
          <div className="chart-con" style={{width:"100%", height:420}}>
            <BasicDumbbellChart />
          </div>
        </div>
        {/* 가로형 덤벨 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Horizontal Dumbbell Chart</p>
          <div className="chart-con" style={{width:"100%", height:420}}>
            <HorizontalDumbbellChart />
          </div>
        </div>
        {/* 기본 롤리팝 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Lollipop Chart</p>
          <div className="chart-con" style={{width:"100%", height:420}}>
            <BasicLollipopChart />
          </div>
        </div>
        {/* 가로형 롤리팝 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Horizontal Lollipop Chart</p>
          <div className="chart-con" style={{width:"100%", height:420}}>
            <HorizontalLollipopChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Dumbbell;
