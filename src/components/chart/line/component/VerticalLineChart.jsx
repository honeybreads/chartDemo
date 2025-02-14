import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
var data = [
  {
    date: "2012-12-24",
    value: 55,
  },
  {
    date: "2012-12-25",
    value: 52,
  },
  {
    date: "2012-12-26",
    value: 54,
  },
  {
    date: "2012-12-27",
    value: 50,
  },
  {
    date: "2012-12-28",
    value: 50,
  },
  {
    date: "2012-12-29",
    value: 51,
  },
  {
    date: "2012-12-30",
    value: 52,
  },
  {
    date: "2012-12-31",
    value: 58,
  },
  {
    date: "2013-01-01",
    value: 60,
  },
  {
    date: "2013-01-02",
    value: 67,
  },
  {
    date: "2013-01-03",
    value: 64,
  },
  {
    date: "2013-01-04",
    value: 66,
  },
  {
    date: "2013-01-05",
    value: 60,
  },
  {
    date: "2013-01-06",
    value: 63,
  },
  {
    date: "2013-01-07",
    value: 61,
  },
  {
    date: "2013-01-08",
    value: 60,
  },
  {
    date: "2013-01-09",
    value: 65,
  },
  {
    date: "2013-01-10",
    value: 75,
  },
  {
    date: "2013-01-11",
    value: 77,
  },
  {
    date: "2013-01-12",
    value: 78,
  },
  {
    date: "2013-01-13",
    value: 70,
  },
  {
    date: "2013-01-14",
    value: 70,
  },
  {
    date: "2013-01-15",
    value: 73,
  },
  {
    date: "2013-01-16",
    value: 71,
  },
  {
    date: "2013-01-17",
    value: 74,
  },
  {
    date: "2013-01-18",
    value: 78,
  },
  {
    date: "2013-01-19",
    value: 85,
  },
  {
    date: "2013-01-20",
    value: 82,
  },
  {
    date: "2013-01-21",
    value: 83,
  },
  {
    date: "2013-01-22",
    value: 88,
  },
  {
    date: "2013-01-23",
    value: 85,
  },
  {
    date: "2013-01-24",
    value: 85,
  },
  {
    date: "2013-01-25",
    value: 80,
  },
  {
    date: "2013-01-26",
    value: 87,
  },
  {
    date: "2013-01-27",
    value: 84,
  },
  {
    date: "2013-01-28",
    value: 83,
  },
  {
    date: "2013-01-29",
    value: 84,
  },
  {
    date: "2013-01-30",
    value: 81,
  },
];

// VerticalLineChart
export default function VerticalLineChart() {
  const id = "vertical-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    root.dateFormatter.setAll({ dateFormat: "yyyy", dateFields: ["valueY"] });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        paddingLeft: 0,
      })
    );

    // X,Y축 생성
    const yAxis = chart.yAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: false,
        maxDeviation: 0.1,
        tooltip: am5.Tooltip.new(root, { dx: 45 }),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererY.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      })
    );

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        connect: false,
        valueYField: "date",
        valueXField: "value",
        minBulletDistance: 10,
        fill: am5.color("#fff"),
        stroke: am5.color("#fff"),
        tooltip: am5.Tooltip.new(root, {
          dy: -3,
          labelText: "{valueX}",
          pointerOrientation: "vertical",
        }),
      })
    );

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"],
    });

    series.strokes.template.setAll({ strokeDasharray: [4, 2], strokeWidth: 2 });
    series.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 3,
        fill: root.interfaceColors.get("background"),
      });

      return am5.Bullet.new(root, { sprite: circle });
    });

    // 범위 생성
    const range0DataItem = xAxis.makeDataItem({
      value: 40,
      endValue: 70,
    });

    xAxis.createAxisRange(range0DataItem);

    range0DataItem.get("axisFill").setAll({
      visible: true,
      fillOpacity: 1,
      fill: colorList[0],
    });

    const range1DataItem = xAxis.makeDataItem({
      value: 70,
      endValue: 100,
    });

    xAxis.createAxisRange(range1DataItem);

    range1DataItem.get("axisFill").setAll({
      visible: true,
      fillOpacity: 1,
      fill: colorList[1],
    });

    chart.plotContainer.children.moveValue(chart.topGridContainer, 0);

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { yAxis, behavior: "none" })
    );
    cursor.lineX.set("visible", false);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
