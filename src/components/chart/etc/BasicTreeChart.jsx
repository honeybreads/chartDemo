import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  name: "Root",
  children: [
    {
      name: "A0",
      children: [
        {
          name: "A0A1",
          value: 45,
        },
        {
          name: "A0B1",
          value: 4,
        },
        {
          name: "A0C1",
          value: 23,
        },
      ],
    },
    {
      name: "B0",
      children: [
        {
          name: "B1A1",
          children: [
            {
              name: "B1A0A2",
              value: 6,
            },
            {
              name: "B1A0B2",
              value: 87,
            },
          ],
        },
        {
          name: "B1B1",
          value: 29,
        },
        {
          name: "B1C1",
          children: [
            {
              name: "B1C2A2",
              value: 23,
            },
            {
              name: "B1C2B2",
              children: [
                {
                  name: "B1C2B10",
                  value: 5,
                },
                {
                  name: "B1C2B11",
                  value: 35,
                },
                {
                  name: "B1C2B12",
                  value: 69,
                },
                {
                  name: "B1C2B13",
                  value: 92,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

//BasicTreeChart
export default function BasicTreeChart() {
  const id = "basic-tree";
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

    // container 생성
    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true,
      })
    );

    const zoomTool = zoomableContainer.children.push(
      am5.ZoomTools.new(root, { target: zoomableContainer })
    );

    zoomTool.minusButton
      .get("background")
      .states.create("disabled", {})
      .setAll({ fill: themes.chartVariables[theme].disabled });

    // series 생성
    const series = zoomableContainer.contents.children.push(
      am5hierarchy.Tree.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        paddingTop: 28,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    
    series.labels.template.set("minScale", 0);
    series.get("colors").setAll({ colors: colorList });
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => am5.color("#000"));

    // series 원형 제거 및 사각형 추가
    series.circles.template.set("forceHidden", true);
    series.outerCircles.template.set("forceHidden", true);
    series.nodes.template.events.on("dataitemchanged", (e) => {
      e.target.children.push(
        am5.Rectangle.new(root, {
          width: 50,
          height: 25,
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          fill: e.target.dataItem.get("fill"),
        })
      );
    });

    series.labels.template.adapters.add("fill", (_, target) => {
      let color = am5.color("#fff");
      if (target.parent) {
        const fillColor = target.parent?.dataItem.get("fill");
        color = themes.createAlternative(fillColor);
      }
      return color;
    });

    // 데이터 적용
    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock 
export const BasicTreeCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  name: "Root",
  children: [
    {
      name: "A0",
      children: [
        {
          name: "A0A1",
          value: 45,
        },
        {
          name: "A0B1",
          value: 4,
        },
        {
          name: "A0C1",
          value: 23,
        },
      ],
    },
    {
      name: "B0",
      children: [
        {
          name: "B1A1",
          children: [
            {
              name: "B1A0A2",
              value: 6,
            },
            {
              name: "B1A0B2",
              value: 87,
            },
          ],
        },
        {
          name: "B1B1",
          value: 29,
        },
        {
          name: "B1C1",
          children: [
            {
              name: "B1C2A2",
              value: 23,
            },
            {
              name: "B1C2B2",
              children: [
                {
                  name: "B1C2B10",
                  value: 5,
                },
                {
                  name: "B1C2B11",
                  value: 35,
                },
                {
                  name: "B1C2B12",
                  value: 69,
                },
                {
                  name: "B1C2B13",
                  value: 92,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

//BasicTreeChart
export default function BasicTreeChart() {
  const id = "basic-tree";
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

    // container 생성
    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true,
      })
    );

    const zoomTool = zoomableContainer.children.push(
      am5.ZoomTools.new(root, { target: zoomableContainer })
    );

    zoomTool.minusButton
      .get("background")
      .states.create("disabled", {})
      .setAll({ fill: themes.chartVariables[theme].disabled });

    // series 생성
    const series = zoomableContainer.contents.children.push(
      am5hierarchy.Tree.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        paddingTop: 28,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    
    series.labels.template.set("minScale", 0);
    series.get("colors").setAll({ colors: colorList });
    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => am5.color("#000"));

    // series 원형 제거 및 사각형 추가
    series.circles.template.set("forceHidden", true);
    series.outerCircles.template.set("forceHidden", true);
    series.nodes.template.events.on("dataitemchanged", (e) => {
      e.target.children.push(
        am5.Rectangle.new(root, {
          width: 50,
          height: 25,
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          fill: e.target.dataItem.get("fill"),
        })
      );
    });

    series.labels.template.adapters.add("fill", (_, target) => {
      let color = am5.color("#fff");
      if (target.parent) {
        const fillColor = target.parent?.dataItem.get("fill");
        color = themes.createAlternative(fillColor);
      }
      return color;
    });

    // 데이터 적용
    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`