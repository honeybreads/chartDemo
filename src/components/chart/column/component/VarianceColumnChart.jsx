import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "2015",
    value: 600000,
  },
  {
    year: "2016",
    value: 900000,
  },
  {
    year: "2017",
    value: 180000,
  },
  {
    year: "2018",
    value: 600000,
  },
  {
    year: "2019",
    value: 350000,
  },
  {
    year: "2020",
    value: 600000,
  },
  {
    year: "2021",
    value: 670000,
  },
];

export default function VarianceColumnChart() {
  const id = "variance-column";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { colorSet } = themes[colorTheme];
    const colorList = colorSet(data.length);
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 카테고리, 값 필드 지정
    const categoryField = Object.keys(data[0])[0];
    const valueField = Object.keys(data[0])[1];

    // 다음 값 (valueNext) 계산 및 데이터에 추가
    data.forEach((item, i) => {
      if (i < data.length - 1) item.valueNext = data[i + 1][valueField];
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingLeft: 0,
      })
    );

    // x,y축 생성
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellEndLocation: 0.9,
      minorGridEnabled: true,
      cellStartLocation: 0.1,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // series(그래프) 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        categoryXField: categoryField,
      })
    );

    series.columns.template.setAll({
      tooltipY: 0,
      width: am5.percent(90),
      tooltipText: "{categoryX}: {valueY}",
    });

    series.columns.template.adapters.add("fill", function (_, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // series(indicator) 생성
    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "valueNext",
        openValueYField: valueField,
        categoryXField: categoryField,
        fill: am5.color("#bbb"),
      })
    );
    series2.columns.template.setAll({ width: 1 });

    // 값의 변화를 구하는 함수
    const getVariancePercent = (dataItem) => {
      if (dataItem) {
        const value = dataItem.get("valueY");
        const openValue = dataItem.get("openValueY");
        const change = value - openValue;
        return Math.round((change / openValue) * 100);
      }
      return 0;
    };

    // 퍼센트 생성
    series2.bullets.push(function () {
      const label = am5.Label.new(root, {
        text: "{valueY}",
        fontWeight: "500",
        centerY: am5.p100,
        centerX: am5.p50,
        populateText: true,
        fill: am5.color(0x00cc00),
      });

      // 퍼센트 텍스트 업데이트트
      label.adapters.add("text", function (text, target) {
        const percent = getVariancePercent(target.dataItem);
        return percent ? percent + "%" : text;
      });

      // 변화율에 따라 레이블 위치 변경
      label.adapters.add("centerY", function (center, target) {
        return getVariancePercent(target.dataItem) < 0 ? 0 : center;
      });

      // 변화율에 따라 색상 변경
      label.adapters.add("fill", function (fill, target) {
        return getVariancePercent(target.dataItem) < 0
          ? am5.color(0xcc0000)
          : fill;
      });

      return am5.Bullet.new(root, { locationY: 1, sprite: label });
    });

    // 삼각형 생성
    series2.bullets.push(function () {
      const arrow = am5.Graphics.new(root, {
        dy: 3,
        rotation: -90,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x555555),
        stroke: am5.color(0x555555),
        draw: function (display) {
          display.moveTo(0, -3);
          display.lineTo(8, 0);
          display.lineTo(0, 3);
          display.lineTo(0, -3);
        },
      });

      // 변화율이 음수인 경우 회전 방향 변경
      arrow.adapters.add("rotation", function (rotation, target) {
        return getVariancePercent(target.dataItem) < 0 ? 90 : rotation;
      });

      // Y축 위치 변경
      arrow.adapters.add("dy", function (dy, target) {
        return getVariancePercent(target.dataItem) < 0 ? -3 : dy;
      });

      return am5.Bullet.new(root, { locationY: 1, sprite: arrow });
    });

    // 데이터 적용
    xAxis.data.setAll(data);
    series.data.setAll(data);
    series2.data.setAll(data);

    // 애니메이션 적용
    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
