import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성 함수
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

// MultipleValueAxesLineChart
export default function MultipleValueAxesLineChart() {
  const id = "multiplevalueaxes-line";
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
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        focusable: true,
        pinchZoomX: true,
        paddingLeft:0,
        paddingRight:0,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: false,
        maxDeviation: 0.1,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );

    // axis,series 생성 함수
    const createAxisAndSeries = (opposite) => {
      const yRenderer = am5xy.AxisRendererY.new(root, { opposite });
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: yRenderer,
        })
      );
      const nowIndex = chart.yAxes.indexOf(yAxis);
      const color = colorList[nowIndex];
      yRenderer.setAll({ opacity: 1, stroke: color, strokeOpacity: 1 });
      if (nowIndex > 0) yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));

      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
            pointerOrientation: "horizontal",
          }),
        })
      );

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(createData(100));
    };

    // axis,series 생성
    createAxisAndSeries(false);
    createAxisAndSeries(true);
    createAxisAndSeries(true);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { xAxis, behavior: "none" })
    );
    cursor.lineY.set("visible", false);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
