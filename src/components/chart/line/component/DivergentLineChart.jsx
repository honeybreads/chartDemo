import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: new Date(2020, 0, 1).getTime(),
    observed: 0,
  },
  {
    date: new Date(2020, 1, 1).getTime(),
    observed: 4000,
  },
  {
    date: new Date(2020, 2, 1).getTime(),
    observed: 55000,
  },
  {
    date: new Date(2020, 3, 1).getTime(),
    observed: 220000,
  },
  {
    date: new Date(2020, 4, 1).getTime(),
    observed: 390000,
  },
  {
    date: new Date(2020, 5, 1).getTime(),
    observed: 550000,
  },
  {
    date: new Date(2020, 6, 1).getTime(),
    observed: 720000,
    easing: 720000,
    projection: 720000,
    stricter: 720000,
  },
  {
    date: new Date(2020, 7, 1).getTime(),
    easing: 900000,
    projection: 900000,
    stricter: 900000,
  },
  {
    date: new Date(2020, 8, 1).getTime(),
    easing: 1053000,
    projection: 1053000,
    stricter: 1053000,
  },
  {
    date: new Date(2020, 9, 1).getTime(),
    easing: 1252000,
    projection: 1249000,
    stricter: 1232000,
  },
  {
    date: new Date(2020, 10, 1).getTime(),
    easing: 1674000,
    projection: 1604000,
    stricter: 1415000,
  },
  {
    date: new Date(2020, 11, 1).getTime(),
    easing: 3212000,
    projection: 2342000,
    stricter: 1751000,
  },
];

// Key값 따로 카테고리로 분류 (date만 제거)
const category = [...new Set(data.flatMap(Object.keys))].splice(1);

// DivergentLineChart
export default function DivergentLineChart() {
  const id = "divergent-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    root.dateFormatter.setAll({
      dateFields: ["valueX"],
      dateFormat: "yyyy-MM-dd",
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        pinchZoomX: true,
        layout: root.verticalLayout,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성 함수
    const createSeries = (valueYField, name, color, dashed) => {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          stroke: color,
          valueYField,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            getFillFromSprite: false,
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{valueX}: [bold]{valueY}[/]",
          }),
        })
      );

      series.get("tooltip").get("background").setAll({
        fill: color,
        fillOpacity: 0.7,
        pointerBaseWidth: 0,
      });

      dashed && series.strokes.template.set("strokeDasharray", [5, 3]);
      series.data.setAll(data);
      series.appear(1000);

      return series;
    };

    // series 생성
    category.forEach((item, index) => {
      const lastCheck = index === category.length - 1;
      const valueYField = item;
      const name = item.charAt(0).toUpperCase() + item.slice(1);
      const color = lastCheck ? colorList[0] : colorList[index];
      const dashed = index === 0 ? false : true;
      createSeries(valueYField, name, color, dashed);
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.p50, x: am5.p50 })
    );
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
