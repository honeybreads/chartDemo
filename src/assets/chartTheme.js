import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

// 컬러 설정
// 컬러 테마 생성 함수
const createTheme = (primary, lineStroke, bulletFill) => ({
  primary,
  lineColors: {
    bulletFill: bulletFill || "#fff",
    lineStroke: lineStroke || "#222",
  },
  state: {
    positive: "#1C8BFF",
    negative: "#FF2B67",
    critical: "#D64B4B",
    major:"#FF9232",
    minor:"#D6C14B",
    warning:"#68BC28",
    normal:"#388844"
  },
});

// basicTheme
export const basicTheme = createTheme(
  [
    "#0086cc",
    "#00b0dd",
    "#5cdcff",
    "#38e1d7",
    "#acdf20",
    "#80d929",
    "#11af09",
    "#008290",
    "#004a90",
    "#095bf4",
    "#47a0ff",
    "#7bbbff",
    "#aeafff",
    "#9e83ff",
    "#723cf1",
    "#4b00a6",
    "#8100bc",
    "#ad1af0",
    "#e372ff",
    "#f3a4ff",
  ],
  "#ad1af0"
);

// violetTheme
export const violetTheme = createTheme(
  [
    "#ad1af0",
    "#d372ff",
    "#e5abff",
    "#ff7efe",
    "#ffa7eb",
    "#ff6dce",
    "#e900b3",
    "#8100bc",
    "#4b00a6",
    "#723cf1",
    "#9e83ff",
    "#aeafff",
    "#7bbbff",
    "#47a0ff",
    "#095bf4",
    "#004a90",
    "#0086cc",
    "#00b0dd",
    "#5cdcff",
    "#38e1d7",
  ],
  "#0086cc"
);

// pastelTheme
export const pastelTheme = createTheme(
  [
    "#ff9794",
    "#ffb663",
    "#ffd900",
    "#acdf20",
    "#80d929",
    "#72d7d0",
    "#a7d2ff",
    "#a8a9ff",
    "#e5abff",
    "#ffa7eb",
    "#c39d91",
    "#b5b864",
    "#11af09",
    "#008290",
    "#0086cc",
    "#779cbe",
    "#6893ff",
    "#8968ff",
    "#be5dff",
    "#ff47ac",
  ],
  "#aeafff"
);

// 다크모드, 라이트모드 컬러(테마 컬러와 관계 없음)
export const chartVariables = {
  default: {
    barRadius: 4,
  },
  light: {
    base: "#222",
    line: "#fff",
    grid: "#D1DBE1",
    bg: "#FFF",
    shadow: "#ccc",
    disabled: "#ccc",
    scrollbar: "#ddd",
    scrollChart: "#aaa",
  },
  dark: {
    base: "#ccc",
    line: "#333",
    grid: "#666",
    bg: "#222",
    shadow: "#222",
    disabled: "#444",
    scrollbar: "#222",
    scrollChart: "#666",
  },
};

// 차트 설정
// 차트 테마 공통 옵션
const themeCommon = (myTheme, theme) => {
  myTheme.rule("Line").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [4, 4],
  });

  myTheme.rule("Tick").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [2, 2],
  });

  myTheme.rule("Grid").setAll({
    strokeOpacity: 0.1,
  });

  myTheme.rule("Label").setAll({
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "Pretendard-Regular",
    fill: chartVariables[theme].base,
  });

  myTheme.rule("Tooltip").setAll({
    paddingTop: 4,
    paddingBottom: 5,
  });

  myTheme.rule("Container", ["legend", "item", "itemcontainer"]).setAll({
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 2,
  });

  myTheme.rule("Label", ["legend"]).setAll({
    fontSize: 13,
    fontWeight: 300,
  });

  myTheme.rule("RoundedRectangle", ["legend", "marker", "rectangle"]).setAll({
    width: 12,
    height: 12,
    y: am5.percent(50),
    x: am5.percent(30),
    centerY: am5.percent(50),
    strokeDasharray: [0, 1],
  });

  myTheme
    .rule("Label", ["legend", "value"])
    .events.on("dataitemchanged", (ev) => {
      const series = ev.target.dataItem;
      ev.target.setAll({
        fill: series.get("fill"),
      });
    });
};

// Pie 그래프 옵션
const themePie = (myTheme, colorSet) => {
  myTheme.rule("PieSeries").set("colors", colorSet);
  myTheme.rule("Slice", ["pie", "series"]).states.create("active", {
    shiftRadius: 5,
  });
};

