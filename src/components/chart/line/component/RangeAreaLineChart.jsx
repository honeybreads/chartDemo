import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 20;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    const value = randomValue();
    data.push({
      date: date.getTime(),
      value: value,
      open: value + Math.random() * 20 + 10,
    });
  }
  return data;
};

const data = createData(90);

// RangeAreaLineChart
export default function RangeAreaLineChart() {
  const id = "rangearea-line";
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

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { count: 1, timeUnit: "day" },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const createSeries = (valueYField, openValueYField) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          valueYField,
          openValueYField,
          name: "Series",
          valueXField: "date",
          stroke: colorList[0],
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series
        .get("tooltip")
        .get("background")
        .adapters.add("fill", () => colorList[0]);
      return series;
    };

    const series1 = createSeries("value", "open");
    const series2 = createSeries("open", false);
    series1.fills.template.setAll({ fillOpacity: 0.3, visible: true });

    // data 적용
    series1.data.setAll(data);
    series2.data.setAll(data);

    // 애니메이션 적용
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
