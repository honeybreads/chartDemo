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

export default function AnimatedGaugeChart() {
  const id = "animated-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // 값 가져오기
    const { min, max } = data;

    // Root 객체 생성 및 테마 설정
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(2);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
      })
    );
    chart.getNumberFormatter().set("numberFormat", "#'%'");
    chart.plotContainer.get("background").set("visible", false);

    // Circular AxisRenderer 생성
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      stroke: 0,
      innerRadius: -40,
      minGridDistance: 40,
    });

    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8,
    });

    // xAxis(ValueAxis) 생성
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min,
        max,
        maxDeviation: 0,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    // 화살표(ClockHand) 생성
    const clockColor = theme === "light" ? "#222" : "#ddd";
    const clockHand = am5radar.ClockHand.new(root, {
      topWidth: 0,
      bottomWidth: 0,
      pinRadius: 32,
      innerRadius: 32,
      radius: am5.percent(100),
    });

    clockHand.pin.setAll({
      fillOpacity: 0,
      strokeWidth: 1,
      strokeOpacity: 0.5,
      strokeDasharray: [2, 2],
      stroke: am5.color(clockColor),
    });

    clockHand.hand.setAll({
      fillOpacity: 0,
      strokeWidth: 0.5,
      strokeOpacity: 0.5,
      stroke: am5.color(clockColor),
    });

    // AxisBullet(화살표 위치 설정) 생성
    const axisDataItem = xAxis.makeDataItem({});
    const bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      })
    );

    xAxis.createAxisRange(axisDataItem);
    axisDataItem.set("value", min);

    // 중앙 라벨 생성
    const label = chart.radarContainer.children.push(
      am5.Label.new(root, {
        fontSize: 21,
        textAlign: "center",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
      })
    );

    // 화살표 회전 시 라벨 업데이트
    bullet.get("sprite").on("rotation", function () {
      var value = axisDataItem.get("value");
      label.set("text", Math.round(value).toString() + "%");
    });

    // 색상 영역 생성 함수
    const createAxisRange = (value, key) => {
      const axisRange = xAxis.createAxisRange(
        xAxis.makeDataItem({
          above: true,
          value: min,
          endValue: value,
        })
      );
      axisRange.get("axisFill").setAll({
        visible: true,
        fill: colorList[key],
      });
      return axisRange;
    };

    // 색상 영역 생성
    const axisRange0 = createAxisRange(min, 0);
    const axisRange1 = createAxisRange(max, 1);

    // 애니메이션 함수
    const animateChart = () => {
      const animationSettings = {
        to: Math.random() * (max - min) + min,
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      };

      axisDataItem.animate({ key: "value", ...animationSettings });
      axisRange0.animate({ key: "endValue", ...animationSettings });
      axisRange1.animate({ key: "value", ...animationSettings });
    };

      animateChart();
      setInterval(animateChart, 3000);
   

    // 차트 애니메이션 표시
    chart.bulletsContainer.set("mask", undefined);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

