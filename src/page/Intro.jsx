import { useRef, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import Demos from "@/assets/demo.mp4";
import Guide from "@/components/Guide";
import CodeBox from "@/components/CodeBox";

export default function Intro() {
  // 문장 목록
  const installJsx = useMemo(() => {
    const code = `npm install @amcharts/amcharts5@5.10.10`;
    return (
      <>
        <h3 className="intro-subtitle">1. amCharts 5 설치</h3>
        <p>아래 명령어로 amCharts를 프로젝트에 설치합니다.</p>
        <small>* 일부 차트는 추가 라이브러리 설치가 필요할 수 있습니다.</small>
        <CodeBox code={code} codeType="bash" />
      </>
    );
  }, []);

  const customJsx = useMemo(() => {
    const code1 = `import * as am5 from "@amcharts/amcharts5";
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
};`;

    const code2 = `...
const themeCommon = (myTheme, theme) => {
...
  myTheme.rule("Label").setAll({
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "Pretendard-Regular",
    fill: chartVariables[theme].base,
  });
...
}`;
    return (
      <>
        <h3 className="intro-subtitle">2. 커스텀 테마 적용</h3>
        <p>
          amCharts 5의 스타일을 통일하기 위해 <code>chartTheme.js</code>에서
          공통 설정을 관리합니다. <br />
          프로젝트에 <code>chartTheme.js</code> 파일을 생성하고 아래 코드를 복사합니다.
        </p>
        <CodeBox code={code1} />
        <p>이후 차트의 폰트 스타일을 적용하기 위해 아래 설정을 수정합니다.</p>
        <p>
          파일 내부 <code>Label</code> 공통 설정의{" "}
          <code>fontFamily, fontWeight</code>를{" "}
          <strong>
            <code>CSS</code>에서 사용하는 것과 동일하게
          </strong>{" "}
          수정합니다.
        </p>
        <CodeBox code={code2} copy={false} />
      </>
    );
  }, []);

  const chartJsx = useMemo(() => {
    const code1 = `...
import * as themes from '@/assets/chartTheme'
import { useTheme } from '@/components/Theme'
...
export default function BasicBarChart() {
  const id = "basic-bar";
  const { theme, colorTheme } = useTheme();
  ...
}`;

    const code2 = `...
export default function BasicBarChart() {
  const id = "basic-bar";
  // const { theme, colorTheme } = useTheme();
  const theme = "light"; // light | dark
  const colorTheme = "basicTheme"; // basicTheme | violetTheme | pastelTheme |...
  ...
}`;
    return (
      <>
        <h3 className="intro-subtitle">3. 차트 생성</h3>
        <p>
          페이지에서 원하는 차트를 확인하고 적용 한 뒤 <br/><strong>차트 테마</strong> 및 <strong>컬러/모드 테마</strong>를
          가져오는 경로를 프로젝트 환경에 맞게 수정해야 합니다.
        </p>
        <p className="my-3">
        
          <strong>
            <code>theme</code>
          </strong>
          : 라이트/다크 테마 |
          <strong>
          <code> colorTheme</code>
          </strong>
          : 차트 색상 테마
          <br />
          * 데모에서는 <code>src/components/Theme.jsx</code> 파일에서 테마 설정을 관리하고
          있습니다.
        </p>
        <CodeBox code={code1} copy={false} />
        <p>
          프로젝트에서 동적 테마 관리가 필요하지 않다면, 아래와 같이 특정 값으로
          고정할 수 있습니다.
        </p>
        <CodeBox code={code2} copy={false} />
      </>
    );
  }, []);

  const useJsx = useMemo(() => {
    const code = `return (
  <div style={{width:400,height:400}}>
    <BasicBarChart/>
  </div>
)`;
    return (
      <>
        <h3 className="intro-subtitle">4. 차트 적용</h3>
        <p>컨테이너를 생성 후 차트를 자식으로 사용하며 컨테이너의 넓이 및 높이를 받아 사용합니다.</p>
        <p>* 일부 차트는 기준이 다른 경우가 있으며 자세한 내용은 각 차트를 확인 바랍니다.</p>
        <CodeBox code={code} copy={false} />
      </>
    );
  }, []);

  const demoJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">5. 데모</h3>
        <p className="mb-3">
          신규 프로젝트에서 차트를 적용해보는 데모 영상입니다.
        </p>
        <video controls src={Demos}></video>
      </>
    );
  }, []);

  // Ref, 문장 목록 구성
  const articleRef = useRef({});
  const list = [
    { name: "install", func: installJsx },
    { name: "custom", func: customJsx },
    { name: "chart", func: chartJsx },
    { name: "use", func: useJsx },
    { name: "demo", func: demoJsx },
  ];
  list.map((item) => (articleRef[item.name] = null));

  return (
    <div className="intro">
      <div className="intro-content">
        <h2 className="intro-title">
          amCharts 5 커스텀 데모
          <a className="btn" href="https://www.amcharts.com/" target="_blank">
            <ExternalLink size={14} />
          </a>
        </h2>
        <p>
          본 데모 페이지는 <strong>amCharts 5</strong>를 기반으로 다양한 차트를
          각각 프로젝트 디자인에 맞춰 빠르고 일관성 있게 구현하기 위하여
          만들어졌습니다.
          <br />
          <code>amCharts</code>에 대해 자세한 내용은 공식 문서를 참고
          부탁드립니다.
        </p>
        {/* amCharts 5 설치 */}
        {list.map((item, index) => {
          return (
            <article
              key={index}
              className="intro-article"
              ref={(el) => (articleRef.current[item.name] = el)}
            >
              {item.func}
            </article>
          );
        })}
      </div>
      {/* 목차 네비게이션 */}
      <Guide listRef={articleRef} list={list} />
    </div>
  );
}
