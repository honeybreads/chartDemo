import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 20;
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

const data = createData(60);

// DraggableRangeLineChart
export default function DraggableRangeLineChart() {
  const id = "draggablerange-line";
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
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation:0,
        endLocation:0.5,
        startLocation:0.5,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 90,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation:0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });

    // 버튼용 container 생성
    const container = am5.Container.new(root, {
      draggable: true,
      centerY: am5.p50,
      layout: root.horizontalLayout,
    });

    // X축 고정
    container.adapters.add("x", () => 0);

    // y축 최소 최대 값 설정
    container.adapters.add("y", (y) => {
      return Math.max(0, Math.min(chart.plotContainer.height(), y));
    });

    // 버튼용 컨테이너를 Y축에 bullet 형태로 적용
    const rangeDataItem = yAxis.makeDataItem({});
    yAxis.createAxisRange(rangeDataItem);
    yAxis.topGridContainer.children.push(container);
    rangeDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, { sprite: container })
    );

    //  container grid 설정
    rangeDataItem.get("grid").setAll({
      visible: true,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDasharray: [2, 2],
      stroke: themes.chartVariables[theme].base,
    });

    // container background 설정
    const background = am5.RoundedRectangle.new(root, {
      fillOpacity: 1,
      cornerRadiusTL: 0,
      cornerRadiusBL: 0,
      cornerRadiusBR: 4,
      cornerRadiusTR: 4,
      fill: colorList[1],
      cursorOverStyle: "ns-resize",
    });

    container.set("background", background);

    // container label 설정
    const label = container.children.push(
      am5.Label.new(root, {
        paddingTop: 5,
        paddingBottom: 5,
        fill: am5.color("#fff"),
      })
    );

    // x button 설정
    const xButton = container.children.push(
      am5.Button.new(root, {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        paddingRight: 8,
        cursorOverStyle: "pointer",
      })
    );

    xButton.set(
      "label",
      am5.Label.new(root, {
        text: "X",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        fill: am5.color("#fff"),
      })
    );

    xButton.get("background").setAll({
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    // x 버튼 이벤트
    xButton.events.on("click", () => {
      yAxis.disposeDataItem(rangeDataItem);
    });

    // label 업데이트 함수
    const updateLabel = (value) => {
      const y = container.y();
      const position = yAxis.toAxisPosition(y / chart.plotContainer.height());
      if (value == null) value = yAxis.positionToValue(position);
      const text = root.numberFormatter.format(value, "#.00") + ">Stop loss";
      label.set("text", text);
      rangeDataItem.set("value", value);
    };

    // 드래그 이벤트
    container.events.on("dragged", () => updateLabel());

    // container 초기 값 설정
    series.events.on("datavalidated", () => {
      const max = yAxis.getPrivate("max", 1);
      const min = yAxis.getPrivate("min", 0);
      const value = min + (max - min) / 2;
      rangeDataItem.set("value", value);
      updateLabel(value);
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

// codeblock 
export const DraggableRangeLineCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 20;
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

const data = createData(60);

// DraggableRangeLineChart
export default function DraggableRangeLineChart() {
  const id = "draggablerange-line";
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
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation:0,
        endLocation:0.5,
        startLocation:0.5,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 90,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation:0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });

    // 버튼용 container 생성
    const container = am5.Container.new(root, {
      draggable: true,
      centerY: am5.p50,
      layout: root.horizontalLayout,
    });

    // X축 고정
    container.adapters.add("x", () => 0);

    // y축 최소 최대 값 설정
    container.adapters.add("y", (y) => {
      return Math.max(0, Math.min(chart.plotContainer.height(), y));
    });

    // 버튼용 컨테이너를 Y축에 bullet 형태로 적용
    const rangeDataItem = yAxis.makeDataItem({});
    yAxis.createAxisRange(rangeDataItem);
    yAxis.topGridContainer.children.push(container);
    rangeDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, { sprite: container })
    );

    //  container grid 설정
    rangeDataItem.get("grid").setAll({
      visible: true,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDasharray: [2, 2],
      stroke: themes.chartVariables[theme].base,
    });

    // container background 설정
    const background = am5.RoundedRectangle.new(root, {
      fillOpacity: 1,
      cornerRadiusTL: 0,
      cornerRadiusBL: 0,
      cornerRadiusBR: 4,
      cornerRadiusTR: 4,
      fill: colorList[1],
      cursorOverStyle: "ns-resize",
    });

    container.set("background", background);

    // container label 설정
    const label = container.children.push(
      am5.Label.new(root, {
        paddingTop: 5,
        paddingBottom: 5,
        fill: am5.color("#fff"),
      })
    );

    // x button 설정
    const xButton = container.children.push(
      am5.Button.new(root, {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        paddingRight: 8,
        cursorOverStyle: "pointer",
      })
    );

    xButton.set(
      "label",
      am5.Label.new(root, {
        text: "X",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        fill: am5.color("#fff"),
      })
    );

    xButton.get("background").setAll({
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    // x 버튼 이벤트
    xButton.events.on("click", () => {
      yAxis.disposeDataItem(rangeDataItem);
    });

    // label 업데이트 함수
    const updateLabel = (value) => {
      const y = container.y();
      const position = yAxis.toAxisPosition(y / chart.plotContainer.height());
      if (value == null) value = yAxis.positionToValue(position);
      const text = root.numberFormatter.format(value, "#.00") + ">Stop loss";
      label.set("text", text);
      rangeDataItem.set("value", value);
    };

    // 드래그 이벤트
    container.events.on("dragged", () => updateLabel());

    // container 초기 값 설정
    series.events.on("datavalidated", () => {
      const max = yAxis.getPrivate("max", 1);
      const min = yAxis.getPrivate("min", 0);
      const value = min + (max - min) / 2;
      rangeDataItem.set("value", value);
      updateLabel(value);
    });

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`