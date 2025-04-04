import PropTypes from "prop-types";
import Highlight from "react-highlight";
import { CopyToClipboardButton } from "react-clipboard-button";
import { Clipboard } from "lucide-react";
import "highlight.js/styles/a11y-dark.css";

export default function CodeBox({
  code,
  codeType = "javascript",
  copy = true,
}) {
  return (
    <div className="hljs-box">
      <div className="hljs-box-tool">
        <p>Code</p>
        {copy && (
          <CopyToClipboardButton text={code} onSuccess={() => alert("copied!")}>
            <button title="Copy">
              <Clipboard size={16} />
            </button>
          </CopyToClipboardButton>
        )}
      </div>

      <Highlight className={codeType}>{code}</Highlight>
    </div>
  );
}

CodeBox.propTypes = {
  code: PropTypes.string,
  codeType: PropTypes.string,
  copy: PropTypes.bool,
};
