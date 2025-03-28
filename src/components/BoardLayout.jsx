import PropTypes from "prop-types";
import ChartList from "./ChartList";
import Guide from "./Guide";

export default function BoardLayout({ listRef, list, title, name, icon }) {
  return (
    <>
      <h2 className="hidden">Chart Area</h2>
      <article className="chart-area">
        <div className="chart-layout">
          <h3 className="chart-title">
            {icon}{title}
          </h3>
          {/* 차트 */}
          <ChartList listRef={listRef} list={list} name={name} />
        </div>
        {/* 목차 네비게이션 */}
        <Guide listRef={listRef} list={list} />
      </article>
    </>
  );
}

BoardLayout.propTypes = {
  listRef: PropTypes.any,
  list: PropTypes.array,
  title: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.element,
};
