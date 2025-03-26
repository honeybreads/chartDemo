import * as am5 from "@amcharts/amcharts5";
import { useLayoutEffect } from "react";
import * as am5venn from "@amcharts/amcharts5/venn";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { name: "A", value: 10 },
  { name: "B", value: 10 },
  { name: "C", value: 5 },
  { name: "X", value: 4, sets: ["A", "B"] },
  { name: "Y", value: 2, sets: ["A", "C"] },
  { name: "Z", value: 2, sets: ["B", "C"] },
  { name: "Q", value: 1, sets: ["A", "B", "C"] },
];

//VennDiagramChart
export default function VennDiagramChart() {
  const id = "venn-diagram";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([myTheme]);

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    );

    // Create venn series
    const chart = container.children.push(
      am5venn.Venn.new(root, {
        valueField: "value",
        categoryField: "name",
        intersectionsField: "sets",
      })
    );

    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });
    chart.set("colors", colorSet);

    // Set tooltip content
    chart.slices.template.set("tooltipText", "{category}: {value}");
    chart.labels.template.adapters.add("fill", (_, target) => {
      if (target.dataItem) {
        const index = data.findIndex(
          (item) => item.name === target.dataItem.dataContext.name
        );
        return themes.createAlternative(colorList[index]);
      } else {
        return false;
      }
    });

    chart.hoverGraphics.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3],
      stroke: am5.color(0xffffff),
    });

    // legend 생성
    const legend = container.children.push(
      am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50,
        marginTop: 12,
        ...themes.legnedBackground(root, theme),
      })
    );
    legend.valueLabels.template.setAll({ width: "auto" });
    legend.valueLabels.template.adapters.add(
      "fill",
      () => themes.chartVariables[theme].base
    );

    // 데이터 적용
    const headData = [];
    chart.data.setAll(data);
    chart.dataItems.flatMap((item) => {
      if (!item.dataContext.sets) headData.push(item);
    });
    legend.data.setAll(headData);

    // 애니메이션 적용
    chart.appear(1000, 100);
    legend.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
