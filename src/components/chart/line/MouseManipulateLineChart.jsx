import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(30);

// MouseManipulateLineChart
export default function MouseManipulateLineChart() {
  const id = "manipulatemouse-line";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {paddingLeft: 0})
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { count: 1, timeUnit: "day" },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    xAxis.set("minorDateFormats", { day: "dd", month: "MMM" });
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
          getFillFromSprite: "#000",
        }),
      })
    );

    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        colorList[0]
      );
    });

    // 클릭 체크
    let isDown = false;
    chart.plotContainer.events.on("pointerdown", () => {
      isDown = true;
    });
    chart.plotContainer.events.on("globalpointerup", () => {
      isDown = false;
    });

    // 클릭 이벤트
    chart.plotContainer.events.on("globalpointermove", (e) => {
      if (isDown) {
        const tooltipDataItem = series.get("tooltipDataItem");
        if (tooltipDataItem) {
          if (e.originalEvent) {
            const position = yAxis.coordinateToPosition(
              chart.plotContainer.toLocal(e.point).y
            );
            const value = yAxis.positionToValue(position);
            tooltipDataItem.set("valueY", value);
            tooltipDataItem.set("valueYWorking", value);
          }
        }
      }
    });

    // 클릭 이벤트 설명 라벨 생성
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        layer: 99,
        text: "그래프 영역에서 마우스를 클릭하고 이동하면 값을 변경 할 수 있습니다.",
      })
    );

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const MouseManipulateLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (let i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(30);

// MouseManipulateLineChart
export default function MouseManipulateLineChart() {
  const id = "manipulatemouse-line";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary, lineColors } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {paddingLeft: 0})
    );

    // 커서 추가
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("stroke", themes.chartVariables[theme].base);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { count: 1, timeUnit: "day" },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );

    xAxis.set("minorDateFormats", { day: "dd", month: "MMM" });
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
          getFillFromSprite: "#000",
        }),
      })
    );

    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        colorList[0]
      );
    });

    // 클릭 체크
    let isDown = false;
    chart.plotContainer.events.on("pointerdown", () => {
      isDown = true;
    });
    chart.plotContainer.events.on("globalpointerup", () => {
      isDown = false;
    });

    // 클릭 이벤트
    chart.plotContainer.events.on("globalpointermove", (e) => {
      if (isDown) {
        const tooltipDataItem = series.get("tooltipDataItem");
        if (tooltipDataItem) {
          if (e.originalEvent) {
            const position = yAxis.coordinateToPosition(
              chart.plotContainer.toLocal(e.point).y
            );
            const value = yAxis.positionToValue(position);
            tooltipDataItem.set("valueY", value);
            tooltipDataItem.set("valueYWorking", value);
          }
        }
      }
    });

    // 클릭 이벤트 설명 라벨 생성
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        layer: 99,
        text: "그래프 영역에서 마우스를 클릭하고 이동하면 값을 변경 할 수 있습니다.",
      })
    );

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`
