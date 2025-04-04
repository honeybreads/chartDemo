import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Tree" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 3, category: "Seven" },
];

// BasicPyramidChart
export default function BasicPyramidChart() {
  const id = "basic-pyramid";
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
    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
        paddingBottom:0,
      })
    );

    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    const series = chart.series.push(
      am5percent.PyramidSeries.new(root, {
        orientation: "vertical",
        valueField: "value",
        categoryField: "category",
      })
    );
    series.set("colors", colorSet);

    series.labels.template.setAll({
      width: 100,
      maxWidth: 100,
      textAlign: "center",
      oversizedBehavior: "truncate",
    });

    const legend = chart.children.push(
      am5.Legend.new(root, {
        marginTop: 12,
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legnedBackground(root,theme)
      })
    );

    // 데이터 적용
    series.data.setAll(data.reverse());
    legend.data.setAll(am5.array.copy(series.dataItems).reverse());

    // 애니메이션 적용
    legend.appear(1000, 0);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicPyramidCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Tree" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 3, category: "Seven" },
];

// BasicPyramidChart
export default function BasicPyramidChart() {
  const id = "basic-pyramid";
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
    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
        paddingBottom:0,
      })
    );

    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    const series = chart.series.push(
      am5percent.PyramidSeries.new(root, {
        orientation: "vertical",
        valueField: "value",
        categoryField: "category",
      })
    );
    series.set("colors", colorSet);

    series.labels.template.setAll({
      width: 100,
      maxWidth: 100,
      textAlign: "center",
      oversizedBehavior: "truncate",
    });

    const legend = chart.children.push(
      am5.Legend.new(root, {
        marginTop: 12,
        x: am5.percent(50),
        centerX: am5.percent(50),
        ...themes.legnedBackground(root,theme)
      })
    );

    // 데이터 적용
    series.data.setAll(data.reverse());
    legend.data.setAll(am5.array.copy(series.dataItems).reverse());

    // 애니메이션 적용
    legend.appear(1000, 0);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`