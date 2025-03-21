import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 1000;
  let volume = 100000;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = (value) => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", Math.random() * 5);
    data.push({
      date: date.getTime(),
      value: randomValue(value),
      volume: randomValue(volume),
    });
  }
  return data;
};

const data = createData(30);

// NoGapDateLineChart
export default function NoGapDateLineChart() {
  const id = "nogapdate-line";
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
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMin: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const volumeAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        panY: false,
        y: am5.percent(100),
        height: am5.percent(25),
        centerY: am5.percent(100),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });
    volumeAxis.get("renderer").grid.template.set("forceHidden", true);
    volumeAxis.get("renderer").labels.template.set("forceHidden", true);

    // series 생성
    const volumeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis: volumeAxis,
        valueXField: "date",
        valueYField: "volume",
        name: "Volume Series",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );

    volumeSeries.columns.template.setAll({
      fillOpacity: 1,
      cornerRadiusTL: 2,
      cornerRadiusTR: 2,
      width: am5.percent(60),
    });

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // data 적용
    series.data.setAll(data);
    volumeSeries.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
