import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  1957: [
    {
      category: "Belgium",
      value: 21589623,
    },
    {
      category: "France",
      value: 37413000,
    },
    {
      category: "Germany",
      value: 43190556,
    },
  ],
  1981: [
    {
      category: "Greece",
      value: 10724599,
    },
  ],
  1986: [
    {
      category: "Portugal",
      value: 20196707,
    },
    {
      category: "Spain",
      value: 36722980,
    },
  ],
  1995: [
    {
      category: "Austria",
      value: 8902600,
    },
    {
      category: "Finland",
      value: 5523231,
    },
    {
      category: "Sweden",
      value: 10379295,
    },
  ],
  2004: [
    {
      category: "Cyprus",
      value: 11207359,
    },
    {
      category: "Czech Republic",
      value: 10708981,
    },
  ],
  2007: [
    {
      category: "Bulgaria",
      value: 6971487,
    },
    {
      category: "Romania",
      value: 19286123,
    },
  ],
};

// NestedPieChart
export default function NestedPieChart() {
  const id = "nested-pie";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 설정
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series1.labels.template.setAll({ forceHidden: true });
        series1.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series1.labels.template.setAll({ forceHidden: false });
        series1.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // series (내부 그룹) 생성
    const series0 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "value",
        categoryField: "group",
        radius: am5.percent(60),
        innerRadius: am5.percent(15),
      })
    );

    series0.ticks.template.setAll({ forceHidden: true });
    series0.labels.template.setAll({
      radius: -10,
      text: "{category}",
      textType: "radial",
      centerX: am5.percent(100),
      fill: themes.chartVariables[theme].base,
    });

    series0.slices.template.setAll({
      strokeWidth: 2,
      toggleKey: "none",
      fill: themes.chartVariables[theme].grid,
      stroke: themes.chartVariables[theme].line,
    });

    series0.slices.template.states.create("hover", { scale: 1 });
    series0.slices.template.states.create("active", { shiftRadius: 0 });

    // series (외부) 생성
    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        radius: am5.percent(90),
        innerRadius: am5.percent(62),
      })
    );

    series1.slices.template.setAll({
      strokeWidth: 2,
      stroke: themes.chartVariables[theme].line,
      templateField: "settings",
    });

    series1.labels.template.setAll({
      text: "{category}",
    });

    // 데이터 가공
    let innerData = [];
    let outerData = [];
    am5.object.each(data, (group, items) => {
      let total = 0;
      am5.array.each(items, (item) => {
        total += item["value"];
        outerData.push(item);
      });

      const innerDataSample = {};
      innerDataSample["group"] = group;
      innerDataSample["value"] = total;
      innerData.push(innerDataSample);
    });

    // 데이터 적용
    series0.data.setAll(innerData);
    series1.data.setAll(outerData);

    // 애니메이션 적용
    series0.appear(1000, 100);
    series1.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
