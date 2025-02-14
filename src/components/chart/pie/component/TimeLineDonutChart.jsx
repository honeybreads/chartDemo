import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  2000: [
    { category: "One", value: 6.6 },
    { category: "Two", value: 0.6 },
    { category: "Three", value: 23.2 },
    { category: "Four", value: 2.2 },
    { category: "Five", value: 4.5 },
  ],
  2001: [
    { category: "One", value: 12 },
    { category: "Two", value: 2 },
    { category: "Three", value: 11.2 },
    { category: "Four", value: 4.2 },
    { category: "Five", value: 7.5 },
  ],
  2002: [
    { category: "One", value: 6.6 },
    { category: "Two", value: 0.6 },
    { category: "Three", value: 23.2 },
    { category: "Four", value: 2.2 },
    { category: "Five", value: 4.5 },
  ],
};

export default function TimelineDonutChart() {
  const id = "timeline-donut";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data[Object.keys(data)[0]].length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 정의
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({ textType: "circular" });
      },
      removing: () => {
        series.labels.template.setAll({ textType: "adjusted", radius: 10 });
      },
    });

    // 테마 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(60),
        layout: root.verticalLayout,
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    // 연도 Label 생성
    const label = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        fontSize: 48,
        fontWeight: 500,
      })
    );

    // 데이터(연도) 초기 적용
    const firstYear = Object.keys(data)[0];
    const lastYear = Object.keys(data)[Object.keys(data).length - 1];
    let currentYear = firstYear;
    series.data.setAll(data[currentYear]);

    // 데이터(연도) 전환 함수
    const getCurrentData = () => {
      let newData = data[currentYear];
      currentYear++;
      if (currentYear > lastYear) currentYear = firstYear;
      return newData;
    };

    // 차트 루프 함수
    const loop = () => {
      label.set("text", currentYear);
      let data = getCurrentData();
      for (let i = 0; i < data.length; i++) {
        series.data.setIndex(i, data[i]);
      }
      chart.setTimeout(loop, 4000);
    };

    // 루프 실행
    loop();

    // 애니메이션 적용
    label.appear(1000, 100);
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
