import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "ONE",
    value: 190,
  },
  {
    category: "TWO",
    value: 110,
  },
  {
    category: "THREE",
    value: 250,
  },
  {
    category: "FOUR",
    value: 310,
  },
  {
    category: "FIVE",
    value: 120,
  },
];

// GrainyGradientDonutChart
export default function GrainyGradientDonutChart() {
  const id = "grainy-donut";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout: root.verticalLayout,
        innerRadius: am5.percent(60),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        endAngle: 270,
        valueField: "value",
        categoryField: "category",
      })
    );

    // series 스타일
    const gradient = am5.RadialGradient.new(root, {
      stops: [{}, { color: am5.color(0x666666) }, {}],
    });

    series.slices.template.setAll({
      stroke: themes.chartVariables[theme].line,
      strokeWidth: 2,
      cornerRadius: 6,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowOpacity: 0.1,
      fillGradient: gradient,
      shadowColor: am5.color(themes.chartVariables[theme].shadow),
      fillPattern: am5.GrainPattern.new(root, {
        density: 0.1,
        maxOpacity: 0.2,
        colors: [am5.color(0x444444)],
      }),
    });

    series.slices.template.states.create("hover", {
      shadowBlur: 10,
      shadowOpacity: 1,
    });

    series.states.create("hidden", { endAngle: -90 });

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legnedBackground(root, theme),
      })
    );

    // 범례 marker fill 제외한 옵션 제외
    ["fillGradient", "stroke", "fillPattern"].forEach((property) => {
      legend.markerRectangles.template.adapters.add(property, () => undefined);
    });

    //  데이터 적용
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    legend.appear(1000, 100);
    series.appear(1000, 100);

    // 반응형
    responsive.addRule({
      relevant: am5themes_Responsive.widthM,
      applying: () => {
        series.labels.template.setAll({ forceHidden: true });
        series.ticks.template.setAll({ forceHidden: true });
      },
      removing: () => {
        series.labels.template.setAll({ forceHidden: false });
        series.ticks.template.setAll({ forceHidden: false });
      },
    });

    // 초기화
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
