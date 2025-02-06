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

export default function GrainyGradientColumnChart() {
  const id = "gradientgrainy-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리, 값 필드 지정
    const categoryField = Object.keys(data[0])[0];
    const valueField = Object.keys(data[0])[1];

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

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {});

    xRenderer.grid.template.setAll({ location: 1 });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        maxDeviation: 0.3,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // series(그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        categoryXField: categoryField,
      })
    );

    const seriesGradient = am5.LinearGradient.new(root, {
      stops: [{}, { color: am5.color(0x000000) }],
    });

    const seriesPattern = am5.GrainPattern.new(root, {
      density: 0.5,
      maxOpacity: 0.15,
      colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)],
    });

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{categoryX}: {valueY}",
      shadowOpacity: 0.1,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 1,
      strokeWidth: 2,
      strokeOpacity: 1,
      stroke: am5.color(0xffffff),
      shadowColor: am5.color(0x000000),
      cornerRadiusTL: 50,
      cornerRadiusTR: 50,
      fillGradient: seriesGradient,
      fillPattern: seriesPattern,
    });

    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.states.create("hover", {
      shadowBlur: 10,
      shadowOpacity: 1,
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
