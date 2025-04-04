import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { numbers: "One", value: 10 },
  { numbers: "Two", value: 9 },
  { numbers: "Three", value: 6 },
  { numbers: "Four", value: 5 },
  { numbers: "Five", value: 4 },
  { numbers: "Six", value: 3 },
  { numbers: "Seven", value: 1 },
];

// BasicPieChart
export default function BasicPieChart() {
  const id = "basic-pie";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 개별 반응형 설정
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({ forceHidden: true });
        series.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series.labels.template.setAll({ forceHidden: false });
        series.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // PieSeries 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "numbers",
      })
    );
    series.data.setAll(data);
    series.appear(1000, 100);

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legnedBackground(root, theme),
      })
    );

    legend.data.setAll(series.dataItems);
    legend.appear(1000, 100);

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicPieCodeblock = `import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { numbers: "One", value: 10 },
  { numbers: "Two", value: 9 },
  { numbers: "Three", value: 6 },
  { numbers: "Four", value: 5 },
  { numbers: "Five", value: 4 },
  { numbers: "Six", value: 3 },
  { numbers: "Seven", value: 1 },
];

// BasicPieChart
export default function BasicPieChart() {
  const id = "basic-pie";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 개별 반응형 설정
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({ forceHidden: true });
        series.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series.labels.template.setAll({ forceHidden: false });
        series.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // PieSeries 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "numbers",
      })
    );
    series.data.setAll(data);
    series.appear(1000, 100);

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legnedBackground(root, theme),
      })
    );

    legend.data.setAll(series.dataItems);
    legend.appear(1000, 100);

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`