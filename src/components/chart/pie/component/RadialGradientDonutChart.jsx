import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect, useState } from "react";
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

export default function RadialGradientDonutChart() {
  const id = "radialgradient-donut";
  const height = 340;
  const { theme, colorTheme } = useTheme();
  const [responsiveHeight, setResponsiveHeight] = useState(height);

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 설정
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        setResponsiveHeight(height * 1.8);
        chart.setAll({ layout: root.verticalLayout, width: height });
        legend.setAll({
          x: am5.percent(50),
          y: undefined,
          centerY: undefined,
          centerX: am5.percent(50),
        });
      },
      removing: () => {
        setResponsiveHeight(height);
        chart.setAll({
          width: height * 1.8,
          layout: root.horizontalLayout,
        });
        legend.setAll({
          x: undefined,
          y: am5.percent(50),
          centerX: undefined,
          centerY: am5.percent(50),
        });
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        x: am5.percent(50),
        width: height * 1.8,
        radius: am5.percent(90),
        centerX: am5.percent(50),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "item1",
        categoryField: "category",
      })
    );

    const fillGradient = am5.RadialGradient.new(root, {
      stops: [
        { brighten: -0.8 },
        { brighten: -0.8 },
        { brighten: -0.3 },
        { brighten: 0 },
        { brighten: -0.3 },
      ],
    });

    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);
    series.slices.template.setAll({
      cornerRadius: 0,
      strokeOpacity: 0,
      fillGradient: fillGradient,
    });

    // legend 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        marginTop: 10,
        marginBottom: 10,
        y: am5.percent(50),
        centerY: am5.percent(50),
        layout: root.verticalLayout,
        // 배경 생성
        background: am5.RoundedRectangle.new(root, {
          shadowBlur: 10,
          fillOpacity: 1,
          cornerRadiusTR: 4,
          cornerRadiusTL: 4,
          cornerRadiusBR: 4,
          cornerRadiusBL: 4,
          fill: themes.modeColor[theme].bg,
          shadowColor: am5.color(themes.modeColor[theme].bg),
        }),
      })
    );

    legend.valueLabels.template.setAll({ textAlign: "right" });
    legend.labels.template.setAll({
      minWidth: 140,
      oversizedBehavior: "wrap",
    });

    // 데이터 적용
    series.data.setAll(data);
    legend.data.setAll(series.dataItems);

    // 애니메이션 적용
    series.appear(1000, 100);
    legend.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: responsiveHeight }} />;
}
