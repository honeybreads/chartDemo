import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "D", value: 8 },
  { from: "B", to: "E", value: 4 },
  { from: "C", to: "E", value: 3 },
  { from: "D", to: "G", value: 5 },
  { from: "D", to: "I", value: 2 },
  { from: "D", to: "H", value: 3 },
  { from: "E", to: "H", value: 6 },
  { from: "G", to: "J", value: 5 },
  { from: "I", to: "J", value: 1 },
  { from: "H", to: "J", value: 9 },
];

// SankeyDiagramChart
export default function SankeyDiagramChart() {
  const id = "sankey-diagram";
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
    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    // Series 생성
    const series = root.container.children.push(
      am5flow.Sankey.new(root, {
        paddingLeft:0,
        valueField: "value",
        targetIdField: "to",
        sourceIdField: "from",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{sourceId} - {targetId}: {value}",
        }),
      })
    );

    series.nodes.set("colors", colorSet);
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => themes.chartVariables.light.base);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const SankeyDiagramCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "D", value: 8 },
  { from: "B", to: "E", value: 4 },
  { from: "C", to: "E", value: 3 },
  { from: "D", to: "G", value: 5 },
  { from: "D", to: "I", value: 2 },
  { from: "D", to: "H", value: 3 },
  { from: "E", to: "H", value: 6 },
  { from: "G", to: "J", value: 5 },
  { from: "I", to: "J", value: 1 },
  { from: "H", to: "J", value: 9 },
];

// SankeyDiagramChart
export default function SankeyDiagramChart() {
  const id = "sankey-diagram";
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
    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    // Series 생성
    const series = root.container.children.push(
      am5flow.Sankey.new(root, {
        paddingLeft:0,
        valueField: "value",
        targetIdField: "to",
        sourceIdField: "from",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{sourceId} - {targetId}: {value}",
        }),
      })
    );
    
    series.nodes.set("colors", colorSet);
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => themes.chartVariables.light.base);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
