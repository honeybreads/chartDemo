import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-themes-all";
import { javascript } from "@codemirror/lang-javascript";

export default function Intro() {
  return (
    <div className="intro">
      <h2 className="intro-title">amCharts 5 커스텀 데모</h2>
      <p>
        본 페이지는 <strong>amCharts 5</strong> 버전을 기반으로 한{" "}
        <strong>커스텀 차트 데모</strong>입니다.
        <br />
        amCharts 5의 다양한 기능을 활용하여 프로젝트에서 차트를 효과적으로
        구현하는 방법을 소개합니다.
      </p>
      <p>자세한 공식 문서는 아래 링크에서 확인할 수 있습니다.</p>
      <a href="https://www.amcharts.com/" target="_blank">
        amCharts 공식 문서
      </a>

      <article className="intro-article">
        <h3 className="intro-subtitle">amCharts 5 설치</h3>
        <p>amCharts 5 라이브러리를 프로젝트에 설치합니다.</p>
        <CodeMirror
          value={"npm install @amcharts/amcharts5"}
          theme={atomone}
          extensions={[javascript({ jsx: true })]}
        />
        <small>* 일부 차트는 추가로 다른 라이브러리 설치가 필요합니다.</small>
      </article>

      <article className="intro-article">
        <h3 className="intro-subtitle">커스텀 테마 적용</h3>
        <p>
          본 데모에서는 amCharts 5의 디자인을 일관성 있게 유지하기 위해
          <code>chartTheme.js</code> 파일을 활용합니다. 해당 파일을 프로젝트에
          복사하여 사용하세요.
        </p>
        <CodeMirror
          value={"// 해당 파일 경로\nsrc/assets/chartTheme.js"}
          theme={atomone}
          extensions={[javascript({ jsx: true })]}
        />
      </article>

      <article className="intro-article">
        <h3 className="intro-subtitle">차트 적용 방법</h3>
        <p>
          본 데모 페이지에서 원하는 차트를 선택하여 복사한 후, 프로젝트에 맞게
          수정하여 적용할 수 있습니다.
        </p>
        <p>
          복사한 코드에서 <strong>차트 테마</strong>와{" "}
          <strong>모드 테마</strong>를 가져오는 경로를 프로젝트 환경에 맞게
          조정해야 합니다.
        </p>
        <p>
          데모에서는 <code>useTheme</code> 훅을 사용하여 테마 설정을 가져옵니다.
          <code>theme</code>는 라이트/다크 모드를,
          <code>colorTheme</code>는 차트의 색상 테마를 담당합니다. 프로젝트의
          테마 관리 방식에 맞게 해당 부분을 수정하세요.
        </p>
        <CodeMirror
          value={`...
import * as themes from '@/assets/chartTheme'
import { useTheme } from '@/components/Theme'
...

function Chart() {
  const { theme, colorTheme } = useTheme();
  ...
}`}
          theme={atomone}
          extensions={[javascript({ jsx: true })]}
        />
        <p>
          테마를 동적으로 관리하지 않고 특정 값으로 고정하려면 아래와 같이
          수정하면 됩니다.
        </p>
        <CodeMirror
          value={`...
// const { theme, colorTheme } = useTheme();
const theme = "light";
const colorTheme = "basicTheme";
...`}
          theme={atomone}
          extensions={[javascript({ jsx: true })]}
        />
        <p>
          <strong>📌 테마 설정</strong>
          <br />- <code>theme</code>: <code>light</code> | <code>dark</code>
          <br />- <code>colorTheme</code>: <code>basicTheme</code> |{" "}
          <code>purpleTheme</code> | <code>colorfullTheme</code>
          <br />
          <small>* 추가적인 색상 테마는 프로젝트별로 확장 가능합니다.</small>
        </p>
      </article>
    </div>
  );
}
