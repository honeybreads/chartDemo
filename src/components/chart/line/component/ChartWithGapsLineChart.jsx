import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  {
    year: "1950",
    value: -0.307,
  },
  {
    year: "1951",
    value: -0.168,
  },
  {
    year: "1952",
    value: -0.073,
  },
  {
    year: "1953",
    value: -0.027,
  },
  {
    year: "1954",
    value: -0.251,
  },
  {
    year: "1955",
    value: -0.281,
  },
  {
    year: "1956",
    value: -0.348,
  },
  {
    year: "1957",
    value: -0.074,
  },
  {
    year: "1958",
    value: -0.011,
  },
  {
    year: "1959",
    value: -0.074,
  },
  {
    year: "1960",
    value: -0.124,
  },
  {
    year: "1961",
    value: -0.024,
  },
  {
    year: "1962",
    value: -0.022,
  },
  {
    year: "1963",
    value: 0,
  },
  {
    year: "1964",
    value: -0.296,
  },
  {
    year: "1965",
    value: -0.217,
  },
  {
    year: "1966",
    value: -0.147,
  },
  {
    year: "1967",
  },
  {
    year: "1971",
    value: -0.19,
  },
  {
    year: "1972",
    value: -0.056,
  },
  {
    year: "1973",
    value: 0.077,
  },
  {
    year: "1974",
    value: -0.213,
  },
  {
    year: "1975",
    value: -0.17,
  },
  {
    year: "1976",
    value: -0.254,
  },
  {
    year: "1977",
    value: 0.019,
  },
  {
    year: "1978",
    value: -0.063,
  },
  {
    year: "1979",
    value: 0.05,
  },
  {
    year: "1980",
    value: 0.077,
  },
  {
    year: "1981",
    value: 0.12,
  },
  {
    year: "1982",
    value: 0.011,
  },
  {
    year: "1983",
    value: 0.177,
  },
  {
    year: "1984",
  },
  {
    year: "1989",
    value: 0.104,
  },
  {
    year: "1990",
    value: 0.255,
  },
  {
    year: "1991",
    value: 0.21,
  },
  {
    year: "1992",
    value: 0.065,
  },
  {
    year: "1993",
    value: 0.11,
  },
  {
    year: "1994",
    value: 0.172,
  },
  {
    year: "1995",
    value: 0.269,
  },
  {
    year: "1996",
    value: 0.141,
  },
  {
    year: "1997",
    value: 0.353,
  },
  {
    year: "1998",
    value: 0.548,
  },
  {
    year: "1999",
    value: 0.298,
  },
  {
    year: "2000",
    value: 0.267,
  },
  {
    year: "2001",
    value: 0.411,
  },
  {
    year: "2002",
    value: 0.462,
  },
  {
    year: "2003",
    value: 0.47,
  },
  {
    year: "2004",
    value: 0.445,
  },
  {
    year: "2005",
    value: 0.47,
  },
];

// ChartWithGapsLineChart
export default function ChartWithGapsLineChart() {
  const id = "chartwithgaps-line";
  const { theme, colorTheme } = useTheme();

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { lineColors } = themes[colorTheme];
    const colorList = lineColors.lineStroke;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"],
    });

    // XYChart 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        focusable: true,
        paddingLeft: 0,
      })
    );

    // X,Y축 생성
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "year", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minGridDistance: 50,
          minorGridEnabled: true,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
      })
    );
    xAxis.get("renderer").labels.template.setAll({ maxWidth: "auto" });

    // series 생성
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        connect: false,
        valueXField: "year",
        valueYField: "value",
        minBulletDistance: 10,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          pointerOrientation: "horizontal",
        }),
      })
    );
    
    series.fills.template.setAll({ fillOpacity: 0.3, visible: true });
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy",
      dateFields: ["year"],
    });

    series.bullets.push(() => {
      return themes.createBulletSpriet(
        root,
        lineColors.bulletFill,
        series.get("fill")
      );
    });

    // cursor 추가
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { xAxis }));
    cursor.lineY.set("visible", false);

    // 데이터 적용
    series.data.setAll(data);

    // 애니메이션 적용
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}
