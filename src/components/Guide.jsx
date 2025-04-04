import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";

export default function Guide({ listRef, list }) {
  const [activeNum, setActiveNum] = useState(0);

  // scroll move
  const scrollToSection = useCallback(
    (section) => {
      if (listRef.current?.[section]) {
        listRef.current[section].scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    [listRef]
  );

  // scroll observer
  useEffect(() => {
    const section = document.querySelector(".section");
    if (!section) return;

    const handleScroll = () => {
      const nowHeight = section.scrollTop + window.innerHeight - 56;
      Object.values(listRef.current || {}).forEach((item, index) => {
        if (item) {
          const refHeight = item.getBoundingClientRect().top;
          if (
            refHeight <= window.innerHeight * 0.5 ||
            section.scrollHeight <= nowHeight
          ) {
            setActiveNum(index);
          } else if (nowHeight < window.innerHeight) {
            setActiveNum(0);
          }
        }
      });
    };

    section.addEventListener("scroll", handleScroll);
    return () => section.removeEventListener("scroll", handleScroll);
  }, [listRef]);

  return (
    <div className="intro-guide">
      <p className="intro-guide-title">List</p>
      {list.map((item, index) => (
        <button
          className={activeNum === index ? "active" : ""}
          onClick={() => scrollToSection(item.name)}
          key={index}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

Guide.propTypes = {
  listRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};
