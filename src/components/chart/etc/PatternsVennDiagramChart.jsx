import * as am5 from "@amcharts/amcharts5";
import { useLayoutEffect } from "react";
import * as am5venn from "@amcharts/amcharts5/venn";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

//PatternsVennDiagramChart
export default function PatternsVennDiagramChart() {
  const id = "patternsvenn-diagram";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    // container 생성
    const color1 = colorList[0];
    const color2 = colorList[1];

    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    );

    // chart 생성
    const chart = container.children.push(
      am5venn.Venn.new(root, {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        valueField: "value",
        categoryField: "name",
        intersectionsField: "sets",
      })
    );

    chart.slices.template.setAll({ templateField: "sliceSettings" });
    chart.labels.template.setAll({ templateField: "labelSettings" });

    // data 적용
    chart.data.setAll([
      {
        name: "color1",
        value: 100,
        sliceSettings: {
          fill: color1,
          stroke: color1,
        },
        labelSettings: {
          fill: themes.createAlternative(color1),
        },
      },
      {
        name: "color2",
        value: 100,
        sliceSettings: {
          fill: color2,
          stroke: color2,
        },
        labelSettings: {
          fill: themes.createAlternative(color2),
        },
      },
      {
        name: "pattern",
        value: 30,
        sets: ["color1", "color2"],
        sliceSettings: {
          fillPattern: am5.CirclePattern.new(root, {
            gap: 10,
            radius: 10,
            fill: color1,
            color: color2,
            checkered: true,
          }),
          stroke: am5.color("#fff"),
        },
        labelSettings: {
          fill: themes.createAlternative(color1),
        },
      },
    ]);

    // hover 효과
    chart.hoverGraphics.setAll({
      stroke: color2,
      strokeWidth: 2,
      strokeDasharray: [3, 3],
    });

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const PatternsVennDiagramCodeblock = `import * as am5 from "@amcharts/amcharts5";
import { useLayoutEffect } from "react";
import * as am5venn from "@amcharts/amcharts5/venn";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

//PatternsVennDiagramChart
export default function PatternsVennDiagramChart() {
  const id = "patternsvenn-diagram";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    // container 생성
    const color1 = colorList[0];
    const color2 = colorList[1];

    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    );

    // chart 생성
    const chart = container.children.push(
      am5venn.Venn.new(root, {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        valueField: "value",
        categoryField: "name",
        intersectionsField: "sets",
      })
    );

    chart.slices.template.setAll({ templateField: "sliceSettings" });
    chart.labels.template.setAll({ templateField: "labelSettings" });

    // data 적용
    chart.data.setAll([
      {
        name: "color1",
        value: 100,
        sliceSettings: {
          fill: color1,
          stroke: color1,
        },
        labelSettings: {
          fill: themes.createAlternative(color1),
        },
      },
      {
        name: "color2",
        value: 100,
        sliceSettings: {
          fill: color2,
          stroke: color2,
        },
        labelSettings: {
          fill: themes.createAlternative(color2),
        },
      },
      {
        name: "pattern",
        value: 30,
        sets: ["color1", "color2"],
        sliceSettings: {
          fillPattern: am5.CirclePattern.new(root, {
            gap: 10,
            radius: 10,
            fill: color1,
            color: color2,
            checkered: true,
          }),
          stroke: am5.color("#fff"),
        },
        labelSettings: {
          fill: themes.createAlternative(color1),
        },
      },
    ]);

    // hover 효과
    chart.hoverGraphics.setAll({
      stroke: color2,
      strokeWidth: 2,
      strokeDasharray: [3, 3],
    });

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`