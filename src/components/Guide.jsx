import PropTypes from "prop-types";

export default function Guide({ listRef, list }) {
  const scrollToSection = (section) => {
    listRef.current[section]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="intro-guide">
      <p className="intro-guide-title">목차</p>
      {list.map((item, index) => (
        <button onClick={() => scrollToSection(item.name)} key={index}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

Guide.propTypes = {
  listRef: PropTypes.any,
  list: PropTypes.array,
};

