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

// DifferentStrokeLineChart
export default function DifferentStrokeLineChart() {
  const id = "differentstroke-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet, lineColors } = themes[colorTheme];
    const colorList = colorSet(0);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 데이터 값의 상,하에 따라 색상 적용
    data.map((item, index) => {
      if (index !== 0) {
        const colorNum = data[index - 1].value >= item.value ? 0 : 1;
        data[index - 1].strokeSettings = {
          stroke: lineColors.lineStroke[colorNum],
        };
      }
    });

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
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );
    series.strokes.template.set("templateField", "strokeSettings");

    // tooltip 색상 설정
    const tooltip = series.get("tooltip");
    tooltip.label.adapters.add("fill", () => "#fff");
    tooltip.get("background").adapters.add("fill", (fill) => {
      if (tooltip.dataItem) {
        return tooltip.dataItem.dataContext.strokeSettings.stroke;
      }
      return fill;
    });

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
