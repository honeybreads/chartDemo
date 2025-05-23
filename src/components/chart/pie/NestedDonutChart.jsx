import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import { myThemeRule } from "@/assets/chartTheme";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Lithuania",
    item1: 501.9,
    item2: 1500,
  },
  {
    category: "Czech Republic",
    item1: 301.9,
    item2: 990,
  },
  {
    category: "Ireland",
    item1: 201.1,
    item2: 785,
  },
  {
    category: "Germany",
    item1: 165.8,
    item2: 255,
  },
  {
    category: "Australia",
    item1: 139.9,
    item2: 452,
  },
  {
    category: "Austria",
    item1: 128.3,
    item2: 332,
  },
  {
    category: "UK",
    item1: 99,
    item2: 150,
  },
  {
    category: "Belgium",
    item1: 60,
    item2: 178,
  },
  {
    category: "The Netherlands",
    item1: 50,
    item2: 50,
  },
];

// NestedDonutChart
export default function NestedDonutChart() {
  const id = "nested-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // series 생성
    const series0 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "item1",
        categoryField: "category",
        radius: am5.percent(65),
        innerRadius: am5.percent(35),
      })
    );

    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        valueField: "item2",
        categoryField: "category",
        radius: am5.percent(100),
        innerRadius: am5.percent(70),
      })
    );
    series0.ticks.template.setAll({ forceHidden: true });
    series0.labels.template.setAll({ forceHidden: true });
    series0.slices.template.set("toggleKey", "none");

    // series 공통
    const seriesGroup = [series0, series1];
    seriesGroup.map((series) => {
      series.slices.template.setAll({
        stroke: themes.chartVariables[theme].line,
        strokeWidth: 2,
        cornerRadius: 0,
      });

      // 데이터 적용
      series.data.setAll(data);

      // 애니메이션 적용
      series.appear(1000, 100);
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 8,
        visible: false,
        ...themes.legendBackground(root, theme),
      })
    );
    legend.data.setAll(series1.dataItems);

    // 반응형
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series1.labels.template.setAll({ forceHidden: true });
        series1.ticks.template.setAll({ forceHidden: true });
        legend.setAll({ visible: true });
      },
      removing: () => {
        series1.labels.template.setAll({ forceHidden: false });
        series1.ticks.template.setAll({ forceHidden: false });
        legend.setAll({ visible: false });
      },
    });

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const NestedDonutCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import { myThemeRule } from "@/assets/chartTheme";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Lithuania",
    item1: 501.9,
    item2: 1500,
  },
  {
    category: "Czech Republic",
    item1: 301.9,
    item2: 990,
  },
  {
    category: "Ireland",
    item1: 201.1,
    item2: 785,
  },
  {
    category: "Germany",
    item1: 165.8,
    item2: 255,
  },
  {
    category: "Australia",
    item1: 139.9,
    item2: 452,
  },
  {
    category: "Austria",
    item1: 128.3,
    item2: 332,
  },
  {
    category: "UK",
    item1: 99,
    item2: 150,
  },
  {
    category: "Belgium",
    item1: 60,
    item2: 178,
  },
  {
    category: "The Netherlands",
    item1: 50,
    item2: 50,
  },
];

// NestedDonutChart
export default function NestedDonutChart() {
  const id = "nested-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // series 생성
    const series0 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "item1",
        categoryField: "category",
        radius: am5.percent(65),
        innerRadius: am5.percent(35),
      })
    );

    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        valueField: "item2",
        categoryField: "category",
        radius: am5.percent(100),
        innerRadius: am5.percent(70),
      })
    );
    series0.ticks.template.setAll({ forceHidden: true });
    series0.labels.template.setAll({ forceHidden: true });
    series0.slices.template.set("toggleKey", "none");

    // series 공통
    const seriesGroup = [series0, series1];
    seriesGroup.map((series) => {
      series.slices.template.setAll({
        stroke: themes.chartVariables[theme].line,
        strokeWidth: 2,
        cornerRadius: 0,
      });

      // 데이터 적용
      series.data.setAll(data);

      // 애니메이션 적용
      series.appear(1000, 100);
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 8,
        visible: false,
        ...themes.legendBackground(root, theme),
      })
    );
    legend.data.setAll(series1.dataItems);

    // 반응형
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series1.labels.template.setAll({ forceHidden: true });
        series1.ticks.template.setAll({ forceHidden: true });
        legend.setAll({ visible: true });
      },
      removing: () => {
        series1.labels.template.setAll({ forceHidden: false });
        series1.ticks.template.setAll({ forceHidden: false });
        legend.setAll({ visible: false });
      },
    });

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
