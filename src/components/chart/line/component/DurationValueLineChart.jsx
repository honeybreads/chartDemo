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
    distance: 227,
    townName: "New York",
    townSize: 12,
    latitude: 40.71,
    duration: 408,
  },
  {
    date: "2012-01-02",
    distance: 371,
    townName: "Washington",
    townSize: 7,
    latitude: 38.89,
    duration: 482,
  },
  {
    date: "2012-01-03",
    distance: 433,
    townName: "Wilmington",
    townSize: 3,
    latitude: 34.22,
    duration: 562,
  },
  {
    date: "2012-01-04",
    distance: 345,
    townName: "Jacksonville",
    townSize: 3.5,
    latitude: 30.35,
    duration: 379,
  },
  {
    date: "2012-01-05",
    distance: 480,
    townName: "Miami",
    townSize: 5,
    latitude: 25.83,
    duration: 501,
  },
  {
    date: "2012-01-06",
    distance: 386,
    townName: "Tallahassee",
    townSize: 3.5,
    latitude: 30.46,
    duration: 443,
  },
  {
    date: "2012-01-07",
    distance: 348,
    townName: "New Orleans",
    townSize: 5,
    latitude: 29.94,
    duration: 405,
  },
  {
    date: "2012-01-08",
    distance: 238,
    townName: "Houston",
    townSize: 8,
    latitude: 29.76,
    duration: 309,
  },
  {
    date: "2012-01-09",
    distance: 218,
    townName: "Dalas",
    townSize: 8,
    latitude: 32.8,
    duration: 287,
  },
  {
    date: "2012-01-10",
    distance: 349,
    townName: "Oklahoma City",
    townSize: 5,
    latitude: 35.49,
    duration: 485,
  },
  {
    date: "2012-01-11",
    distance: 603,
    townName: "Kansas City",
    townSize: 5,
    latitude: 39.1,
    duration: 890,
  },
  {
    date: "2012-01-12",
    distance: 534,
    townName: "Denver",
    townSize: 9,
    latitude: 39.74,
    duration: 810,
  },
  {
    date: "2012-01-13",
    townName: "Salt Lake City",
    townSize: 6,
    distance: 425,
    duration: 670,
    latitude: 40.75,
    dashLength: 8,
    alpha: 0.4,
  },
  {
    date: "2012-01-14",
    latitude: 36.1,
    duration: 470,
    townName: "Las Vegas",
  },
  {
    date: "2012-01-15",
  },
  {
    date: "2012-01-16",
  },
  {
    date: "2012-01-17",
  },
];

// DurationValueLineChart
export default function DurationValueLineChart() {
  const id = "durationvalue-line";
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
        panX: false,
        panY: false,
        wheelY: "none",
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const distanceAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const latitudeAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        forceHidden: true,
      })
    );

    const durationAxis = chart.yAxes.push(
      am5xy.DurationAxis.new(root, {
        extraMax: 0.3,
        baseUnit: "minute",
        renderer: am5xy.AxisRendererY.new(root, { opposite: true }),
      })
    );

    distanceAxis.get("renderer").grid.template.set("forceHidden", true);
    latitudeAxis.get("renderer").grid.template.set("forceHidden", true);
    durationAxis.get("renderer").grid.template.set("forceHidden", true);

    // series 생성
    const distanceSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis: distanceAxis,
        valueXField: "date",
        valueYField: "distance",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} miles",
        }),
      })
    );

    distanceSeries.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd",
    });

    const latitudeSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis: latitudeAxis,
        valueXField: "date",
        valueYField: "latitude",
        tooltip: am5.Tooltip.new(root, {
          labelText: "latitude: {valueY} ({townName})",
        }),
      })
    );

    const durationSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis: durationAxis,
        valueXField: "date",
        valueYField: "duration",
        tooltip: am5.Tooltip.new(root, {
          labelText: "duration: {valueY.formatDuration()}",
        }),
      })
    );

    // bullet(latitude) 생성
    latitudeSeries.bullets.push(() => {
      const graphics = am5.Circle.new(root, {
        radius: 5,
        strokeWidth: 2,
        stroke: latitudeSeries.get("stroke"),
        fill: root.interfaceColors.get("background"),
      });

      graphics.adapters.add("radius", (radius, target) => {
        return target.dataItem.dataContext.townSize;
      });

      return am5.Bullet.new(root, { sprite: graphics });
    });

    // bullet(duration) 생성
    durationSeries.bullets.push(function () {
      var graphics = am5.Rectangle.new(root, {
        width: 10,
        height: 10,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: durationSeries.get("stroke"),
      });

      return am5.Bullet.new(root, {
        sprite: graphics,
      });
    });

    // cursor 생성
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis: distanceAxis,
      })
    );

    // 데이터 적용
    distanceSeries.data.setAll(data);
    latitudeSeries.data.setAll(data);
    durationSeries.data.setAll(data);
    xAxis.data.setAll(data);

    // 애니메이션 적용
    distanceSeries.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
