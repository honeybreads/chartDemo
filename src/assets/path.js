import Pie from "@/page/chart/Pie";
import Bar from "@/page/chart/Bar";
import Gauge from "@/page/chart/Gauge";
import Donut from "@/page/chart/Donut";
import Waffle from "@/page/chart/Waffle";
import Column1 from "@/page/chart/Column1";
import Column2 from "@/page/chart/Column2";
import Dumbbell from "@/page/chart/Dumbbell";

// pageList
export const page = [
  {
    title: "Chart",
    href: "chart",
    children: [
      { href: "column1", component: Column1 },
      { href: "column2", component: Column2 },
      { href: "bar", component: Bar },
      { href: "pie", component: Pie },
      { href: "donut", component: Donut },
      { href: "gauge", component: Gauge },
      { href: "waffle", component: Waffle },
      { href: "dumbbell", component: Dumbbell },
    ],
  },
];
