import PropTypes from "prop-types";
import CodeBox from "@/components/CodeBox";

export default function ChartList({ listRef, list, name }) {
  return list.map((item, index) => (
    <div
      className="chart-layout-box"
      key={index}
      ref={(el) => (listRef.current[item.name] = el)}
    >
      <p className="chart-layout-title">
        {item.name} {name}
      </p>
      <div className="chart-con" style={item.style}>
        {item.chart}
      </div>
      {item.codeblock && (
        <div className="chart-codeblock">
          <CodeBox code={item.codeblock} />
        </div>
      )}
    </div>
  ));
}

ChartList.propTypes = {
  listRef: PropTypes.any,
  list: PropTypes.array,
  name: PropTypes.string,
};
