import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    title: "Unsustainable",
    lowScore: -40,
    highScore: -20,
  },
  {
    title: "Volatile",
    lowScore: -20,
    highScore: 0,
  },
  {
    title: "Foundational",
    lowScore: 0,
    highScore: 20,
  },
  {
    title: "Developing",
    lowScore: 20,
    highScore: 40,
  },
  {
    title: "Maturing",
    lowScore: 40,
    highScore: 60,
  },
  {
    title: "Sustainable",
    lowScore: 60,
    highScore: 80,
  },
  {
    title: "High Performing",
    lowScore: 80,
    highScore: 100,
  },
];

export default function BasicGaugeChart() {
  const id = "basic-gauge";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // 값 가져오기
    const min = Math.min(...data.map((item) => item.lowScore));
    const max = Math.max(...data.map((item) => item.highScore));

    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 설정
    const responsive = am5themes_Responsive.newEmpty(root);
    const applyResponsiveStyles = (isMobile) => {
      label.setAll({ fontSize: isMobile ? 14 : 24 });
      clockHand.setAll({ bottomWidth: isMobile ? 20 : 40 });
      axisRenderer.setAll({ minGridDistance: isMobile ? 40 : 60 });
      axisRanges.forEach((item) =>
        item.get("label").setAll({ opacity: isMobile ? 0 : 1 })
      );
    };
    responsive.addRule({
      relevant: am5themes_Responsive.widthS,
      applying: () => applyResponsiveStyles(true),
      removing: () => applyResponsiveStyles(false),
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        endAngle: 380,
        startAngle: 160,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // Circular 생성
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      stroke: 0,
      innerRadius: -40,
      minGridDistance: 60,
    });

    axisRenderer.grid.template.setAll({ opacity: 0 });

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
    const clockHand = am5radar.ClockHand.new(root, {
      bottomWidth: 40,
      radius: am5.percent(100),
      pinRadius: am5.percent(20),
    });

    const axisDataItem = xAxis.makeDataItem({ value: 50 });
    const bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, { sprite: clockHand })
    );
    xAxis.createAxisRange(axisDataItem);

    // 중앙 라벨 생성
    const label = chart.radarContainer.children.push(
      am5.Label.new(root, {
        fontSize: 24,
        textAlign: "center",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        fill: am5.color(0xffffff),
      })
    );

    // 라벨 업데이트 및 애니메이션 설정
    bullet.get("sprite").on("rotation", () => {
      let fill = colorList[0];
      const value = axisDataItem.get("value");
      xAxis.axisRanges.each(function (axisRange) {
        if (
          value >= axisRange.get("value") &&
          value <= axisRange.get("endValue")
        ) {
          fill = axisRange.get("axisFill").get("fill");
        }
      });

      // 값에 따른 라벨 변화
      label.set("text", Math.round(value).toString());

      // 화살표 아이콘 색상 변경
      ["pin", "hand"].forEach((part) => {
        clockHand[part].animate({
          key: "fill",
          to: fill,
          easing: am5.ease.out(am5.ease.cubic),
        });
      });
    });

    // 애니메이션 함수
    const animateChart = () => {
      axisDataItem.animate({
        key: "value",
        to: Math.ceil(Math.random() * (max - min) + min),
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      });
    };

    // 주기적으로 애니메이션 실행
    let intervalId;
    animateChart();
    intervalId = setInterval(animateChart, 3000);

    // 데이터에 따른 축 생성
    const axisRanges = data.map((newData, index) => {
      const axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
      axisRange.setAll({
        value: newData.lowScore,
        endValue: newData.highScore,
      });

      axisRange.get("axisFill").setAll({
        visible: true,
        fill: colorList[index],
      });

      axisRange.get("label").setAll({
        radius: 15,
        inside: true,
        fontSize: 10,
        text: newData.title,
        fill: am5.color("#fff"),
      });

      // 클릭 이벤트 설정 (참고용)
      axisRange.get("axisFill").events.on("click", () => {
        const minValue = axisRange.get("value");
        const maxValue = axisRange.get("endValue");
        axisDataItem.animate({
          key: "value",
          to: (maxValue + minValue) / 2,
          duration: 300,
          easing: am5.ease.out(am5.ease.cubic),
        });
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = setInterval(animateChart, 3000);
        }
      });

      return axisRange;
    });

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
