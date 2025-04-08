import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { numbers: "Lithuania", value: 10 },
  { numbers: "Czechia", value: 9 },
  { numbers: "Ireland", value: 6 },
  { numbers: "Germany", value: 4 },
  { numbers: "Australia", value: 2 },
];

// BasicDonutChart
export default function BasicDonutChart() {
  const id = "basic-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "value",
        categoryField: "numbers",
      })
    );

    series.slices.template.setAll({ cornerRadius: 0 });
    series.labels.template.setAll({
      centerX: 0,
      centerY: 0,
      textType: "circular",
      templateField: "settings",
      oversizedBehavior: "truncate",
    });

    series.labels.template.adapters.add("width", (_, target) => {
      return themes.seriesSetMaxWidth(target);
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legendBackground(root, theme),
      })
    );

    // 데이터 적용
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear(1000);
    legend.appear(1000);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const BasicDonutCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { numbers: "Lithuania", value: 10 },
  { numbers: "Czechia", value: 9 },
  { numbers: "Ireland", value: 6 },
  { numbers: "Germany", value: 4 },
  { numbers: "Australia", value: 2 },
];

// BasicDonutChart
export default function BasicDonutChart() {
  const id = "basic-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "value",
        categoryField: "numbers",
      })
    );

    series.slices.template.setAll({ cornerRadius: 0 });
    series.labels.template.setAll({
      centerX: 0,
      centerY: 0,
      textType: "circular",
      templateField: "settings",
      oversizedBehavior: "truncate",
    });

    series.labels.template.adapters.add("width", (_, target) => {
      return themes.seriesSetMaxWidth(target);
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legendBackground(root, theme),
      })
    );

    // 데이터 적용
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear(1000);
    legend.appear(1000);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`