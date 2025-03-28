import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { useRef, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import Demos from "@/assets/demo.mp4";
import Guide from "@/components/Guide";

export default function Intro() {
  // 코드 미러 설정
  const createCodeMirrorConfig = (value) => ({
    value,
    theme: vscodeDark,
    extensions: [javascript({ jsx: true }), EditorState.readOnly.of(true)],
  });

  // 문장 목록
  const installJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">1. amCharts 5 설치</h3>
        <p>아래 명령어로 amCharts를 프로젝트에 설치합니다.</p>
        <small>* 일부 차트는 추가 라이브러리 설치가 필요할 수 있습니다.</small>
        <CodeMirror
          {...createCodeMirrorConfig("npm install @amcharts/amcharts5@5.10.10")}
        />
      </>
    );
  }, []);

  const customJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">2. 커스텀 테마 적용</h3>
        <p>
          amCharts 5의 스타일을 통일하기 위해 <code>chartTheme.js</code>에서
          공통 설정을 관리합니다. 데모 프로젝트의 아래 경로 파일을 복사합니다.
        </p>
        <CodeMirror {...createCodeMirrorConfig("src/assets/chartTheme.js")} />
        <p>이후 차트의 폰트 스타일을 적용하기 위해 아래 설정을 수정합니다.</p>
        <p>
          파일 내부 <code>Label</code> 공통 설정의{" "}
          <code>fontFamily, fontWeight</code>를{" "}
          <strong>
            <code>CSS</code>에서 사용하는 것과 동일하게
          </strong>{" "}
          수정합니다.
        </p>
        <CodeMirror
          {...createCodeMirrorConfig(`...
const themeCommon = (myTheme, theme) => {
...
  myTheme.rule("Label").setAll({
    fontSize: 11,
    fontWeight: "300",
    fontFamily: "Pretendard-Regular",
    fill: chartVariables[theme].base,
  });
...
}`)}
        />
      </>
    );
  }, []);

  const chartJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">3. 차트 생성</h3>
        <p>
          페이지에서 원하는 차트를 확인하고 데모 프로젝트의{" "}
          <strong>
            <code>src/components/chart</code>
          </strong>{" "}
          경로에서 동일한 이름의 파일을 복사한 후 일부 항목을 수정합니다.
        </p>
        <p>
          <strong>차트 테마</strong> 및 <strong>컬러/모드 테마</strong>를
          가져오는 경로를 프로젝트 환경에 맞게 수정해야 합니다.
        </p>
        <p className="my-3">
          * 데모에서는 <code>useTheme</code> 훅을 활용하여 테마 설정을 관리하고
          있으며 이부분은 프로젝트에 맞춰 변경합니다.
          <br />
          <strong>
            <code>theme</code>
          </strong>
          : 라이트/다크 모드
          <strong>
            <code>colorTheme</code>
          </strong>
          : 차트 색상 테마
        </p>
        <CodeMirror
          {...createCodeMirrorConfig(`...
import * as themes from '@/assets/chartTheme'
import { useTheme } from '@/components/Theme'
...
export default function BasicBarChart() {
  const id = "basic-bar";
  const { theme, colorTheme } = useTheme();
  ...
}`)}
        />
        <p>
          프로젝트에서 동적 테마 관리가 필요하지 않다면, 아래와 같이 특정 값으로
          고정할 수 있습니다.
        </p>
        <CodeMirror
          {...createCodeMirrorConfig(`...
export default function BasicBarChart() {
  const id = "basic-bar";
  // const { theme, colorTheme } = useTheme();
  const theme = "light"; // light | dark
  const colorTheme = "basicTheme"; // basicTheme | violetTheme | pastelTheme |...
  ...
}`)}
        />
      </>
    );
  }, []);

  const useJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">4. 차트 적용</h3>
        <p>컨테이너를 생성 후 차트를 넣어 사용합니다.</p>
        <p>
          차트는 컨테이너의 넓이 및 높이를 받아 사용합니다. (* 일부 차트 제외 )
        </p>
        <CodeMirror
          {...createCodeMirrorConfig(
            `<div style={{width:400, height:400}}>
  <BasicBarChart/>
</div>`
          )}
        />
      </>
    );
  }, []);

  const demoJsx = useMemo(() => {
    return (
      <>
        <h3 className="intro-subtitle">5. 데모</h3>
        <p className="mb-3">
          빈 프로젝트에서 차트를 적용해보는 데모 영상입니다.
        </p>
        <video controls src={Demos}></video>
      </>
    );
  }, []);

  // Ref, 문장 목록 구성
  const articleRef = useRef({});
  const list = [
    { name: "install", func: installJsx },
    { name: "custom", func: customJsx },
    { name: "chart", func: chartJsx },
    { name: "use", func: useJsx },
    { name: "demo", func: demoJsx },
  ];
  list.map((item) => (articleRef[item.name] = null));

  return (
    <div className="intro">
      <div className="intro-content">
        <h2 className="intro-title">
          amCharts 5 커스텀 데모{" "}
          <a className="btn" href="https://www.amcharts.com/" target="_blank">
            <ExternalLink size={14} />
          </a>
        </h2>
        <p>
          본 데모 페이지는 <strong>amCharts 5</strong>를 기반으로 다양한 차트를
          각각 프로젝트 디자인에 맞춰 빠르고 일관성 있게 구현하기 위하여
          만들어졌습니다.
          <br />
          <code>amCharts</code>에 대해 자세한 내용은 공식 문서를 참고
          부탁드립니다.
        </p>
        {/* amCharts 5 설치 */}
        {list.map((item, index) => {
          return (
            <article
              key={index}
              className="intro-article"
              ref={(el) => (articleRef.current[item.name] = el)}
            >
              {item.func}
            </article>
          );
        })}
      </div>
      {/* 목차 네비게이션 */}
      <Guide listRef={articleRef} list={list} />
    </div>
  );
}
