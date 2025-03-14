import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

const data = [
  {
    category: "USA",
    value: 2025,
  },
  {
    category: "China",
    value: 1882,
  },
  {
    category: "Japan",
    value: 1809,
  },
  {
    category: "Germany",
    value: 1322,
  },
  {
    category: "UK",
    value: 1122,
  },
  {
    category: "France",
    value: 1114,
  },
  {
    category: "India",
    value: 984,
  },
  {
    category: "Spain",
    value: 711,
  },
  {
    category: "Netherlands",
    value: 665,
  },
  {
    category: "South Korea",
    value: 443,
  },
  {
    category: "Canada",
    value: 441,
  },
];

// RotateLabelColumnChart
export default function RotateLabelColumnChart() {
  const id = "rotatelabel-column";
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
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingBottom: 0,
        paddingLeft: 0,
      })
    );

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // x,y 축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 14,
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

    xAxis.get("renderer").labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 10,
    });

    // series(그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "category",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{valueY}",
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
