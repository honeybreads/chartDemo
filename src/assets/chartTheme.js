import * as am5 from "@amcharts/amcharts5";

// 시작 색상과 끝 색상 사이의 색상 목록을 생성하는 함수
export const createColorList = (color1, color2, step) => {
  const factorStep = 1 / (step - 1);
  const util = {
    // RGB 색상을 HSL로 변환
    rgb2hsl(color) {
      const r = color[0] / 255;
      const g = color[1] / 255;
      const b = color[2] / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    },

    // HSL 색상을 RGB로 변환
    hsl2rgb(color) {
      const [h, s, l] = color;
      if (s === 0) {
        const gray = Math.round(l * 255);
        return [gray, gray, gray];
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const r = hue2rgb(p, q, h + 1 / 3);
        const g = hue2rgb(p, q, h);
        const b = hue2rgb(p, q, h - 1 / 3);
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      }
    },

    // 두 색상 사이의 중간 색상을 계산
    interpolateHSL(color1, color2, factor) {
      const hsl1 = this.rgb2hsl(color1);
      const hsl2 = this.rgb2hsl(color2);

      const interpolatedHSL = hsl1.map(
        (val, index) => val + factor * (hsl2[index] - val)
      );

      return this.hsl2rgb(interpolatedHSL);
    },
  };

  // 색상 목록 생성
  const generateColorList = () => {
    const colorList = [];
    for (let i = 0; i < step; i++) {
      const factor = factorStep * i;
      colorList.push(util.interpolateHSL(color1, color2, factor));
    }
    return colorList;
  };

  //RGB 색상을 HEX 코드로 변환
  const rgbToHex = (rgb) =>
    rgb
      .map((val) => val.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

  // 최종 색상 목록 반환 (HEX 코드로 변환)
  return generateColorList().map((rgb) => `#${rgbToHex(rgb)}`);
};

// 테마 컬러 목록 생성
const createThemeColor = (count, primary) => {
  const colorList = [];
  let newCount = Math.ceil(count / primary.length);
  primary.map((item) => {
    newCount = newCount === 1 ? 2 : newCount;
    colorList.push(...createColorList(item[0], item[1], newCount));
  });
  return colorList;
};

// 기본 테마
const colorRange = 8;
export const basicTheme = (() => {
  const primary = [
    "#78DFD7",
    "#3AC6E1",
    "#279CDB",
    "#2073CF",
    "#2230BD",
    "#0F158F",
    "#2230BD",
    "#0F158F",
  ];

  const primaryRange = [
    [
      [120, 223, 215],
      [15, 21, 143],
    ],
  ];

  return {
    primary,
    lineColors: {
      bulletFill: "#fff",
      lineStroke: [primary[1], primary[3], primary[5]],
    },
    colorSet(count) {
      if (count <= colorRange) return primary;
      else return createThemeColor(count, primaryRange);
    },
  };
})();

export const purpleTheme = (() => {
  const primary = [
    "#9688E5",
    "#A16EDD",
    "#C86ED6",
    "#DD6EC1",
    "#CB5EA3",
    "#A23A7C",
    "#CB5EA3",
    "#A23A7C",
  ];
  const primaryRange = [
    [
      [150, 136, 229],
      [162, 58, 124],
    ],
  ];

  return {
    primary,
    lineColors: {
      bulletFill: "#fff",
      lineStroke: [primary[1], primary[3], primary[5]],
    },
    colorSet(count) {
      if (count <= colorRange) return primary;
      else return createThemeColor(count, primaryRange);
    },
  };
})();

// 다중 컬러 테스트 테마
export const grayBlueTheme = (() => {
  const primary = [
    "#5F5D6B",
    "#B1B8B6",
    "#84B6B8",
    "#02B8C8",
    "#026FB0",
    "#00387E",
    "#026FB0",
    "#00387E",
  ];
  const primaryRange = [
    [
      [95, 93, 107],
      [132, 182, 184],
    ],
    [
      [122, 193, 198],
      [0, 56, 126],
    ],
  ];

  return {
    primary,
    lineColors: {
      bulletFill: "#fff",
      lineStroke: [primary[1], primary[3], primary[5]],
    },
    colorSet(count) {
      if (count <= colorRange) return primary;
      else return createThemeColor(count, primaryRange);
    },
  };
})();

export const colorfullTheme = (() => {
  const primary = [
    "#F4BF83",
    "#EEAD9C",
    "#E1A3CE",
    "#9DB6D7",
    "#8ECFCD",
    "#BFDCB1",
    "#8ECFCD",
    "#BFDCB1",
  ];
  const primaryRange = [
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
  ];

  return {
    primary,
    lineColors: {
      bulletFill: "#fff",
      lineStroke: [primary[1], primary[3], primary[5]],
    },
    colorSet(count) {
      if (count <= colorRange) return primary;
      else return createThemeColor(count, primaryRange);
    },
  };
})();

// 모드별 컬러
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

// 스타일 테마
export const myThemeRule = (root, colorList, theme) => {
  let myTheme = am5.Theme.new(root);
  const colorSet = am5.ColorSet.new(root, {
    colors: colorList.map((color) => am5.color(color)),
  });

  // Line 공통 스타일
  myTheme.rule("Line").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [4, 4],
    stroke: modeColor[theme].base,
  });

  // Tick 공통 스타일
  myTheme.rule("Tick").setAll({
    strokeOpacity: 0.4,
    strokeDasharray: [2, 2],
    stroke: modeColor[theme].base,
  });

  // grid 공통 스타일
  myTheme.rule("Grid").setAll({
    strokeOpacity: 0.1,
    stroke: modeColor[theme].base,
  });

  // Label 공통 스타일
  myTheme.rule("Label").setAll({
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "Pretendard-Regular",
    fill: modeColor[theme].base,
  });

  // Tooltip 공통 스타일
  myTheme.rule("Tooltip").setAll({
    paddingTop: 4,
    paddingBottom: 5,
  });

  // Legend 스타일
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

  // Pie 그래프 공통 스타일
  myTheme.rule("PieSeries").set("colors", colorSet);
  myTheme
    .rule("Slice", ["pie", "series"])
    .states.create("active", { shiftRadius: 10 });

  // xy 차트 공통 스타일
  myTheme.rule("XYChart").setAll({
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
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
    .setAll({ oversizedBehavior: "truncate", maxWidth: 50 });

  // column 그래프 공통 스타일
  myTheme.rule("XYChart").set("colors", colorSet);
  myTheme.rule("RoundedRectangle", ["series", "column"]).setAll({
    strokeOpacity: 0,
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
  });

  // line 그래프 공통 스타일
  myTheme.rule("LineSeries").setup = (line) => {
    line.strokes.template.setAll({ strokeWidth: 2 });
  };

  return myTheme;
};

// 범용 불렛 스프라이트
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
