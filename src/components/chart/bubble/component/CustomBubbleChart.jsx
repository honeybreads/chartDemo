import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: "2021-12-31 18:00",
    value: 0,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304570.png",
  },
  {
    date: "2021-12-31 19:00",
    value: 0,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304529.png",
  },
  {
    date: "2021-12-31 20:00",
    value: 0,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304614.png",
  },
  {
    date: "2021-12-31 21:00",
    value: 0.3,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304583.png",
  },
  {
    date: "2021-12-31 22:00",
    value: 0.8,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304434.png",
  },
  {
    date: "2021-12-31 23:00",
    value: 1.2,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304666.png",
  },
  {
    date: "2022-01-01 00:00",
    value: 2.2,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304682.png",
  },
  {
    date: "2022-01-01 01:00",
    value: 2.5,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304556.png",
  },
  {
    date: "2022-01-01 02:00",
    value: 2.2,
    icon: "https://cdn-icons-png.flaticon.com/128/18304/18304514.png",
  },
];

export default function CustomBubbleChart() {
  const id = "custom-bubble";
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
        pinchZoomX: true,
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").setAll({ stroke: 0 });

    // cursor 생성
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke",themes.chartVariables[theme].base );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "hour", count: 1 },
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 20,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMin: 0.1,
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("location", 0.5);
    xAxis.get("renderer").labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    yAxis.get("renderer").grid.template.set("forceHidden", true);
    yAxis.get("renderer").labels.template.set("minPosition", 0.05);

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        maskBullets: false,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          dy: -20,
          labelText: "{valueY}",
          pointerOrientation: "vertical",
        }),
      })
    );

    series.data.processor = am5.DataProcessor.new(root, {
      dateFields: ["date"],
      dateFormat: "yyyy-MM-dd HH:mm",
    });

    series.strokes.template.setAll({ strokeDasharray: [3, 3], strokeWidth: 2 });

    series.bullets.push((_, data, item) => {
      const container = am5.Container.new(root, {
        centerX: am5.p50,
        centerY: am5.p50,
      });

      container.children.push(
        am5.Circle.new(root, {
          radius: 22,
          stroke:series.get("fill"),
          fill: themes.chartVariables[theme].bg,
        })
      );

      container.children.push(
        am5.Picture.new(root, {
          width: 32,
          height: 32,
          centerX: am5.p50,
          centerY: am5.p50,
          src: item.dataContext.icon,
        })
      );

      return am5.Bullet.new(root, { sprite: container });
    });

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
