import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { year: "1896", uk: 7, ussr: 0, russia: 0, usa: 20, china: 0 },
  { year: "1900", uk: 78, ussr: 0, russia: 0, usa: 55, china: 0 },
  { year: "1904", uk: 2, ussr: 0, russia: 0, usa: 394, china: 0 },
  { year: "1908", uk: 347, ussr: 0, russia: 0, usa: 63, china: 0 },
  { year: "1912", uk: 160, ussr: 0, russia: 0, usa: 101, china: 0 },
  { year: "1916", uk: 0, ussr: 0, russia: 0, usa: 0, china: 0 },
  { year: "1920", uk: 107, ussr: 0, russia: 0, usa: 193, china: 0 },
  { year: "1924", uk: 66, ussr: 0, russia: 0, usa: 198, china: 0 },
  { year: "1928", uk: 55, ussr: 0, russia: 0, usa: 84, china: 0 },
  { year: "1932", uk: 34, ussr: 0, russia: 0, usa: 181, china: 0 },
  { year: "1936", uk: 36, ussr: 0, russia: 0, usa: 92, china: 0 },
  { year: "1984", uk: 72, ussr: 0, russia: 0, usa: 333, china: 76 },
  { year: "1988", uk: 53, ussr: 294, russia: 0, usa: 193, china: 53 },
  { year: "1992", uk: 50, ussr: 0, russia: 0, usa: 224, china: 83 },
  { year: "1996", uk: 26, ussr: 0, russia: 115, usa: 260, china: 110 },
  { year: "2000", uk: 55, ussr: 0, russia: 188, usa: 248, china: 79 },
];

// ThemeRiverLineChart 컴포넌트
export default function ThemeRiverLineChart() {
  const id = "themeriver-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 생성 및 테마 적용
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // 차트 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.horizontalLayout,
      })
    );

    // 범례 생성
    const legend = chart.children.push(
      am5.Legend.new(root, {
        y: am5.p50,
        centerY: am5.p50,
        clickTarget: "none",
        layout: root.verticalLayout,
      })
    );
    legend.valueLabels.template.set("forceHidden", true);

    // X축 생성 (연도)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        endLocation: 0.5,
        startLocation: 0.5,
        categoryField: "year",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    // Y축 생성 (값)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // 시리즈 생성 함수
    const createSeries = (field, name) => {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueField: field,
          valueYField: `${field}_hi`,
          openValueYField: `${field}_low`,
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: `[fontSize: 14px]{name}[/]\n{categoryX}: [bold]{${field}}[/]`,
          }),
        })
      );

      // 값이 0일 경우 툴팁 숨김
      series.get("tooltip").adapters.add("visible", (_, target) => {
        return target.dataItem?.get("value") > 0;
      });

      series.strokes.template.setAll({ forceHidden: true });
      series.fills.template.setAll({ visible: true, fillOpacity: 1 });

      legend.data.push(series);
    };

    // 데이터 가공 함수
    const processChartData = (data) => {
      return data.map((row) => {
        let sum = 0;
        const updatedRow = { ...row };

        // 각 국가별 누적 값 설정
        chart.series.each((series) => {
          const field = series.get("valueField");
          const val = Number(row[field]) || 0;
          updatedRow[`${field}_low`] = sum;
          updatedRow[`${field}_hi`] = sum + val;
          sum += val;
        });

        // 중앙 정렬을 위한 오프셋 적용
        const offset = sum / 2;
        chart.series.each((series) => {
          const field = series.get("valueField");
          updatedRow[`${field}_low`] -= offset;
          updatedRow[`${field}_hi`] -= offset;
        });

        return updatedRow;
      });
    };

    // 국가별 시리즈 생성
    ["uk", "ussr", "russia", "usa", "china"].forEach((field) =>
      createSeries(field, field.toUpperCase())
    );

    // 데이터 설정
    const processedData = processChartData(data);
    chart.series.each((series) => series.data.setAll(processedData));
    xAxis.data.setAll(processedData);

    // 커서 추가
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomXY", xAxis })
    );

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
