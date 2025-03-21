import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "first", value: 30, type: "used" },
  { category: "Second", value: 25, type: "used" },
  { category: "third", value: 25, type: "used" },
  { category: "Remaining", value: 30, type: "unused" },
];

// TwoLevelPieChart
export default function TwoLevelPieChart() {
  const id = "twolevel-pie";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 테마 적용
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // series (used 합계) 생성
    const series0 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "value",
        categoryField: "category",
        radius: am5.percent(100),
        innerRadius: am5.percent(80),
      })
    );

    series0.slices.template.set("toggleKey", "none");
    series0.ticks.template.set("templateField", "settings");
    series0.slices.template.states.create("hover", { scale: 1 });
    series0.slices.template.setAll({
      cornerRadius: 0,
      fillOpacity: 0.3,
      strokeOpacity: 0,
      templateField: "settings",
    });
    series0.labels.template.setAll({
      radius: 10,
      textType: "circular",
      templateField: "settings",
    });

    // series (전체) 생성
    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        valueField: "value",
        categoryField: "category",
        radius: am5.percent(95),
        innerRadius: am5.percent(85),
      })
    );

    series1.slices.template.setAll({
      stroke: 0,
      cornerRadius: 0,
      toggleKey: "none",
      templateField: "settings",
    });
    series1.ticks.template.setAll({ forceHidden: true });
    series1.slices.template.states.create("hover", { scale: 1 });
    series1.labels.template.setAll({
      textType: "circular",
    });

    series1.labels.template.adapters.add("fill", (_, target) => {
      const fill = target.dataItem?._settings.fill.hex;
      return fill ? themes.createAlternative(fill) : am5.color("#222");
    });

    series1.labels.template.adapters.add("radius", (_, target) => {
      const dataItem = target.dataItem;
      const slice = dataItem.get("slice");
      return -(slice.get("radius") - slice.get("innerRadius")) / 2 - 6;
    });

    // 데이터 가공
    let usedCategory = [];
    let usedValue = 0;
    let unusedValue = 0;
    data.map((item, index) => {
      if (item.type == "used") {
        usedCategory.push(item.category);
        usedValue += item.value;
      } else {
        unusedValue += item.value;
        data[index].settings = { fill: am5.color("#ccc") };
      }
    });

    const usedData = [
      {
        category: usedCategory.flatMap((item) => item).join("&"),
        value: usedValue,
      },
      {
        category: "Unused",
        value: unusedValue,
        settings: { forceHidden: true },
      },
    ];

    // 데이터 적용
    series0.data.setAll(usedData);
    series1.data.setAll(data);

    // 애니메이션 적용
    series0.appear(1000, 100);
    series1.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
