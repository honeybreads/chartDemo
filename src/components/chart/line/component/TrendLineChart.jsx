import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: "2012-01-01",
    value: 8,
  },
  {
    date: "2012-01-02",
    value: 10,
  },
  {
    date: "2012-01-03",
    value: 12,
  },
  {
    date: "2012-01-04",
    value: 14,
  },
  {
    date: "2012-01-05",
    value: 11,
  },
  {
    date: "2012-01-06",
    value: 6,
  },
  {
    date: "2012-01-07",
    value: 7,
  },
  {
    date: "2012-01-08",
    value: 9,
  },
  {
    date: "2012-01-09",
    value: 13,
  },
  {
    date: "2012-01-10",
    value: 15,
  },
  {
    date: "2012-01-11",
    value: 19,
  },
  {
    date: "2012-01-12",
    value: 21,
  },
  {
    date: "2012-01-13",
    value: 22,
  },
  {
    date: "2012-01-14",
    value: 20,
  },
  {
    date: "2012-01-15",
    value: 18,
  },
  {
    date: "2012-01-16",
    value: 14,
  },
  {
    date: "2012-01-17",
    value: 16,
  },
  {
    date: "2012-01-18",
    value: 18,
  },
  {
    date: "2012-01-19",
    value: 17,
  },
  {
    date: "2012-01-20",
    value: 15,
  },
  {
    date: "2012-01-21",
    value: 12,
  },
  {
    date: "2012-01-22",
    value: 10,
  },
  {
    date: "2012-01-23",
    value: 8,
  },
];

// TrendLineChart
export default function TrendLineChart() {
  const id = "trend-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"],
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        focusable: true,
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: false,
        maxDeviation: 0.5,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minGridDistance: 70,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: "date",
        valueYField: "value",
        minBulletDistance: 10,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );

    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        series.get("fill")
      );
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"],
    });

    // trendSeries 생성 함수수
    const createTrendLine = (data, color) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis,
          yAxis,
          stroke: color,
          valueXField: "date",
          valueYField: "value",
        })
      );

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ["date"],
        dateFormat: "yyyy-MM-dd",
      });

      series.data.setAll(data);
      series.appear(1000, 100);
    };

    // trendSeries 생성 
    createTrendLine([data[1], data[10]], colorList[1]);
    createTrendLine([data[16], data[20]], colorList[2]);

    // cursor 생성성
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
