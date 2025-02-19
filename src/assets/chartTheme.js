import * as am5 from "@amcharts/amcharts5";
// 그라데이션 컬러 생성 함수
export const createColorList = (color1, color2, steps) => {
  const rgb2hsl = ([r, g, b]) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h =
        max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  };

  const hsl2rgb = ([h, s, l]) => {
    if (s === 0) return [l, l, l].map((v) => Math.round(v * 255));

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const hue2rgb = (t) =>
      t < 0
        ? hue2rgb(t + 1)
        : t > 1
        ? hue2rgb(t - 1)
        : t < 1 / 6
        ? p + (q - p) * 6 * t
        : t < 1 / 2
        ? q
        : t < 2 / 3
        ? p + (q - p) * (2 / 3 - t) * 6
        : p;

    return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)].map((v) =>
      Math.round(v * 255)
    );
  };

  const interpolateHSL = (c1, c2, factor) =>
    hsl2rgb(rgb2hsl(c1).map((v, i) => v + factor * (rgb2hsl(c2)[i] - v)));

  const rgbToHex = (rgb) =>
    `#${rgb
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;

  return Array.from({ length: steps }, (_, i) =>
    rgbToHex(interpolateHSL(color1, color2, i / (steps - 1)))
  );
};

// 테마
// 테마별 최소 색상 개수 (이 값 이하이면 기본 색상 배열 사용)
const colorRange = 8;

// 특정 개수(count)에 맞춰 그라데이션 색상을 생성하고 합치는는 함수
const createThemeColor = (count, primaryRanges) => {
  const colorList = [];
  const newCount = Math.max(2, Math.ceil(count / primaryRanges.length));
  primaryRanges.forEach(([start, end]) => {
    colorList.push(...createColorList(start, end, newCount));
  });
  return colorList;
};

// 테마 생성
// 기본색상(필수), 그라데이션(필수), 라인 불렛, 라인 스트로크
const createTheme = (primary, primaryRanges, bulletFill, lineStroke) => ({
  primary,
  lineColors: {
    bulletFill: bulletFill || "#fff",
    lineStroke: lineStroke || [primary[1], primary[3], primary[5]],
  },
  colorSet(count) {
    return count <= colorRange
      ? primary
      : createThemeColor(count, primaryRanges);
  },
});

// basicTheme
export const basicTheme = createTheme(
  [
    "#78DFD7",
    "#3AC6E1",
    "#2BABE0",
    "#207ED1",
    "#1F5CCC",
    "#2230BD",
    "#1413A5",
    "#0F158F",
  ],
  [
    [
      [120, 223, 215],
      [15, 21, 143],
    ],
  ]
);

// purpleTheme
export const purpleTheme = createTheme(
  [
    "#9688E5",
    "#A16EDD",
    "#C86ED6",
    "#DD6EC1",
    "#CB5EA3",
    "#A23A7C",
    "#CB5EA3",
    "#A23A7C",
  ],
  [
    [
      [150, 136, 229],
      [162, 58, 124],
    ],
  ]
);

// colorfullTheme
export const colorfullTheme = createTheme(
  [
    "#F4BF83",
    "#EEAD9C",
    "#E1A3CE",
    "#9DB6D7",
    "#8ECFCD",
    "#BFDCB1",
    "#8ECFCD",
    "#BFDCB1",
  ],
  [
    [
      [244, 191, 131],
      [238, 173, 156],
    ],
    [
      [231, 168, 181],
      [198, 167, 217],
    ],
    [
      [187, 177, 232],
      [142, 192, 206],
    ],
    [
      [142, 200, 206],
      [191, 220, 177],
    ],
  ]
);

// 다크모드, 라이트모드 컬러(테마 컬러와 관계 없음)
export const modeColor = {
  light: {
    base: "#222",
    line: "#fff",
    grid: "#D1DBE1",
    bg: "#FFF",
    shadow: "#ccc",
  },
  dark: {
    base: "#ccc",
    line: "#333",
    grid: "#666",
    bg: "#222",
    shadow: "#222",
  },
};

// amchart 커스텀 테마 룰 생성
export const myThemeRule = (root, colorList, theme) => {
  const myTheme = am5.Theme.new(root);
  const colorSet = am5.ColorSet.new(root, {
    colors: colorList.map((color) => am5.color(color)),
  });

  // Line 공통
  myTheme.rule("Line").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [4, 4],
    stroke: modeColor[theme].base,
  });

  // Tick 공통
  myTheme.rule("Tick").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [2, 2],
    stroke: modeColor[theme].base,
  });

  // grid 공통
  myTheme.rule("Grid").setAll({
    strokeOpacity: 0.1,
    stroke: modeColor[theme].base,
  });

  // Label 공통
  myTheme.rule("Label").setAll({
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "Pretendard-Regular",
    fill: modeColor[theme].base,
  });

  // Tooltip 공통
  myTheme.rule("Tooltip").setAll({
    paddingTop: 4,
    paddingBottom: 5,
  });

  // Legend 공통
  myTheme.rule("Label", ["legend"]).setAll({ fontSize: 14, fontWeight: 300 });
  myTheme.rule("RoundedRectangle", ["legend", "marker", "rectangle"]).setAll({
    width: 12,
    height: 12,
    y: am5.percent(50),
    x: am5.percent(40),
    centerY: am5.percent(50),
  });

  myTheme
    .rule("Label", ["legend", "value"])
    .events.on("dataitemchanged", function (ev) {
      const series = ev.target.dataItem;
      ev.target.setAll({ fill: series.get("fill") });
    });

  // Pie 그래프 공통
  myTheme.rule("PieSeries").set("colors", colorSet);
  myTheme
    .rule("Slice", ["pie", "series"])
    .states.create("active", { shiftRadius: 10 });

  // xy 차트 공통
  myTheme.rule("XYChart").setAll({
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 4,
  });

  myTheme.rule("XYChart").setup = (chart) => {
    const plotContainer = chart.plotContainer.get("background");
    plotContainer?.setAll({
      layer: 9,
      strokeWidth: 1,
      stroke: modeColor[theme].grid,
    });
  };

  myTheme.rule("AxisRendererX").set("minGridDistance", 50);
  myTheme.rule("AxisRendererX").setup = (xRenderer) => {
    xRenderer.grid.template.setAll({
      stroke: modeColor[theme].grid,
    });
  };

  myTheme.rule("AxisRendererY").setup = (yRenderer) => {
    yRenderer.labels.template.setAll({
      maxWidth: "auto",
      oversizedBehavior: "none",
    });
    yRenderer.grid.template.setAll({
      stroke: modeColor[theme].grid,
    });
  };

  myTheme
    .rule("AxisLabel")
    .setAll({ oversizedBehavior: "truncate", maxWidth: 60 });

  // column 그래프 공통
  myTheme.rule("XYChart").set("colors", colorSet);
  myTheme.rule("RoundedRectangle", ["series", "column"]).setAll({
    strokeOpacity: 0,
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
  });

  // line 그래프 공통
  myTheme.rule("LineSeries").setup = (line) => {
    line.strokes.template.setAll({ strokeWidth: 2 });
  };

  return myTheme;
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
