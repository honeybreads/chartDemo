import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { tag: "JavaScript", weight: 64.96 },
  { tag: "HTML/CSS", weight: 56.07 },
  { tag: "Python", weight: 48.24 },
  { tag: "SQL", weight: 47.08 },
  { tag: "Java", weight: 35.35 },
  { tag: "Node.js", weight: 33.91 },
  { tag: "TypeScript", weight: 30.19 },
  { tag: "C#", weight: 27.86 },
  { tag: "Bash/Shell", weight: 27.13 },
  { tag: "C++", weight: 24.31 },
  { tag: "PHP", weight: 21.98 },
  { tag: "C", weight: 21.01 },
  { tag: "PowerShell", weight: 10.75 },
  { tag: "Go", weight: 9.55 },
  { tag: "Kotlin", weight: 8.32 },
  { tag: "Rust", weight: 7.03 },
  { tag: "Ruby", weight: 6.75 },
  { tag: "Dart", weight: 6.02 },
  { tag: "Assembly", weight: 5.61 },
  { tag: "Swift", weight: 5.1 },
  { tag: "R", weight: 5.07 },
  { tag: "VBA", weight: 4.66 },
  { tag: "Matlab", weight: 4.66 },
  { tag: "Groovy", weight: 3.01 },
  { tag: "Objective-C", weight: 2.8 },
  { tag: "Scala", weight: 2.6 },
  { tag: "Perl", weight: 2.46 },
  { tag: "Haskell", weight: 2.12 },
  { tag: "Delphi", weight: 2.1 },
  { tag: "Clojure", weight: 1.88 },
  { tag: "Elixir", weight: 1.74 },
  { tag: "LISP", weight: 1.33 },
  { tag: "Julia", weight: 1.29 },
  { tag: "F#", weight: 0.97 },
  { tag: "Erlang", weight: 0.79 },
  { tag: "APL", weight: 0.65 },
  { tag: "Crystal", weight: 0.56 },
  { tag: "COBOL", weight: 0.53 },
];

const maxValue = Math.max(...[...data.map((item) => Math.ceil(item.weight))]);

// BasicWordCloudChart
export default function BasicWordCloudChart() {
  const id = "basic-word";
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

    // series 생성
    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        angles: [0, 90],
        valueField: "weight",
        categoryField: "tag",
        minFontSize: am5.percent(5),
        maxFontSize: am5.percent(20),
      })
    );

    series.set("heatRules", [
      {
        dataField: "value",
        target: series.labels.template,
        customFunction: (sprite, min, max, value) => {
          if (value < maxValue * 0.2) {
            sprite.set("fill", colorList[0]);
          } else if (value < maxValue * 0.5) {
            sprite.set("fontWeight", 400);
            sprite.set("fill", colorList[2]);
          } else if (value < maxValue * 0.7) {
            sprite.set("fill", colorList[4]);
            sprite.set("fontWeight", 500);
          } else {
            sprite.set("fill", colorList[6]);
            sprite.set("fontWeight", 700);
          }
        },
      },
    ]);

    // 데이터 적용
    series.data.setAll(data);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicWordCloudCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { tag: "JavaScript", weight: 64.96 },
  { tag: "HTML/CSS", weight: 56.07 },
  { tag: "Python", weight: 48.24 },
  { tag: "SQL", weight: 47.08 },
  { tag: "Java", weight: 35.35 },
  { tag: "Node.js", weight: 33.91 },
  { tag: "TypeScript", weight: 30.19 },
  { tag: "C#", weight: 27.86 },
  { tag: "Bash/Shell", weight: 27.13 },
  { tag: "C++", weight: 24.31 },
  { tag: "PHP", weight: 21.98 },
  { tag: "C", weight: 21.01 },
  { tag: "PowerShell", weight: 10.75 },
  { tag: "Go", weight: 9.55 },
  { tag: "Kotlin", weight: 8.32 },
  { tag: "Rust", weight: 7.03 },
  { tag: "Ruby", weight: 6.75 },
  { tag: "Dart", weight: 6.02 },
  { tag: "Assembly", weight: 5.61 },
  { tag: "Swift", weight: 5.1 },
  { tag: "R", weight: 5.07 },
  { tag: "VBA", weight: 4.66 },
  { tag: "Matlab", weight: 4.66 },
  { tag: "Groovy", weight: 3.01 },
  { tag: "Objective-C", weight: 2.8 },
  { tag: "Scala", weight: 2.6 },
  { tag: "Perl", weight: 2.46 },
  { tag: "Haskell", weight: 2.12 },
  { tag: "Delphi", weight: 2.1 },
  { tag: "Clojure", weight: 1.88 },
  { tag: "Elixir", weight: 1.74 },
  { tag: "LISP", weight: 1.33 },
  { tag: "Julia", weight: 1.29 },
  { tag: "F#", weight: 0.97 },
  { tag: "Erlang", weight: 0.79 },
  { tag: "APL", weight: 0.65 },
  { tag: "Crystal", weight: 0.56 },
  { tag: "COBOL", weight: 0.53 },
];

const maxValue = Math.max(...[...data.map((item) => Math.ceil(item.weight))]);

// BasicWordCloudChart
export default function BasicWordCloudChart() {
  const id = "basic-word";
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

    // series 생성
    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        angles: [0, 90],
        valueField: "weight",
        categoryField: "tag",
        minFontSize: am5.percent(5),
        maxFontSize: am5.percent(20),
      })
    );

    series.set("heatRules", [
      {
        dataField: "value",
        target: series.labels.template,
        customFunction: (sprite, min, max, value) => {
          if (value < maxValue * 0.2) {
            sprite.set("fill", colorList[0]);
          } else if (value < maxValue * 0.5) {
            sprite.set("fontWeight", 400);
            sprite.set("fill", colorList[2]);
          } else if (value < maxValue * 0.7) {
            sprite.set("fill", colorList[4]);
            sprite.set("fontWeight", 500);
          } else {
            sprite.set("fill", colorList[6]);
            sprite.set("fontWeight", 700);
          }
        },
      },
    ]);

    // 데이터 적용
    series.data.setAll(data);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`