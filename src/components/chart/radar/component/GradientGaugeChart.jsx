import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  min: 0,
  max: 100,
};

export default function GradientGaugeChart() {
  const id = "gradient-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // 값 가져오기
    const { min, max } = data;

    // Root 객체 생성 및 테마 적용
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(21);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        endAngle: 360,
        startAngle: 180,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // Circular AxisRenderer 생성
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeWidth: 25,
      strokeOpacity: 1,
      minGridDistance: 40,
      nonScalingStroke: true,
      strokeGradient: am5.LinearGradient.new(root, {
        rotation: 0,
        stops: [
          ...colorList.map((item) => {
            return { color: am5.color(item) };
          }),
        ],
      }),
    });
    axisRenderer.labels.template.setAll({ radius: 20 });
    axisRenderer.grid.template.setAll({ visible: false });

    // valueAxis 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min,
        max,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    // 화살표 아이콘 생성 후 xAxis에 적용
    const axisDataItem = xAxis.makeDataItem({});
    const clockHand = am5radar.ClockHand.new(root, { radius: am5.percent(99) });
    const clockColor = theme === "light" ? "#222" : "#ddd";
    clockHand.pin.setAll({ fill: am5.color(clockColor) });
    clockHand.hand.setAll({ fill: am5.color(clockColor) });

    axisDataItem.setAll({
      value: 0,
      bullet: am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      }),
    });
    xAxis.createAxisRange(axisDataItem);

    // 애니메이션 함수
    const animateChart = () => {
      axisDataItem.animate({
        key: "value",
        to: Math.random() * (max - min) + min,
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      });
    };

    // 애니메이션 반복 체크
    animateChart();
    setInterval(animateChart, 3000);

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

