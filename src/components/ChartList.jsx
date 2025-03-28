import PropTypes from "prop-types";

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
    </div>
  ));
}

ChartList.propTypes = {
  listRef: PropTypes.any,
  list: PropTypes.array,
  name: PropTypes.string,
};
