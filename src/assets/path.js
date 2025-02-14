import Pie from "@/page/chart/Pie";
import Bar from "@/page/chart/Bar";
import Gauge from "@/page/chart/Gauge";
import Donut from "@/page/chart/Donut";
import Column1 from "@/page/chart/Column1";
import Column2 from "@/page/chart/Column2";
import Dumbbell from "@/page/chart/Dumbbell";
import Bubble from "@/page/chart/Bubble";
import Etc from "@/page/chart/Etc";
import Xy from "@/page/chart/Xy";
import Line1 from "@/page/chart/Line1";
import Line2 from "@/page/chart/Line2";
import Line3 from "@/page/chart/Line3";
import LineEtc from "@/page/chart/LineEtc";

// pageList
export const page = [
  {
    title: "Chart",
    href: "chart",
    children: [
      { href: "bar", component: Bar },
      { href: "bubble", component: Bubble },
      { href: "column1", component: Column1 },
      { href: "column2", component: Column2 },
      { href: "donut", component: Donut },
      { href: "dumbbell", component: Dumbbell },
      { href: "gauge", component: Gauge },
      { href: "line", component: Line1 },
      { href: "line-fill", component: Line2 },
      { href: "line-smooth&angled", component: Line3 },
      { href: "line-etc&mix", component: LineEtc },
      { href: "pie", component: Pie },
      { href: "xy", component: Xy },
      { href: "etc", component: Etc },
    ],
  },
];
