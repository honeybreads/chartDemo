import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    type: "target-1",
    percent: 100,
    subs: [
      {
        type: "target-1-1",
        percent: 30,
      },
      {
        type: "target-1-2",
        percent: 50,
      },
      {
        type: "target-1-3",
        percent: 20,
      },
    ],
  },
  {
    type: "target-2",
    percent: 55,
    subs: [
      {
        type: "target-2-1",
        percent: 25,
      },
      {
        type: "target-2-2",
        percent: 30,
      },
    ],
  },
  {
    type: "target-3",
    percent: 30,
    subs: [
      {
        type: "target-3-1",
        percent: 30,
      },
    ],
  },
];

export default function BrokenPieChart() {
  const id = "broken-pie";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 정의
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        series.labels.template.setAll({ textType: "circular", radius: 10 });
      },
      removing: () => {
        series.labels.template.setAll({ textType: "adjusted", radius: 20 });
      },
    });

    // 테마 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // PieChart 생성
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // series 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        fillField: "color",
        valueField: "percent",
        categoryField: "type",
      })
    );

    // series 스타일 설정
    series.slices.template.events.on("dataitemchanged", function (ev) {
      const series = ev.target.dataItem;
      const gradient = am5.RadialGradient.new(root, {
        stops: [
          { color: series.get("fill"), opacity: 0.5 },
          { color: series.get("fill") },
        ],
      });
      ev.target.setAll({ fillGradient: gradient, strokeOpacity: 0 });
    });

    series.slices.template.setAll({
      templateField: "sliceSettings",
    });

    // series 클릭 이벤트
    let selected;
    series.slices.template.events.on("click", (event) => {
      const dataContext = event.target.dataItem.dataContext;
      selected = dataContext?.id ?? undefined;
      series.data.setAll(generateChartData());
    });

    const generateChartData = () => {
      return data.flatMap((item, i) => {
        if (i === selected) {
          // 선택된 항목의 하위 데이터 추가
          return item.subs.map((sub) => ({
            pulled: true,
            type: sub.type,
            percent: sub.percent,
            sliceSettings: { active: true },
            color: series.get("colors").getIndex(i),
          }));
        }
        // 일반 데이터 추가
        return {
          id: i,
          type: item.type,
          percent: item.percent,
          color: series.get("colors").getIndex(i),
        };
      });
    };

    series.data.setAll(generateChartData());
    series.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
