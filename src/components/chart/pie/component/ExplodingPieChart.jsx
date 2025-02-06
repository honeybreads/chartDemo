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
    value: 200,
    subData: [
      { category: "A", value: 110 },
      { category: "B", value: 60 },
      { category: "C", value: 30 },
    ],
  },
  {
    category: "Czechia",
    value: 300,
    subData: [{ category: "A", value: 150 }],
  },
  {
    category: "Ireland",
    value: 500,
    subData: [
      { category: "A", value: 200 },
      { category: "B", value: 150 },
      { category: "C", value: 100 },
      { category: "D", value: 100 },
    ],
  },
  {
    category: "Germany",
    value: 150,
    subData: [
      { category: "A", value: 80 },
      { category: "B", value: 40 },
      { category: "C", value: 30 },
    ],
  },
  {
    category: "Australia",
    value: 140,
    subData: [
      { category: "A", value: 90 },
      { category: "B", value: 40 },
      { category: "C", value: 10 },
    ],
  },
  {
    category: "Austria",
    value: 120,
    subData: [
      { category: "A", value: 60 },
      { category: "B", value: 30 },
      { category: "C", value: 30 },
    ],
  },
];

export default function ExplodingPieChart() {
  const id = "exploding-pie";
  const height = 340;
  const { theme, colorTheme } = useTheme();
  const [responsiveHeight, setResponsiveHeight] = useState(height);

  useLayoutEffect(() => {
    // 서브데이터 생성
    const subData = data.reduce(
      (prev, curr) =>
        curr.subData.length > (prev.subData?.length || 0) ? curr.subData : prev,
      {}
    );

    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        setResponsiveHeight(height * 2.2);
        subSeries.setAll({ rotation: 90 });
        subSeries.labels.template.setAll({ textType: "circular", radius: 4 });
        container.setAll({ layout: root.verticalLayout });
      },
      removing: () => {
        setResponsiveHeight(height);
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // container 생성
    const container = root.container.children.push(
      am5.Container.new(root, {
        x: am5.p50,
        width: am5.p100,
        height: am5.p100,
        centerX: am5.p50,
        layout: root.horizontalLayout,
      })
    );

    // PieChart(대) 생성
    const chart = container.children.push(
      am5percent.PieChart.new(root, {
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // PieSeries(대) 생성
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    // PieSeries(대) 스타일 적용
    series.ticks.template.set("visible", false);
    series.labels.template.setAll({ textType: "circular", radius: 4 });

    // PieChart(소) 생성
    const subChart = container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(50),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // PieSeries(소) 생성
    const subSeries = subChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    // series 공통 스타일 적용
    const seriesGroup = [series, subSeries];
    seriesGroup.map((series) => {
      series.slices.template.setAll({
        stroke: 0,
        cornerRadius: 0,
        toggleKey: "none",
      });
    });

    // line 생성
    const createLine = () => am5.Line.new(root, { position: "absolute" });
    const line0 = container.children.push(createLine());
    const line1 = container.children.push(createLine());

    // line 업데이트 함수
    let selectedSlice;
    const updateLines = () => {
      if (!selectedSlice) return;
      const calculateGlobalPoint = (chart, angle, radius) =>
        chart.toGlobal({
          x: radius * am5.math.cos(angle),
          y: radius * am5.math.sin(angle),
        });

      const startAngle = selectedSlice.get("startAngle");
      const arc = selectedSlice.get("arc");
      const radius = selectedSlice.get("radius");
      const point00 = calculateGlobalPoint(series, startAngle, radius);
      const point10 = calculateGlobalPoint(series, startAngle + arc, radius);
      const subRadius = subSeries.slices.getIndex(0).get("radius");
      const point01 = subSeries.toGlobal({ x: 0, y: -subRadius });
      const point11 = subSeries.toGlobal({ x: 0, y: subRadius });

      // 라인 값 적용
      line0.set("points", [point00, point01]);
      line1.set("points", [point10, point11]);
    };

    // 시작 & 변화할때 라인 재설정
    series.on("startAngle", updateLines);
    container.events.on("boundschanged", () => {
      root.events.once("frameended", updateLines);
    });

    // series 변경 함수
    const selectSlice = (slice) => {
      selectedSlice = slice;
      const dataItem = slice.dataItem;
      const dataContext = dataItem?.dataContext;

      if (dataContext) {
        subSeries.data.each((_, index) => {
          const subDataItem = dataContext.subData[index];
          if (subDataItem) {
            if (!subSeries.dataItems[index].get("visible")) {
              subSeries.dataItems[index].show();
            }
            subSeries.data.setIndex(index, subDataItem);
          } else {
            subSeries.dataItems[index].hide();
          }
        });
      }
      const middleAngle =
        slice.get("startAngle") +
        slice.get("arc") / 2 -
        (responsiveHeight === height ? 0 : 90);
      const firstAngle = series.dataItems[0].get("slice").get("startAngle");

      series.animate({
        key: "startAngle",
        to: firstAngle - middleAngle,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
      });
      series.animate({
        key: "endAngle",
        to: firstAngle - middleAngle + 360,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
      });
    };

    // series 클릭 이벤트
    series.slices.template.events.on("click", (e) => selectSlice(e.target));

    // series 초기 데이터 적용
    series.events.on("datavalidated", () =>
      setTimeout(() => {
        selectSlice(series.slices.getIndex(0));
      }, 50)
    );

    // 데이터 적용
    series.data.setAll(data);
    subSeries.data.setAll(subData);

    // 애니메이션 적용
    container.appear(1000, 10);

    return () => root.dispose();
  }, [theme, colorTheme, responsiveHeight]);

  return <div id={id} style={{ width: "100%", height: responsiveHeight }} />;
}