// xy 그래프 옵션
const themeXy = (myTheme, theme) => {
  myTheme.rule("XYChart").setAll({
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  });

  myTheme.rule("XYChart").setup = (chart) => {
    const plotContainer = chart.plotContainer.get("background");
    plotContainer?.setAll({
      layer: 9,
      stroke: chartVariables[theme].grid,
    });
  };

  myTheme.rule("AxisRendererX").set("minGridDistance", 50);
  myTheme.rule("AxisRendererY").setup = (yRenderer) => {
    yRenderer.labels.template.setAll({
      maxWidth: "auto",
      oversizedBehavior: "none",
    });
  };

  myTheme.rule("AxisLabel").setAll({
    maxWidth: 60,
    oversizedBehavior: "truncate",
  });
};

// column 그래프 옵션
const themeColumn = (myTheme, colorSet) => {
  myTheme.rule("XYChart").set("colors", colorSet);
  myTheme.rule("RoundedRectangle", ["series", "column"]).setAll({
    strokeOpacity: 0,
    cornerRadiusTL: chartVariables.default.barRadius,
    cornerRadiusTR: chartVariables.default.barRadius,
  });
};

// line 그래프 옵션
const themeLine = (myTheme) => {
  myTheme.rule("LineSeries").setup = (line) => {
    line.strokes.template.setAll({ strokeWidth: 2 });
  };
};

// 범용 불렛 스프라이트 생성 함수
export const createBulletSpriet = (root, fill, stroke, options) => {
  const bullet = am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Circle.new(root, {
      fill,
      stroke,
      radius: 5,
      strokeWidth: 2,
      ...options,
    }),
  });
  return bullet;
};

// Pie Series maxWidth 구하는 함수
export const seriesSetMaxWidth = (target) => {
  const percent = target.dataItem?.get("valuePercentTotal");
  const baseHeight = target.parent.parent.parent._prevHeight;
  target.set("maxWidth", (baseHeight * percent) / 36 - 24);
};

// x,y axis label width 구하는 함수
export const axisLabelSetWidth = (xAxis, target) => {
  const x0 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 0);
  const x1 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 1);
  target.set("maxWidth", x1 - x0);
};

// 다운로드 버튼 생성 함수
export const createExportButton = (root) => {
  const exportBtn = am5plugins_exporting.Exporting.new(root, {
    menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  });
  const exportBtnBg = document.querySelector(".am5exporting-icon");
  const exportBtnPath = document.querySelector(".am5exporting-menu path");
  exportBtnBg.style.background = chartVariables.dark.base;
  exportBtnPath.style.fill = chartVariables.dark.line;

  return exportBtn;
};

// 범례 배경색 생성 함수
export const legendBackground = (root, theme) => {
  const option = {
    marginTop:1,
    marginLeft:1,
    marginRight:1,
    marginBottom:1,
    paddingTop: 6,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 6,
    background: am5.RoundedRectangle.new(root, {
      fillOpacity: 1,
      strokeWidth:0.5,
      cornerRadiusTR: 4,
      cornerRadiusTL: 4,
      cornerRadiusBR: 4,
      cornerRadiusBL: 4,
      fill: chartVariables[theme].bg,
      stroke:chartVariables[theme].grid,
    }),
  };

  return option;
};

// 색상 대비 생성 함수
export const createAlternative = (color) => {
  return am5.Color.alternative(
    am5.color(color),
    am5.color(chartVariables.light.bg),
    am5.color(chartVariables.dark.bg)
  );
};

// 커스텀 테마 생성
export const myThemeRule = (root, colorList, theme) => {
  // am5 새로운 테마 생성, 컬러셋 생성
  const myTheme = am5.Theme.new(root);
  const colorSet = am5.ColorSet.new(root, {
    colors: colorList.map((color) => am5.color(color)),
  });

  // 루트 컬러 체인지
  const primaryCol = am5.color(colorList[0]);
  const primaryLightCol = am5.Color.lighten(primaryCol, 0.5);
  root.interfaceColors.setAll({
    stroke: chartVariables[theme].base,
    grid: chartVariables[theme].grid,
    primaryButton: primaryCol,
    primaryButtonHover: primaryCol,
    primaryButtonActive: primaryCol,
    primaryButtonDown: primaryLightCol,
    primaryButtonStroke: "transparent",
  });

  // 각 차트 옵션
  themeCommon(myTheme, theme);
  themePie(myTheme, colorSet);
  themeXy(myTheme, theme);
  themeColumn(myTheme, colorSet);
  themeLine(myTheme);

  return myTheme;
};
