import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (var i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};
const data = createData(90);

// RangeSliderLineChart
export default function RangeSliderLineChart() {
  const id = "rangeslider-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, { paddingLeft: 0 })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        endLocation: 0.5,
        startLocation: 0.5,
        baseInterval: { count: 1, timeUnit: "day" },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
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
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });

    // 데이터 적용
    series.data.setAll(data);

    // range 생성
    const rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
    const rangeTime = rangeDate.getTime();
    const seriesRangeDataItem = xAxis.makeDataItem({});
    const seriesRange = series.createAxisRange(seriesRangeDataItem);

    seriesRange.fills.template.setAll({
      opacity: 0.1,
      visible: true,
    });

    seriesRange.fills.template.set(
      "fillPattern",
      am5.LinePattern.new(root, {
        rotation: 45,
        strokeWidth: 2,
        width: 2000,
        height: 2000,
        color: colorList[0],
        fill: colorList[1],
      })
    );

    seriesRange.strokes.template.set("stroke", colorList[1]);
    xAxis.onPrivate("max", (value) => {
      seriesRangeDataItem.set("endValue", value);
      seriesRangeDataItem.set("value", rangeTime);
    });

    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
    range.set("value", rangeDate.getTime());
    range.get("grid").setAll({
      strokeWidth: 2,
      strokeOpacity: 1,
      stroke: colorList[0],
    });

    // range 핸들 생성
    const rangeHandle = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, { themeTags: ["icon"] }),
    });

    rangeHandle.adapters.add("y", () => 0);
    rangeHandle.adapters.add("x", (x) => {
      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });

    // 핸들 드래그 이벤트
    rangeHandle.events.on("dragged", () => {
      const x = rangeHandle.x();
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());
      const value = xAxis.positionToValue(position);

      range.set("value", value);
      seriesRangeDataItem.set("value", value);
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
    });
    range.set("bullet", am5xy.AxisBullet.new(root, { sprite: rangeHandle }));

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
