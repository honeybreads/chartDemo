import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  name: "root",
  value: 10,
  children: [
    {
      name: "Flora",
      children: [
        {
          name: "Black Tea",
          value: 4,
        },
        {
          name: "Floral",
          children: [
            {
              name: "Chamomile",
              value: 1,
            },
            {
              name: "Rose",
              value: 1,
            },
            {
              name: "Jasmine",
              value: 1,
            },
          ],
        },
      ],
    },
    {
      name: "Fruity",
      children: [
        {
          name: "Berry",
          value: 5,
        },
        {
          name: "Other Fruit",
          value: 10,
        },
        {
          name: "Citrus Fruit",
          value: 4,
        },
      ],
    },
    {
      name: "Sour/Fermented",
      children: [
        {
          name: "Sour",
          value: 5,
        },
        {
          name: "Alcohol",
          value: 6,
        },
      ],
    },
  ],
};

//ForceDirectedTreeChart
export default function ForceDirectedTreeChart() {
  const id = "forcedirected-tree";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // cotnainer 추가
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
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 3,
        centerStrength: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series
      .get("tooltip")
      .get("background")
      .adapters.add("fill", () => am5.color("#000"));
    
      series.get("colors").setAll({ colors: colorList });

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

    // 애니메이션 적용
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
