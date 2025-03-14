import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { date: new Date(2024, 11, 1).getTime(), value: 10 },
  { date: new Date(2024, 11, 2).getTime(), value: 20 },
  { date: new Date(2024, 11, 3).getTime(), value: 32 },
  { date: new Date(2024, 11, 4).getTime(), value: 44 },
  { date: new Date(2024, 11, 5).getTime(), value: 55 },
  { date: new Date(2024, 11, 6).getTime(), value: 62 },
  { date: new Date(2024, 11, 7).getTime(), value: 77 },
  { date: new Date(2024, 11, 8).getTime(), value: 89 },
  { date: new Date(2024, 11, 9).getTime(), value: 95 },
  { date: new Date(2024, 11, 10).getTime(), value: 100 },
];

// BasicBarChart
export default function BasicBarChart() {
  const id = "basic-bar";
  const { theme, colorTheme } = useTheme();
  // const theme="light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingLeft:0,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 0,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // series(그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        yAxis,
        xAxis,
        valueYField: "date",
        valueXField: "value",
      })
    );

    series.columns.template.setAll({
      cornerRadiusBL: 0,
      cornerRadiusTL: 0,
      cornerRadiusTR: themes.chartVariables.default.barRadius,
      cornerRadiusBR: themes.chartVariables.default.barRadius,
      tooltipX: am5.p100,
      tooltipText: "{valueX}",
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
