import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useLayoutEffect, useState } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = {
  data1: [
    {
      category: "Lithuania",
      value: 1020,
    },
    {
      category: "Czechia",
      value: 401,
    },
    {
      category: "Ireland",
      value: 251,
    },
    {
      category: "Germany",
      value: 100,
    },
  ],
  data2: [
    {
      category: "Lithuania",
      value: 50,
    },
    {
      category: "Czechia",
      value: 150,
    },
    {
      category: "Ireland",
      value: 101,
    },
    {
      category: "Germany",
      value: 40,
    },
  ],
};

export default function LinkedDonutChart() {
  const id = "linked-donut";
  const height = 340;
  const { theme, colorTheme } = useTheme();
  const [responsiveHeight, setResponsiveHeight] = useState(height);

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.data1.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);

    // 반응형 정의
    const responsive = am5themes_Responsive.newEmpty(root);
    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
      applying: () => {
        setResponsiveHeight(height * 2);
        chartContainer.setAll({
          width: height,
          layout: root.verticalLayout,
        });
      },
      removing: () => {
        setResponsiveHeight(height);
        chartContainer.setAll({
          width: height * 2,
          layout: root.horizontalLayout,
        });
      },
    });

    // 테마 및 반응형 적용
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // root 레이아웃 설정
    root.container.set("layout", root.verticalLayout);

    // 차트 컨테이너 생성
    const chartContainer = root.container.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: height * 2,
        height: am5.percent(100),
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    // 파이 차트 생성 함수
    const createPieChart = (container, options) =>
      container.children.push(am5percent.PieChart.new(root, options));

    // 파이 시리즈 생성 함수
    const createPieSeries = (chart, options) =>
      chart.series.push(am5percent.PieSeries.new(root, options));

    // 파이 시리즈 설정
    const configureSeries = (series, labelText) => {
      series.children.push(
        am5.Label.new(root, {
          text: labelText,
          fontSize: "1.4rem",
          populateText: true,
          centerX: am5.percent(50),
          centerY: am5.percent(50),
        })
      );
      series.states.create("hidden", { endAngle: -90 });
      series.slices.template.setAll({ cornerRadius: 4 });
      series.labels.template.setAll({ textType: "circular" });
    };

    // 차트 및 시리즈 공통 옵션
    const pieChartOptions = {
      endAngle: 270,
      innerRadius: am5.percent(60),
      layout: root.verticalLayout,
    };

    const seriesOptions = {
      endAngle: 270,
      alignLabels: false,
      valueField: "value",
      categoryField: "category",
    };

    // PieChart 생성
    let chart1 = createPieChart(chartContainer, pieChartOptions);
    let chart2 = createPieChart(chartContainer, pieChartOptions);

    // PieSeries 생성
    let series1 = createPieSeries(chart1, seriesOptions);
    let series2 = createPieSeries(chart2, {
      ...seriesOptions,
      tooltip: am5.Tooltip.new(root, {}),
    });

    // PieSeries 구성
    configureSeries(series1, "First: {valueSum}");
    configureSeries(series2, "Second: {valueSum}");

    // 다른 차트에서 동일한 데이터 아이템의 슬라이스를 찾는 함수
    const findSlice = (dataItem, series) =>
      series.dataItems
        .find((item) => item.get("category") === dataItem.get("category"))
        ?.get("slice");

    // 두 차트 간 Hover 및 Active 상태를 동기화하는 함수
    const attachHoverSync = (seriesA, seriesB) => {
      const syncHover = (ev, targetSeries, action) => {
        const dataItem = ev.target.dataItem;
        const otherSlice = findSlice(dataItem, targetSeries);
        if (otherSlice) otherSlice[action]();
      };

      seriesA.slices.template.events.on("pointerover", (ev) =>
        syncHover(ev, seriesB, "hover")
      );
      seriesA.slices.template.events.on("pointerout", (ev) =>
        syncHover(ev, seriesB, "unhover")
      );
      seriesA.slices.template.on("active", (active, target) => {
        const dataItem = target.dataItem;
        const otherSlice = findSlice(dataItem, seriesB);
        if (otherSlice) otherSlice.set("active", active);
      });
    };

    attachHoverSync(series1, series2);
    attachHoverSync(series2, series1);

    // 범례 생성
    const legend = root.container.children.push(
      am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
      })
    );

    // 범례 이벤트
    legend.itemContainers.template.events.on("pointerover", (ev) => {
      const dataItem = ev.target.dataItem.dataContext;
      findSlice(dataItem, series2)?.hover();
    });

    legend.itemContainers.template.events.on("pointerout", (ev) => {
      const dataItem = ev.target.dataItem.dataContext;
      findSlice(dataItem, series2)?.unhover();
    });

    legend.itemContainers.template.on("disabled", (disabled, target) => {
      const dataItem = target.dataItem.dataContext;
      const slice = findSlice(dataItem, series2);
      if (slice) disabled ? slice.dataItem.hide() : slice.dataItem.show();
    });

    // 데이터 적용
    series1.data.setAll(data.data1);
    series2.data.setAll(data.data2);
    legend.data.setAll(series1.dataItems);

    // 애니메이션 적용
    legend.appear(1000, 100);
    series1.appear(1000, 100);
    series2.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: responsiveHeight }} />;
}
