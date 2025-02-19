import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { min: 0, max: 100 },
  { min: 0, max: 200 },
  { min: 0, max: 120 },
  { min: 0, max: 140 },
];

export default function MultiGaugeChart() {
  const id = "multi-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 적용
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        radius: am5.percent(90),
        innerRadius: -20,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // Axis 생성 함수
    const createAxis = (min, max, start, end, color) => {
      var axisRenderer = am5radar.AxisRendererCircular.new(root, {
        stroke: color,
        endAngle: end,
        startAngle: start,
        strokeOpacity: 0,
        minGridDistance: 30,
      });

      axisRenderer.grid.template.setAll({ visible: false });
      axisRenderer.ticks.template.setAll({
        visible: true,
        stroke: color,
        strokeOpacity: 1,
        strokeDasharray: 0,
      });

      const axis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: min,
          max: max,
          maxDeviation: 0,
          strictMinMax: true,
          renderer: axisRenderer,
        })
      );

      const rangeDataItem = axis.makeDataItem({
        value: min,
        endValue: max,
      });

      axis.createAxisRange(rangeDataItem);

      rangeDataItem.get("axisFill").setAll({
        visible: true,
        fill: color,
        stroke: color,
        fillOpacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
      });

      rangeDataItem.get("tick").setAll({
        visible: false,
      });

      return axis;
    };

    // Clock Hand 생성 함수
    const createHand = (axis) => {
      const color = axis.get("renderer").get("stroke");
      const handDataItem = axis.makeDataItem({ value: 0 });
      const hand = handDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, {
          sprite: am5radar.ClockHand.new(root, {
            radius: am5.percent(90),
            innerRadius: am5.percent(70),
          }),
        })
      );

      hand.get("sprite").pin.setAll({ forceHidden: true });
      hand.get("sprite").hand.setAll({
        fill: color,
        fillOpacity: 1,
      });
      axis.createAxisRange(handDataItem);
      return hand;
    };

    // 데이터 기반 축 및 핸드 생성
    const axisAndHands = data.map(({ min, max }, index) => {
      const leng = data.length;
      const percent = Math.ceil(360 / leng);
      const start = percent * index + leng;
      const end = percent * (index + 1) - leng;
      const color = colorList[index];
      const axis = createAxis(min, max, start, end, color);
      const hand = createHand(axis);
      return { axis, hand };
    });

    // 애니메이션 적용을 위해 hand
    const allHands = axisAndHands.map(({ hand }) => hand);

    // 애니메이션 함수
    const animateChart = (hand) => {
      const max = hand.axis.get("max");
      const min = hand.axis.get("min");
      hand.get("sprite").dataItem.animate({
        key: "value",
        to: Math.random() * (max - min) + min,
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      });
    };

    // 애니메이션 적용
    allHands.map((hand) => animateChart(hand));
    setInterval(function () {
      allHands.map((hand) => animateChart(hand));
    }, 3000);

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
