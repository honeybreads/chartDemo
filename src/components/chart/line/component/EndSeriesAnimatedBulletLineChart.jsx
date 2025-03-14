import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    date: new Date(2021, 5, 12).getTime(),
    value: 50,
  },
  {
    date: new Date(2021, 5, 13).getTime(),
    value: 53,
  },
  {
    date: new Date(2021, 5, 14).getTime(),
    value: 56,
  },
  {
    date: new Date(2021, 5, 15).getTime(),
    value: 52,
  },
  {
    date: new Date(2021, 5, 16).getTime(),
    value: 48,
  },
  {
    date: new Date(2021, 5, 17).getTime(),
    value: 47,
  },
  {
    date: new Date(2021, 5, 18).getTime(),
    value: 59,
    bullet: true,
  },
];

// EndSeriesAnimatedBulletLineChart
export default function EndSeriesAnimatedBulletLineChart() {
  const id = "endseriesanimatedbullet-line";
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
        pinchZoomX: true,
        paddingLeft: 0,
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
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
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
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3],
    });

    // bullets 생성
    series.bullets.push((root, series, dataItem) => {
      if (dataItem.dataContext.bullet) {
        const container = am5.Container.new(root, {});
        const createCircle = () => {
          return container.children.push(
            am5.Circle.new(root, {
              radius: 5,
              fill: colorList[1],
            })
          );
        };
        createCircle();

        // 깜빡이는 애니메이션 써클
        const dummyCircle = createCircle();
        const aniOptions = {
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        };

        dummyCircle.animate({
          key: "radius",
          to: 20,
          ...aniOptions,
        });

        dummyCircle.animate({
          key: "opacity",
          to: 0,
          from: 1,
          ...aniOptions,
        });

        return am5.Bullet.new(root, { sprite: container });
      }
    });

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
