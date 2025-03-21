import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [];

for (let i = 1; i < 21; i++) {
  data.push({ category: i, value: Math.round(Math.random() * 100) });
}

// RadialHistogramRadarChart
export default function RadialHistogramRadarChart() {
  const id = "radialhistogram-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        endAngle: 264,
        startAngle: -84,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        innerRadius: am5.percent(40),
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // x,y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: am5radar.AxisRendererCircular.new(root, {
          minGridDistance: 30,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );

    xAxis
      .get("renderer")
      .labels.template.setAll({ oversizedBehavior: "truncate" });
    xAxis.get("renderer").labels.template.adapters.add("width", (_, target) => {
      return themes.axisLabelSetWidth(xAxis, target);
    });

    xAxis.get("renderer").grid.template.set("forceHidden", true);
    yAxis.get("renderer").labels.template.set("centerX", am5.p50);

    // series 생성
    const series = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series 1",
        valueYField: "value",
        categoryXField: "category",
        sequencedInterpolation: true,
      })
    );

    series.columns.template.setAll({
      cornerRadius: 5,
      tooltipText: "{categoryX}: {valueY}",
    });

    series.columns.template.adapters.add("fill", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (_, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);
    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
