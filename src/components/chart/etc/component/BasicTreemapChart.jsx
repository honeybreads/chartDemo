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
      name: "First",
      children: [
        {
          name: "A1",
          value: 100,
        },
        {
          name: "A2",
          value: 60,
        },
        {
          name: "A3",
          value: 30,
        },
      ],
    },
    {
      name: "Second",
      children: [
        {
          name: "B1",
          value: 135,
        },
        {
          name: "B2",
          value: 98,
        },
        {
          name: "B3",
          value: 56,
        },
      ],
    },
    {
      name: "Third",
      children: [
        {
          name: "C1",
          value: 335,
        },
        {
          name: "C2",
          value: 148,
        },
        {
          name: "C3",
          value: 126,
        },
        {
          name: "C4",
          value: 26,
        },
      ],
    },
    {
      name: "Fourth",
      children: [
        {
          name: "D1",
          value: 415,
        },
        {
          name: "D2",
          value: 148,
        },
        {
          name: "D3",
          value: 89,
        },
        {
          name: "D4",
          value: 64,
        },
        {
          name: "D5",
          value: 16,
        },
      ],
    },
    {
      name: "Fifth",
      children: [
        {
          name: "E1",
          value: 687,
        },
        {
          name: "E2",
          value: 148,
        },
      ],
    },
    {
      name: "Sixth",
      children: [
        {
          name: "F1",
          value: 687,
        },
        {
          name: "F2",
          value: 148,
        },
      ],
    },
  ],
};

//BasicTreemapChart
export default function BasicTreemapChart() {
  const id = "basic-treemap";
  const { theme, colorTheme } = useTheme();

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
    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // series 생성
    const series = container.children.push(
      am5hierarchy.Treemap.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        upDepth: -1,
        initialDepth: 2,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        nodePaddingOuter: 0,
        nodePaddingInner: 0,
      })
    );

    series.setAll({ colors: colorSet });
    series.rectangles.template.setAll({
      strokeWidth: 1,
      stroke: themes.chartVariables[theme].line,
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
