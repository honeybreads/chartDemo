import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = -30;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    let change = Math.random() * 10 - 5;
    value += value <= -10 ? Math.abs(change) : change;
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(180);

// DifferentNegativeChart
export default function DifferentNegativeLineChart() {
  const id = "differentnegative-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, { wheelY: "zoomX" })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          cellStartLocation: 0.2,
          cellEndLocation: 0.8,
        }),
      })
    );
    xAxis.set("tooltip", am5.Tooltip.new(root, { themeTags: ["axis"] }));
    yAxis.set("tooltip", am5.Tooltip.new(root, { themeTags: ["axis"] }));

    // series 생성
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        valueXField: "date",
      })
    );
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });
    series.data.setAll(data);

    // range 생성
    const rangeDataItem = yAxis.makeDataItem({
      value: -9999,
      endValue: 0,
    });

    const range = series.createAxisRange(rangeDataItem);
    range.strokes.template.setAll({ stroke: colorList[1] });
    range.fills.template.setAll({
      opacity: 0.3,
      visible: true,
      fill: colorList[1],
    });

    // cursor 생성
    chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "zoomX", xAxis }));

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
