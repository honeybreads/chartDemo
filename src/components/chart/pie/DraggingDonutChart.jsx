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
    category: "Lithuania",
    value: 501.9,
  },
  {
    category: "Estonia",
    value: 301.9,
  },
  {
    category: "Ireland",
    value: 201.1,
  },
  {
    category: "Germany",
    value: 165.8,
  },
  {
    category: "Australia",
    value: 139.9,
  },
  {
    category: "Austria",
    value: 128.3,
  },
];

// DragginDonutChart
export default function DraggingDonutChart() {
  const id = "draggin-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = ["#fff", ...primary];
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // height 설정
    let mobileCheck = false;
    const minHeight = root.dom.parentElement.style.minHeight;
    const baseHeight = Number(minHeight.split("px")[0]);
    root.dom.style.height = baseHeight + "px";

    // 데이터 생성
    const newData = [
      {
        category: "Dummy",
        value: 1000,
        settings: {
          draggable: false,
          fillOpacity: 0.3,
          tooltipText: null,
          strokeDasharray: [4, 4],
          fill: am5.color(0xdadada),
          stroke: am5.color(0xdadada),
        },
        dummyLabelSettings: {
          forceHidden: true,
        },
      },
      ...data,
    ];

    // container 생성
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: baseHeight * 2.2,
        height: am5.p100,
        x: am5.percent(50),
        centerX: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // 차트 생성
    const createPieChart = () => {
      return container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );
    };

    const createPieSeries = (chart) => {
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false,
        })
      );

      // series 스타일
      series.labels.template.setAll({
        textType: "circular",
        oversizedBehavior: "truncate",
        templateField: "dummyLabelSettings",
      });

      // sliceTemplate 정의 및 초기 설정
      const sliceTemplate = series.slices.template;
      sliceTemplate.setAll({
        draggable: true,
        templateField: "settings",
      });

      return { series, sliceTemplate };
    };

    //  차트 1
    let chart1 = createPieChart();
    let { series: series1, sliceTemplate: sliceTemplate1 } =
      createPieSeries(chart1);

    // 선
    const line = container.children.push(
      am5.Line.new(root, {
        layer: 1,
        y: am5.p50,
        x: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        height: am5.percent(60),
        stroke: themes.chartVariables[theme].grid,
      })
    );

    // 라벨
    const label = container.children.push(
      am5.Label.new(root, {
        layer: 1,
        y: am5.p50,
        x: am5.p50,
        centerY: 5,
        rotation: -90,
        isMeasured: false,
        textAlign: "center",
        text: "슬라이스를 드래그",
      })
    );

    // 차트 2
    let chart2 = createPieChart();
    let { series: series2, sliceTemplate: sliceTemplate2 } =
      createPieSeries(chart2);
    series1.ticks.template.set("forceHidden", true);

    // 드래그 앤 드롭 이벤트
    let previousDownSlice;
    const handleDummy = (series) => {
      let visibleCount = 0;
      am5.array.each(series.dataItems, (dataItem) => {
        if (!dataItem.isHidden()) visibleCount++;
      });
      if (visibleCount == 0) series.dataItems[0].show();
      else series.dataItems[0].hide();
    };

    const pointerDownEvent = (e) => {
      if (previousDownSlice) previousDownSlice.set("layer", 0);
      e.target.set("layer", 1);
      previousDownSlice = e.target;
    };

    const pointerUpEvent = (e, prev, next) => {
      prev.hideTooltip();
      next.hideTooltip();
      let slice = e.target;
      let pos, size;
      pos = !mobileCheck ? slice.x() : slice.y();
      size = !mobileCheck ? container.width() : container.height();

      if (prev === series1 ? pos > size / 4 : pos < size) {
        let index = prev.slices.indexOf(slice);
        slice.dataItem.hide();

        let series1DataItem = next.dataItems[index];
        series1DataItem.show();
        series1DataItem.get("slice").setAll({ x: 0, y: 0 });

        handleDummy(prev);
        handleDummy(next);
      } else {
        slice.animate({
          key: "x",
          to: 0,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
        slice.animate({
          key: "y",
          to: 0,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
      setTimeout(() => {
        [prev, next].map((series) => {
          series.labels.template.adapters.add("width", (_, target) => {
            return themes.seriesSetMaxWidth( target);
          });
        });
      }, 500);
    };

    sliceTemplate1.events.on("pointerdown", pointerDownEvent);
    sliceTemplate2.events.on("pointerdown", pointerDownEvent);
    sliceTemplate1.events.on("pointerup", (e) => {
      pointerUpEvent(e, series1, series2);
    });
    sliceTemplate2.events.on("pointerup", (e) => {
      pointerUpEvent(e, series2, series1);
    });

    // 드롭 이벤트 체크
    [series1, series2].map((series) => {
      series.labels.template.adapters.add("width", (_, target) => {
        return themes.seriesSetMaxWidth( target);
      });
    });

    // 데이터 적용
    series1.data.setAll(newData);
    series2.data.setAll(newData);

    // 숨기 보임 처리 초기화
    series1.dataItems[0].hide(0);
    am5.array.each(series2.dataItems, (dataItem) => {
      if (dataItem.get("category") != "Dummy") dataItem.hide(0);
    });

    // 애니메이션 적용
    series1.appear(1000, 100);
    series2.appear(1000, 100);
    container.appear(1000, 100);

    // 반응형 설정
    responsive.addRule({
      relevant: (width) => width < baseHeight * 2,
      applying: () => {
        mobileCheck = true;
        const nowSize = Math.min(root.width(), baseHeight);
        root.dom.style.height = nowSize * 2 + "px";
        label.setAll({ rotation: 0 });
        line.setAll({ width: am5.percent(60), height: 0 });
        container.setAll({ layout: root.verticalLayout, width: nowSize });
      },
      removing: () => {
        mobileCheck = false;
        root.dom.style.height = baseHeight + "px";
        label.setAll({ rotation: -90 });
        line.setAll({ width: 0, height: am5.percent(60) });
        container.setAll({
          layout: root.horizontalLayout,
          width: baseHeight * 2.2,
        });
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", minHeight: "100%" }} />;
}

// codeblock 
export const DraggingDonutCodeblock = `// * 해당 차트는 컨테이너의 minHeight 값을 기준으로 생성
// * 컨테이너의 height는 auto로 작성
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
    category: "Lithuania",
    value: 501.9,
  },
  {
    category: "Estonia",
    value: 301.9,
  },
  {
    category: "Ireland",
    value: 201.1,
  },
  {
    category: "Germany",
    value: 165.8,
  },
  {
    category: "Australia",
    value: 139.9,
  },
  {
    category: "Austria",
    value: 128.3,
  },
];

// DragginDonutChart
export default function DragginDonutChart() {
  const id = "draggin-donut";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = ["#fff", ...primary];
    const myTheme = themes.myThemeRule(root, colorList, theme);
    const responsive = am5themes_Responsive.newEmpty(root);
    root.setThemes([am5themes_Animated.new(root), myTheme, responsive]);

    // height 설정
    let mobileCheck = false;
    const minHeight = root.dom.parentElement.style.minHeight;
    const baseHeight = Number(minHeight.split("px")[0]);
    root.dom.style.height = baseHeight + "px";

    // 데이터 생성
    const newData = [
      {
        category: "Dummy",
        value: 1000,
        settings: {
          draggable: false,
          fillOpacity: 0.3,
          tooltipText: null,
          strokeDasharray: [4, 4],
          fill: am5.color(0xdadada),
          stroke: am5.color(0xdadada),
        },
        dummyLabelSettings: {
          forceHidden: true,
        },
      },
      ...data,
    ];

    // container 생성
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: baseHeight * 2.2,
        height: am5.p100,
        x: am5.percent(50),
        centerX: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // 차트 생성
    const createPieChart = () => {
      return container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );
    };

    const createPieSeries = (chart) => {
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false,
        })
      );

      // series 스타일
      series.labels.template.setAll({
        textType: "circular",
        oversizedBehavior: "truncate",
        templateField: "dummyLabelSettings",
      });

      // sliceTemplate 정의 및 초기 설정
      const sliceTemplate = series.slices.template;
      sliceTemplate.setAll({
        draggable: true,
        templateField: "settings",
      });

      return { series, sliceTemplate };
    };

    //  차트 1
    let chart1 = createPieChart();
    let { series: series1, sliceTemplate: sliceTemplate1 } =
      createPieSeries(chart1);

    // 선
    const line = container.children.push(
      am5.Line.new(root, {
        layer: 1,
        y: am5.p50,
        x: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        height: am5.percent(60),
        stroke: themes.chartVariables[theme].grid,
      })
    );

    // 라벨
    const label = container.children.push(
      am5.Label.new(root, {
        layer: 1,
        y: am5.p50,
        x: am5.p50,
        centerY: 5,
        rotation: -90,
        isMeasured: false,
        textAlign: "center",
        text: "슬라이스를 드래그",
      })
    );

    // 차트 2
    let chart2 = createPieChart();
    let { series: series2, sliceTemplate: sliceTemplate2 } =
      createPieSeries(chart2);
    series1.ticks.template.set("forceHidden", true);

    // 드래그 앤 드롭 이벤트
    let previousDownSlice;
    const handleDummy = (series) => {
      let visibleCount = 0;
      am5.array.each(series.dataItems, (dataItem) => {
        if (!dataItem.isHidden()) visibleCount++;
      });
      if (visibleCount == 0) series.dataItems[0].show();
      else series.dataItems[0].hide();
    };

    const pointerDownEvent = (e) => {
      if (previousDownSlice) previousDownSlice.set("layer", 0);
      e.target.set("layer", 1);
      previousDownSlice = e.target;
    };

    const pointerUpEvent = (e, prev, next) => {
      prev.hideTooltip();
      next.hideTooltip();
      let slice = e.target;
      let pos, size;
      pos = !mobileCheck ? slice.x() : slice.y();
      size = !mobileCheck ? container.width() : container.height();

      if (prev === series1 ? pos > size / 4 : pos < size) {
        let index = prev.slices.indexOf(slice);
        slice.dataItem.hide();

        let series1DataItem = next.dataItems[index];
        series1DataItem.show();
        series1DataItem.get("slice").setAll({ x: 0, y: 0 });

        handleDummy(prev);
        handleDummy(next);
      } else {
        slice.animate({
          key: "x",
          to: 0,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
        slice.animate({
          key: "y",
          to: 0,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
      setTimeout(() => {
        [prev, next].map((series) => {
          series.labels.template.adapters.add("width", (_, target) => {
            return themes.seriesSetMaxWidth( target);
          });
        });
      }, 500);
    };

    sliceTemplate1.events.on("pointerdown", pointerDownEvent);
    sliceTemplate2.events.on("pointerdown", pointerDownEvent);
    sliceTemplate1.events.on("pointerup", (e) => {
      pointerUpEvent(e, series1, series2);
    });
    sliceTemplate2.events.on("pointerup", (e) => {
      pointerUpEvent(e, series2, series1);
    });

    // 드롭 이벤트 체크
    [series1, series2].map((series) => {
      series.labels.template.adapters.add("width", (_, target) => {
        return themes.seriesSetMaxWidth( target);
      });
    });

    // 데이터 적용
    series1.data.setAll(newData);
    series2.data.setAll(newData);

    // 숨기 보임 처리 초기화
    series1.dataItems[0].hide(0);
    am5.array.each(series2.dataItems, (dataItem) => {
      if (dataItem.get("category") != "Dummy") dataItem.hide(0);
    });

    // 애니메이션 적용
    series1.appear(1000, 100);
    series2.appear(1000, 100);
    container.appear(1000, 100);

    // 반응형 설정
    responsive.addRule({
      relevant: (width) => width < baseHeight * 2,
      applying: () => {
        mobileCheck = true;
        const nowSize = Math.min(root.width(), baseHeight);
        root.dom.style.height = nowSize * 2 + "px";
        label.setAll({ rotation: 0 });
        line.setAll({ width: am5.percent(60), height: 0 });
        container.setAll({ layout: root.verticalLayout, width: nowSize });
      },
      removing: () => {
        mobileCheck = false;
        root.dom.style.height = baseHeight + "px";
        label.setAll({ rotation: -90 });
        line.setAll({ width: 0, height: am5.percent(60) });
        container.setAll({
          layout: root.horizontalLayout,
          width: baseHeight * 2.2,
        });
      },
    });

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", minHeight: "100%" }} />;
}`