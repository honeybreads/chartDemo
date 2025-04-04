import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Measurement #1",
    min: 0,
    max: 160,
  },
  {
    category: "Measurement #2",
    min: 0,
    max: 250,
  },
];

// TwoAxesGaugeChart
export default function TwoAxesGaugeChart() {
  const id = "twoaxes-gauge";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
        radius: am5.percent(90),
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // 축과 핸드 생성 함수
    const createItem = (index) => {
      const newData = data[index];
      const color = colorList[index];
      const inside = index === 1; // 0이면 바깥쪽, 1이면 안쪽
      const pinRadius = inside ? 10 : 14;
      const labelPosition = inside ? 70 : -70;

      // 축 렌더러 생성
      const axisRenderer = am5radar.AxisRendererCircular.new(root, {
        inside,
        stroke: color,
        strokeWidth: 6,
        strokeOpacity: 1,
        radius: inside ? -10 : am5.p100,
      });
      axisRenderer.grid.template.setAll({ forceHidden: true });
      axisRenderer.ticks.template.setAll({ visible: false });
      axisRenderer.labels.template.setAll({ radius: 10, inside });

      // 축 생성
      const xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: newData.min,
          max: newData.max,
          maxDeviation: 0,
          strictMinMax: true,
          renderer: axisRenderer,
        })
      );

      // 라벨 생성
      const label = chart.seriesContainer.children.push(
        am5.Label.new(root, {
          y: -60,
          text: "0",
          layer: 999,
          width: 70,
          fontSize: 24,
          x: labelPosition,
          textAlign: "center",
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          fill: am5.color(0xffffff),
          background: am5.RoundedRectangle.new(root, { fill: color }),
        })
      );

      // 핸드 생성
      const axisDataItem = xAxis.makeDataItem({
        value: 0,
        fill: color,
        name: newData.category,
      });

      const clockHand = am5radar.ClockHand.new(root, {
        pinRadius,
        bottomWidth: 10,
        radius: am5.percent(98),
      });

      clockHand.pin.setAll({ fill: color });
      clockHand.hand.setAll({ fill: color });
      axisDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, { sprite: clockHand })
      );

      xAxis.createAxisRange(axisDataItem);
      axisDataItem.get("grid").set("forceHidden", true);
      axisDataItem.get("tick").set("forceHidden", true);

      return { xAxis, label, axisDataItem };
    };

    // 축 및 핸드 생성
    const { label: label1, axisDataItem: axisDataItem1 } = createItem(0);
    const { label: label2, axisDataItem: axisDataItem2 } = createItem(1);

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        marginTop:12,
        ...themes.legnedBackground(root, theme),
      })
    );
    legend.data.setAll([axisDataItem1, axisDataItem2]);
    legend.labels.template.setAll({ textAlign: "center" });
    legend.valueLabels.template.setAll({ width: 0 });

    // 애니메이션 함수
    const animateChart = (axisDataItem, data, label) => {
      const { min, max } = data;
      const value = Math.ceil(Math.random() * (max - min) + min);
      axisDataItem.animate({
        key: "value",
        to: value,
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      });
      label.set("text", value);
    };

    // 애니메이션 반복 체크
    setInterval(() => {
      animateChart(axisDataItem1, data[0], label1);
      animateChart(axisDataItem2, data[1], label2);
    }, 3000);

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const TwoAxesGaugeCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Measurement #1",
    min: 0,
    max: 160,
  },
  {
    category: "Measurement #2",
    min: 0,
    max: 250,
  },
];

// TwoAxesGaugeChart
export default function TwoAxesGaugeChart() {
  const id = "twoaxes-gauge";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // RadarChart 생성
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
        radius: am5.percent(90),
        layout: root.verticalLayout,
      })
    );
    chart.plotContainer.get("background").set("visible", false);

    // 축과 핸드 생성 함수
    const createItem = (index) => {
      const newData = data[index];
      const color = colorList[index];
      const inside = index === 1; // 0이면 바깥쪽, 1이면 안쪽
      const pinRadius = inside ? 10 : 14;
      const labelPosition = inside ? 70 : -70;

      // 축 렌더러 생성
      const axisRenderer = am5radar.AxisRendererCircular.new(root, {
        inside,
        stroke: color,
        strokeWidth: 6,
        strokeOpacity: 1,
        radius: inside ? -10 : am5.p100,
      });
      axisRenderer.grid.template.setAll({ forceHidden: true });
      axisRenderer.ticks.template.setAll({ visible: false });
      axisRenderer.labels.template.setAll({ radius: 10, inside });

      // 축 생성
      const xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: newData.min,
          max: newData.max,
          maxDeviation: 0,
          strictMinMax: true,
          renderer: axisRenderer,
        })
      );

      // 라벨 생성
      const label = chart.seriesContainer.children.push(
        am5.Label.new(root, {
          y: -60,
          text: "0",
          layer: 999,
          width: 70,
          fontSize: 24,
          x: labelPosition,
          textAlign: "center",
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          fill: am5.color(0xffffff),
          background: am5.RoundedRectangle.new(root, { fill: color }),
        })
      );

      // 핸드 생성
      const axisDataItem = xAxis.makeDataItem({
        value: 0,
        fill: color,
        name: newData.category,
      });

      const clockHand = am5radar.ClockHand.new(root, {
        pinRadius,
        bottomWidth: 10,
        radius: am5.percent(98),
      });

      clockHand.pin.setAll({ fill: color });
      clockHand.hand.setAll({ fill: color });
      axisDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, { sprite: clockHand })
      );

      xAxis.createAxisRange(axisDataItem);
      axisDataItem.get("grid").set("forceHidden", true);
      axisDataItem.get("tick").set("forceHidden", true);

      return { xAxis, label, axisDataItem };
    };

    // 축 및 핸드 생성
    const { label: label1, axisDataItem: axisDataItem1 } = createItem(0);
    const { label: label2, axisDataItem: axisDataItem2 } = createItem(1);

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        marginTop:12,
        ...themes.legnedBackground(root, theme),
      })
    );
    legend.data.setAll([axisDataItem1, axisDataItem2]);
    legend.labels.template.setAll({ textAlign: "center" });
    legend.valueLabels.template.setAll({ width: 0 });

    // 애니메이션 함수
    const animateChart = (axisDataItem, data, label) => {
      const { min, max } = data;
      const value = Math.ceil(Math.random() * (max - min) + min);
      axisDataItem.animate({
        key: "value",
        to: value,
        duration: 300,
        easing: am5.ease.out(am5.ease.cubic),
      });
      label.set("text", value);
    };

    // 애니메이션 반복 체크
    setInterval(() => {
      animateChart(axisDataItem1, data[0], label1);
      animateChart(axisDataItem2, data[1], label2);
    }, 3000);

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`