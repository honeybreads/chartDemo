import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
let value = 100;
const timer = 5;

const generateChartData = () => {
  const chartData = [];
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < 50; i++) {
    const newDate = new Date(firstDate);
    newDate.setSeconds(newDate.getSeconds() + i * timer);
    value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;
    chartData.push({
      date: newDate.getTime(),
      value: value,
    });
  }
  return chartData;
};

const data = generateChartData();

// AddingDataLineChart
export default function AddingDataLineChart() {
  const id = "addingdata-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        focusable: true,
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        extraMax: 0.1,
        extraMin: -0.1,
        groupData: false,
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "second", count: 5 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
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
          pointerOrientation: "horizontal",
        }),
      })
    );

    // 깜빡이는 불렛 생성
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

        return am5.Bullet.new(root, {
          sprite: container,
          locationX: undefined,
        });
      }
    });

    // data 생성 함수
    const addData = () => {
      const lastDataItem = series.dataItems[series.dataItems.length - 1];
      const lastValue = lastDataItem.get("valueY");
      const lastDate = new Date(lastDataItem.get("valueX"));
      const time = am5.time.add(new Date(lastDate), "second", timer).getTime();
      const newValue =
        value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;

      series.data.removeIndex(0);
      series.data.push({ date: time, value: newValue });

      const newDataItem = series.dataItems[series.dataItems.length - 1];
      newDataItem.animate({
        key: "valueYWorking",
        to: newValue,
        from: lastValue,
        duration: 600,
      });

      newDataItem.bullets = [];
      newDataItem.bullets[0] = lastDataItem.bullets[0];
      if (newDataItem.bullets[0]) {
        newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
      }

      // reset bullets
      lastDataItem.dataContext.bullet = false;
      lastDataItem.bullets = [];

      const animation = newDataItem.animate({
        key: "locationX",
        to: 0.5,
        from: -0.5,
        duration: 600,
      });
      if (animation) {
        const tooltip = xAxis.get("tooltip");
        if (tooltip && !tooltip.isHidden()) {
          animation.events.on("stopped", () => xAxis.updateTooltip());
        }
      }
    };

    // 5초간격 업데이트
    setInterval(addData, timer * 1000);

    // 데이터 적용
    data[data.length - 1].bullet = true;
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const AddingDataLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
let value = 100;
const timer = 5;

const generateChartData = () => {
  const chartData = [];
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < 50; i++) {
    const newDate = new Date(firstDate);
    newDate.setSeconds(newDate.getSeconds() + i * timer);
    value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;
    chartData.push({
      date: newDate.getTime(),
      value: value,
    });
  }
  return chartData;
};

const data = generateChartData();

// AddingDataLineChart
export default function AddingDataLineChart() {
  const id = "addingdata-line";
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

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        focusable: true,
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        extraMax: 0.1,
        extraMin: -0.1,
        groupData: false,
        maxDeviation: 0,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "second", count: 5 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
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
          pointerOrientation: "horizontal",
        }),
      })
    );

    // 깜빡이는 불렛 생성
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

        return am5.Bullet.new(root, {
          sprite: container,
          locationX: undefined,
        });
      }
    });

    // data 생성 함수
    const addData = () => {
      const lastDataItem = series.dataItems[series.dataItems.length - 1];
      const lastValue = lastDataItem.get("valueY");
      const lastDate = new Date(lastDataItem.get("valueX"));
      const time = am5.time.add(new Date(lastDate), "second", timer).getTime();
      const newValue =
        value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;

      series.data.removeIndex(0);
      series.data.push({ date: time, value: newValue });

      const newDataItem = series.dataItems[series.dataItems.length - 1];
      newDataItem.animate({
        key: "valueYWorking",
        to: newValue,
        from: lastValue,
        duration: 600,
      });

      newDataItem.bullets = [];
      newDataItem.bullets[0] = lastDataItem.bullets[0];
      if (newDataItem.bullets[0]) {
        newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
      }

      // reset bullets
      lastDataItem.dataContext.bullet = false;
      lastDataItem.bullets = [];

      const animation = newDataItem.animate({
        key: "locationX",
        to: 0.5,
        from: -0.5,
        duration: 600,
      });
      if (animation) {
        const tooltip = xAxis.get("tooltip");
        if (tooltip && !tooltip.isHidden()) {
          animation.events.on("stopped", () => xAxis.updateTooltip());
        }
      }
    };

    // 5초간격 업데이트
    setInterval(addData, timer * 1000);

    // 데이터 적용
    data[data.length - 1].bullet = true;
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
