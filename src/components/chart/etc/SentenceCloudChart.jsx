import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "Lorem ipsum\ndolorsit amet,\nconsectetur", value: 2.1 },
  { category: "Sed do eiusmod\ntempor incididunt\nut labore et", value: 2.2 },
  { category: "Duis aute irure\ndolor in\nreprehenderit", value: 2.3 },
  {
    category: "Voluptate velit\nesse cillum dolore\neu fugiat nulla",
    value: 2.1,
  },
  { category: "Excepteur sint\noccaecat cupidatat\nnon proident", value: 2.2 },
  { category: "Nupidatat non proident", value: 2 },
  { category: "Incididunt ut labore et", value: 2.5 },
  { category: "Voluptate velit\ncillum dolore eu nulla", value: 2.1 },
];

// SentenceCloudChart
export default function SentenceCloudChart() {
  const id = "sentence-word";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";

  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    // series 생성
    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        angles: [0],
        maxCount: 100,
        minWordLength: 2,
        minFontSize: am5.percent(6),
        maxFontSize: am5.percent(8),
      })
    );

    series.labels.template.setAll({
      paddingTop: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 8,
      interactive: true,
    });

    series.labels.template.states.create("hover", { scale: 1.1 });
    series.labels.template.events.on("pointerover", (ev) => {
      ev.target.toFront();
    });

    series.labels.template.setup = (label) => {
      label.set(
        "background",
        am5.RoundedRectangle.new(root, {
          fillOpacity: 1,
          fill: colorSet.next(),
        })
      );
    };

    series.labels.template.adapters.add("fill", (_, target) => {
      const bgFill = target.get("background").get("fill");
      return themes.createAlternative(bgFill);
    });

    // 데이터 적용
    series.data.setAll(data);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}

// codeblock
export const SentenceCloudCodeblock = `import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import * as themes from "@/assets/chartTheme";
import { useTheme } from "@/components/Theme";

// 샘플 데이터
const data = [
  { category: "Lorem ipsum\\ndolorsit amet,\\nconsectetur", value: 2.1 },
  { category: "Sed do eiusmod\\ntempor incididunt\\nut labore et", value: 2.2 },
  { category: "Duis aute irure\\ndolor in\\nreprehenderit", value: 2.3 },
  {
    category: "Voluptate velit\\nesse cillum dolore\\neu fugiat nulla",
    value: 2.1,
  },
  { category: "Excepteur sint\\noccaecat cupidatat\\nnon proident", value: 2.2 },
  { category: "Nupidatat non proident", value: 2 },
  { category: "Incididunt ut labore et", value: 2.5 },
  { category: "Voluptate velit\\ncillum dolore eu nulla", value: 2.1 },
];

// SentenceCloudChart
export default function SentenceCloudChart() {
  const id = "sentence-word";
  const { theme, colorTheme } = useTheme();
  // const theme = "light";
  // const colorTheme = "basicTheme";
  
  useLayoutEffect(() => {
    // Root 객체 생성 및 테마 불러오기
    const root = am5.Root.new(id);
    const { primary } = themes[colorTheme];
    const colorList = primary;
    const myTheme = themes.myThemeRule(root, colorList, theme);
    root.setThemes([am5themes_Animated.new(root), myTheme]);
    const colorSet = am5.ColorSet.new(root, {
      colors: colorList.map((color) => am5.color(color)),
    });

    // series 생성
    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        angles: [0],
        maxCount: 100,
        minWordLength: 2,
        minFontSize: am5.percent(6),
        maxFontSize: am5.percent(8),
      })
    );

    series.labels.template.setAll({
      paddingTop: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 8,
      interactive:true,
    });

    series.labels.template.states.create("hover", { scale: 1.1 });
    series.labels.template.events.on("pointerover", (ev) => {
      ev.target.toFront();
    });

    series.labels.template.setup = (label) => {
      label.set(
        "background",
        am5.RoundedRectangle.new(root, {
          fillOpacity: 1,
          fill: colorSet.next(),
        })
      );
    };

    series.labels.template.adapters.add("fill", (_, target) => {
      const bgFill = target.get("background").get("fill");
      return themes.createAlternative(bgFill);
    });

    // 데이터 적용
    series.data.setAll(data);

    return () => root.dispose();
  }, [theme, colorTheme]);

  return <div id={id} style={{ width: "100%", height: "100%" }} />;
}`;
