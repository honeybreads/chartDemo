import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 50;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    if (value <= 20) value += Math.random() * 10;
    if (value > 80 || value > 50) value -= Math.random() * 10;
    return Math.round(value);
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(180);

// HorizontalTargetLineChart
export default function HorizontalTargetLineChart() {
  const id = "horizontaltarget-line";
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
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { count: 1, timeUnit: "day" },
        endLocation: 0.5,
        startLocation: 0.5,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });

    // range series 생성
    const rangeValue = 40;
    const rangeEndValue = -100;
    const rangeColor = am5.color("#aaa");
    const seriesRangeDataItem = yAxis.makeDataItem({
      value: rangeValue,
      endValue: rangeEndValue,
    });
    const seriesRange = series.createAxisRange(seriesRangeDataItem);

    seriesRange.strokes.template.set("stroke", rangeColor);
    seriesRange.fills.template.setAll({
      visible: true,
      fill: rangeColor,
      fillOpacity: 0.5,
    });

    seriesRangeDataItem.get("grid").setAll({
      layer: 2,
      visible: true,
      strokeWidth: 2,
      strokeOpacity: 1,
      stroke: colorList[0],
    });

    seriesRangeDataItem.get("label").setAll({
      layer: 2,
      centerX: 0,
      location: 0,
      inside: true,
      visible: true,
      text: "Target",
      centerY: am5.p100,
      fontWeight: "bold",
    });

    // range 툴팁 배경 색상 처리
    series.get("tooltip").events.on("dataitemchanged", (e) => {
      const value = e.newDataItem.dataContext.value;
      if (value < rangeValue) {
        series
          .get("tooltip")
          .get("background")
          .adapters.add("fill", () => rangeColor);
      } else {
        series
          .get("tooltip")
          .get("background")
          .adapters.add("fill", () => series.get("fill"));
      }
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
