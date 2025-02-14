import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터 생성
const createData = (count) => {
  let value = 100;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const randomValue = () => {
    value = Math.round(Math.random() * 10 - 5 + value);
    return value;
  };

  for (var i = 0; i < count; ++i) {
    am5.time.add(date, "day", 1);
    data.push({ date: date.getTime(), value: randomValue() });
  }
  return data;
};

const data = createData(90);

// DrawingSeriesLineChart
export default function DrawingSeriesLineChart() {
  const id = "drawingseries-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // 커서 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // series(그림용) 생성
    const drawingSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        name: "Series",
        valueXField: "date",
        valueYField: "value",
      })
    );

    // 드래그 이벤트
    const handleDrag = (e) => {
      const point = chart.plotContainer.toLocal(e.point);
      const date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
      const value = yAxis.positionToValue(yAxis.coordinateToPosition(point.y));
      e.target.dataItem.setAll({
        valueX: date,
        valueXWorking: date,
        valueY: value,
        valueYWorking: value,
      });
    };

    // 드래그 이벤트용 더미 bullet 생성
    drawingSeries.bullets.push(() => {
      const bulletCircle = am5.Circle.new(root, {
        radius: 6,
        fillOpacity: 0,
        draggable: true,
        cursorOverStyle: "pointer",
        fill: drawingSeries.get("fill"),
      });

      bulletCircle.events.on("dragged", (e) => handleDrag(e));
      return am5.Bullet.new(root, { sprite: bulletCircle });
    });

    // bullet 생성
    drawingSeries.bullets.push(() => {
      const bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: drawingSeries.get("fill"),
      });
      return am5.Bullet.new(root, { sprite: bulletCircle });
    });

    // 데이터 정렬 함수
    const sortData = () => {
      drawingSeries.dataItems.sort((a, b) => a.get("valueX") - b.get("valueX"));
    };

    // 차트 클릭시 생성 이벤트
    chart.plotContainer.get("background").events.on("click", function (e) {
      const point = chart.plotContainer.toLocal(e.point);
      const date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
      const value = yAxis.positionToValue(yAxis.coordinateToPosition(point.y));
      drawingSeries.data.push({ date: date, value: value });
      drawingSeries.setPrivate("endIndex", drawingSeries.data.length);
      sortData();
    });

    // labels(설명) 생성
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        x: 2,
        y: 2,
        text: "Click on plot area to draw a series",
      })
    );

    // data 적용
    series.data.setAll(data);

    // 애니메이션 적용
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: 340 }} />;
}
