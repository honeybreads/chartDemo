import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    x: 10,
    y: 14,
    errorX: 3,
    errorY: 4,
  },
  {
    x: 0,
    y: 0,
    errorX: 2,
    errorY: 6,
  },
  {
    x: -10,
    y: 3,
    errorX: 0.8,
    errorY: 3.5,
  },
  {
    x: -6,
    y: 5,
    errorX: 1.2,
    errorY: 4.2,
  },
  {
    x: 11,
    y: -4,
    errorX: 2.4,
    errorY: 3.9,
  },
  {
    x: 13,
    y: 1,
    errorX: 1.5,
    errorY: 3.3,
  },
  {
    x: 1,
    y: 6,
    errorX: 2,
    errorY: 3.3,
  },
];

// ErrorLineChart
export default function ErrorLineChart() {
  const id = "basic-line";
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
        paddingLeft: 0,
        pinchZoomX: true,
        pinchZoomY: true,
        wheelY: "zoomXY",
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.2,
        extraMin: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.2,
        extraMin: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "y",
        valueXField: "x",
        calculateAggregates: true,
        tooltip: am5.Tooltip.new(root, {
          labelText:
            "x: {valueX}\ny: {valueY}\nerrorX: {errorX}\nerrorY: {errorY}",
        }),
      })
    );
    series.strokes.template.setAll({ opacity: 0 });

    // bullets(위, 아래) 생성
    series.bullets.push(() => {
      const graphics = am5.Graphics.new(root, {
        strokeWidth: 2,
        stroke: series.get("stroke"),
        draw: (display, target) => {
          const draw = (move1, move2, line1, line2) => {
            display.moveTo(move1, move2);
            display.lineTo(line1, line2);
          };

          const dataItem = target.dataItem;
          const errorX = dataItem.dataContext.errorX;
          const errorY = dataItem.dataContext.errorY;
          const xPosition0 = xAxis.valueToPosition(0);
          const xPosition1 = xAxis.valueToPosition(errorX);
          const yPosition0 = yAxis.valueToPosition(0);
          const yPosition1 = yAxis.valueToPosition(errorY);
          const width =
            (xAxis.get("renderer").positionToCoordinate(xPosition1) -
              xAxis.get("renderer").positionToCoordinate(xPosition0)) /
            2;
          const height =
            (yAxis.get("renderer").positionToCoordinate(yPosition1) -
              yAxis.get("renderer").positionToCoordinate(yPosition0)) /
            2;

          draw(-width, 0, width, 0);
          draw(-width, -10, -width, 10);
          draw(width, -10, width, 10);
          draw(0, -height, 0, height);
          draw(-10, -height, 10, -height);
          draw(-10, height, 10, height);
        },
      });

      return am5.Bullet.new(root, {
        dynamic: true,
        sprite: graphics,
      });
    });

    // bullets(중앙) 생성
    series.bullets.push(() => {
      var graphics = am5.Circle.new(root, {
        radius: 5,
        strokeWidth: 2,
        stroke: series.get("stroke"),
        fill: root.interfaceColors.get("background"),
      });
      return am5.Bullet.new(root, { sprite: graphics });
    });

    // cursor 생성
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
      })
    );

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
