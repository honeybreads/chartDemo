import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
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
];

// CurvedColumnChart
export default function CurvedColumnChart() {
  const id = "curved-column";
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
        paddingLeft: 0,
      })
    );

    // cursor 생성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        maxDeviation: 0.3,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.setAll({ location: 1 });
    xAxis.get("renderer").labels.template.setAll({ textAlign: "center" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    // series(차트 바) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series 1",
        valueYField: "value",
        categoryXField: "category",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      fillOpacity: 0.8,
      tooltipText: "{valueY}",
      width: am5.percent(120),
    });

    series.columns.template.adapters.add("fill", (_, target) =>
      chart.get("colors").getIndex(series.columns.indexOf(target))
    );

    series.columns.template.set("draw", (display, target) => {
      const w = target.getPrivate("width", 0);
      const h = target.getPrivate("height", 0);
      display.moveTo(0, h);
      display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0);
      display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h);
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
