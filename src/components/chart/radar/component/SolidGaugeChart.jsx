import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Research",
    full: 100,
    value: 80,
  },
  {
    category: "Marketing",
    full: 100,
    value: 35,
  },
  {
    category: "Distribution",
    full: 100,
    value: 92,
  },
  {
    category: "Human Resources",
    full: 100,
    value: 68,
  },
];

export default function SolidGaugeChart() {
  const id = "solid-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 데이터 컬러 집어넣기
    data.map((_, index) => {
      data[index].columnSettings = { fill: colorList[index] };
    });

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        endAngle: 180,
        startAngle: -90,
        innerRadius: am5.percent(20),
        // wheelX: "panX",
        // wheelY: "zoomX",
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, { behavior: "zoomX" })
    );
    cursor.lineY.set("visible", false);

    // X축 생성
    const xRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: 0,
    });
    xRenderer.labels.template.setAll({ radius: 10 });
    xRenderer.grid.template.setAll({ forceHidden: true });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y축 생성
    const yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 10,
      strokeOpacity: 0,
    });
    yRenderer.labels.template.setAll({
      fontSize: 14,
      centerX: am5.p100,
      templateField: "columnSettings",
    });
    yRenderer.grid.template.setAll({ forceHidden: true });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      })
    );

    // RadarColumnSeries1 (빈) 생성
    const series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "category",
        fill: am5.color(theme === "light" ? "#ddd" : "#666"),
      })
    );

    series1.columns.template.setAll({
      fillOpacity: 1,
      cornerRadius: 20,
      strokeOpacity: 0,
    });

    // RadarColumnSeries2 (실제 값) 생성
    const series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      cornerRadius: 20,
      templateField: "columnSettings",
      tooltipText: "{category}: {valueX}%",
    });

    // 데이터 적용
    yAxis.data.setAll(data);
    series1.data.setAll(data);
    series2.data.setAll(data);

    // 애니메이션 적용
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}