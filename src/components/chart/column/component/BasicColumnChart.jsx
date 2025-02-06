import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { date: new Date(2024, 11, 1).getTime(), value: 10 },
  { date: new Date(2024, 11, 2).getTime(), value: 100 },
  { date: new Date(2024, 11, 3).getTime(), value: 32 },
  { date: new Date(2024, 11, 4).getTime(), value: 24 },
  { date: new Date(2024, 11, 5).getTime(), value: 55 },
  { date: new Date(2024, 11, 6).getTime(), value: 56 },
  { date: new Date(2024, 11, 7).getTime(), value: 31 },
  { date: new Date(2024, 11, 8).getTime(), value: 13 },
  { date: new Date(2024, 11, 9).getTime(), value: 44 },
  { date: new Date(2024, 11, 10).getTime(), value: 78 },
  { date: new Date(2024, 11, 11).getTime(), value: 10 },
  { date: new Date(2024, 11, 12).getTime(), value: 100 },
  { date: new Date(2024, 11, 13).getTime(), value: 32 },
  { date: new Date(2024, 11, 14).getTime(), value: 24 },
  { date: new Date(2024, 11, 15).getTime(), value: 55 },
  { date: new Date(2024, 11, 16).getTime(), value: 56 },
  { date: new Date(2024, 11, 17).getTime(), value: 31 },
  { date: new Date(2024, 11, 18).getTime(), value: 13 },
  { date: new Date(2024, 11, 19).getTime(), value: 44 },
  { date: new Date(2024, 11, 20).getTime(), value: 78 },
];

export default function BasicColumnChart() {
  const id = "basic-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: { timeUnit: "day", count: 1 },
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
