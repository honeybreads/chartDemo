import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    category: "Lithuania",
    item1: 501.9,
    item2: 1500,
  },
  {
    category: "Czech Republic",
    item1: 301.9,
    item2: 990,
  },
  {
    category: "Ireland",
    item1: 201.1,
    item2: 785,
  },
  {
    category: "Germany",
    item1: 165.8,
    item2: 255,
  },
  {
    category: "Australia",
    item1: 139.9,
    item2: 452,
  },
  {
    category: "Austria",
    item1: 128.3,
    item2: 332,
  },
  {
    category: "UK",
    item1: 99,
    item2: 150,
  },
  {
    category: "Belgium",
    item1: 60,
    item2: 178,
  },
  {
    category: "The Netherlands",
    item1: 50,
    item2: 50,
  },
];

export default function RadiusNestedDonutChart() {
  const id = "radiusnested-donut";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 380,
        startAngle: 160,
      })
    );

    // series(안) 생성
    const series0 = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "item1",
        categoryField: "category",
        endAngle: 380,
        startAngle: 160,
        radius: am5.percent(70),
        innerRadius: am5.percent(65),
      })
    );

    // series(밖) 생성
    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        endAngle: 380,
        startAngle: 160,
        valueField: "item2",
        categoryField: "category",
        innerRadius: am5.percent(80),
      })
    );

    // 중앙 라벨 생성
    let total = 0;
    data.forEach((item) => (total += item.item1));
    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        centerX: am5.p50,
        centerY: am5.p100,
        textAlign: "center",
        text: `[fontSize:18px]total[/]\n[bold fontSize:30px]${total}[/]`,
      })
    );

    // series(공통) 적용
    const seriesGroup = [series0, series1];
    seriesGroup.map((series) => {
      // 스타일 적용
      series.ticks.template.set("forceHidden", true);
      series.labels.template.set("forceHidden", true);
      series.slices.template.setAll({ cornerRadius: 0, stroke: 0 });
      series.states.create("hidden", { endAngle: 180, startAngle: 160 });
      // 데이터 적용
      series.data.setAll(data);
      series.appear(1000, 100);
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
