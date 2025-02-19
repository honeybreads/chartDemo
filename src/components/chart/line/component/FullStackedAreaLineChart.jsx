import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "1994",
    cars: 1587,
    motorcycles: 650,
    bicycles: 121,
  },
  {
    year: "1995",
    cars: 1567,
    motorcycles: 683,
    bicycles: 146,
  },
  {
    year: "1996",
    cars: 1617,
    motorcycles: 691,
    bicycles: 138,
  },
  {
    year: "1997",
    cars: 1630,
    motorcycles: 642,
    bicycles: 127,
  },
  {
    year: "1998",
    cars: 1660,
    motorcycles: 699,
    bicycles: 105,
  },
  {
    year: "1999",
    cars: 1683,
    motorcycles: 721,
    bicycles: 109,
  },
  {
    year: "2000",
    cars: 1691,
    motorcycles: 737,
    bicycles: 112,
  },
  {
    year: "2001",
    cars: 1298,
    motorcycles: 680,
    bicycles: 101,
  },
  {
    year: "2002",
    cars: 1275,
    motorcycles: 664,
    bicycles: 97,
  },
  {
    year: "2003",
    cars: 1246,
    motorcycles: 648,
    bicycles: 93,
  },
  {
    year: "2004",
    cars: 1318,
    motorcycles: 697,
    bicycles: 111,
  },
  {
    year: "2005",
    cars: 1213,
    motorcycles: 633,
    bicycles: 87,
  },
  {
    year: "2006",
    cars: 1199,
    motorcycles: 621,
    bicycles: 79,
  },
  {
    year: "2007",
    cars: 1110,
    motorcycles: 210,
    bicycles: 81,
  },
  {
    year: "2008",
    cars: 1165,
    motorcycles: 232,
    bicycles: 75,
  },
  {
    year: "2009",
    cars: 1145,
    motorcycles: 219,
    bicycles: 88,
  },
  {
    year: "2010",
    cars: 1163,
    motorcycles: 201,
    bicycles: 82,
  },
  {
    year: "2011",
    cars: 1180,
    motorcycles: 285,
    bicycles: 87,
  },
  {
    year: "2012",
    cars: 1159,
    motorcycles: 277,
    bicycles: 71,
  },
];
const category = [...new Set(data.flatMap(Object.keys))].splice(1);

// FullStackedAreaLineChart
export default function FullStackedAreaLineChart() {
  const id = "fullstacked-line";
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
        pinchZoomX: true,
        layout: root.verticalLayout,
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
      am5xy.CategoryAxis.new(root, {
        endLocation: 0.5,
        startLocation: 0.5,
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    // series 생성 함수
    const createSeries = ( field) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: field,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueYField: field,
          categoryXField: "year",
          legendValueText: "{valueY}",
          valueYShow: "valueYTotalPercent",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText:
              "[bold]{name}[/]\n{categoryX}: {valueYTotalPercent.formatNumber('#.0')}% ({valueY})",
          }),
        })
      );

      series.fills.template.setAll({
        fillOpacity: 0.3,
        visible: true,
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    // series 생성
    category.map((item) => createSeries(item));
    
    // legend 생성성
    const legend = chart.children.push(
      am5.Legend.new(root, { x: am5.p50, centerX: am5.p50 })
    );

    // 데이터 적용
    xAxis.data.setAll(data);
    legend.data.setAll(chart.series.values);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
