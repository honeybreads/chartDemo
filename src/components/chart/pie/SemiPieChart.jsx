import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
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

// SemiPieChart
export default function SemiPieChart() {
  const id = "semi-pie";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    //  PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 360,
        startAngle: 180,
        x: am5.percent(50),
        width: am5.percent(100),
        centerX: am5.percent(50),
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        endAngle: 360,
        startAngle: 180,
        alignLabels: false,
        valueField: "value",
        categoryField: "numbers",
      })
    );

    series.slices.template.states.create("hover", { scale: 1 });
    series.slices.template.setAll({ cornerRadius: 4 });
    series.states.create("hidden", { endAngle: 180, startAngle: 180 });
    series.labels.template.adapters.add("width", (_, target) => {
      return themes.seriesSetMaxWidth(target);
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);

    // 반응형 적용
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({
          textType: "circular",
          oversizedBehavior: "truncate",
        });
        series.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series.labels.template.setAll({
          textType: "adjusted",
          oversizedBehavior: "none",
        });
        series.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const SemiPieCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
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

// SemiPieChart
export default function SemiPieChart() {
  const id = "semi-pie";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    //  PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 360,
        startAngle: 180,
        x: am5.percent(50),
        width: am5.percent(100),
        centerX: am5.percent(50),
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        endAngle: 360,
        startAngle: 180,
        alignLabels: false,
        valueField: "value",
        categoryField: "numbers",
      })
    );

    series.slices.template.states.create("hover", { scale: 1 });
    series.slices.template.setAll({ cornerRadius: 4 });
    series.states.create("hidden", { endAngle: 180, startAngle: 180 });
    series.labels.template.adapters.add("width", (_, target) => {
      return themes.seriesSetMaxWidth(target);
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);

    // 반응형 적용
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({
          textType: "circular",
          oversizedBehavior: "truncate",
        });
        series.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series.labels.template.setAll({
          textType: "adjusted",
          oversizedBehavior: "none",
        });
        series.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`