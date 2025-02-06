import { memo } from "react";
// 차트 컴포넌트
import { BasicDumbbellChart } from "@/components/chart/dumbbell/DumbbellChart";
const Dumbbell = memo(function Dumbbell() {
  return (
    <>
      <h2 className="chart-title">덤벨 & 롤리팝 차트</h2>
      <div className="chart-layout">
        {/* 기본 덤벨 차트 */}
        <div className="chart-layout-box">
          <p className="chart-layout-title">Basic Dumbbell Chart</p>
          <div className="chart-con">
            <BasicDumbbellChart />
          </div>
        </div>
      </div>
    </>
  );
});

export default Dumbbell;
