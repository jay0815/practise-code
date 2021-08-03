import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


function render(props) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <App setGlobalState={props.setGlobalState}/>
    </React.StrictMode>
    , container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  // 方法已打标 `${appInstanceId}`
  const { onGlobalStateChange } = props;

  // 第二个参数为 true 表示立即触发
  onGlobalStateChange((state, prev) => {
    console.log('[onGlobalStateChange - master]:', state, prev);
  }, true); 
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

reportWebVitals();
