import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
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

// RadialGradientDonutChart
export default function RadialGradientDonutChart() {
  const id = "radialgradient-donut";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // height 설정
    const minHeight = root.dom.parentElement.style.minHeight;
    const baseHeight = Number(minHeight.split("px")[0]);
    root.dom.style.height = baseHeight + "px";

    // PieChart 생성
    const chartOptions = {
      x: am5.percent(50),
      width: baseHeight * 1.8,
      radius: am5.percent(90),
      centerX: am5.percent(50),
      innerRadius: am5.percent(50),
      layout: root.horizontalLayout,
    };
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        ...chartOptions,
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "item1",
        categoryField: "category",
      })
    );

    const fillGradient = am5.RadialGradient.new(root, {
      stops: [
        { brighten: -0.8 },
        { brighten: -0.8 },
        { brighten: -0.3 },
        { brighten: 0 },
        { brighten: -0.3 },
      ],
    });

    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);
    series.slices.template.setAll({
      fillGradient,
      stroke: 0,
      cornerRadius: 0,
    });

    // legend 생성
    const legendOptions = {
      x: undefined,
      centerX: undefined,
      y: am5.percent(50),
      centerY: am5.percent(50),
      layout: root.verticalLayout,
    };

    const legend = chart.children.push(
      am5.Legend.new(root, {
        ...legendOptions,
        ...themes.legnedBackground(root, theme),
      })
    );

    legend.valueLabels.template.setAll({ textAlign: "right" });
    legend.labels.template.setAll({ minWidth: 140, oversizedBehavior: "wrap" });

    // 데이터 적용
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear(1000, 100);
    legend.appear(1000, 100);

    // 반응형
    responsive.addRule({
      relevant: (width) => width < baseHeight * 2,
      applying: () => {
        root.dom.style.height = baseHeight * 1.8 + "px";
        chart.setAll({ layout: root.verticalLayout, width: baseHeight });
        legend.setAll({
          y: undefined,
          centerY: undefined,
          x: am5.percent(50),
          centerX: am5.percent(50),
        });
      },
      removing: () => {
        root.dom.style.height = baseHeight + "px";
        chart.setAll({ ...chartOptions });
        legend.setAll({ ...legendOptions });
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", minHeight: "100%" }} />;
}
