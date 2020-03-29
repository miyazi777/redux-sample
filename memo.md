
# create-react-appのインストール
npm install -g create-react-app

# プロジェクトの作成方法
```
create-react-app <project-name>
```

# クラスコンポーネント
```
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}

```

# 関数コンポーネント
```
// functional app
const App = () => {
  return (
    <div>
      <Cat/>
      <Cat/>
      <Cat/>
    </div>
  )
}

const Cat = () => {
  return <div>Cat!</div>
}
```

# propsの例
```
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <User name={"Taro"}/>
      </div>
    )
  }
}

## クラスコンポーネントの例
class User extends Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (
      <div>
        I am {this.props.name}
      </div>
    )
  }
}

## 関数型コンポーネントの例
const User = (props) => {
  return <div>I am {props.name}</div>
}

export default App;
```

# stateの例
```
import React, { Component } from 'react';

const App = () => {
  return (
    <Counter/>
  )
}

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    return (
      <div>count : { this.state.count }</div>
    )
  }
}

```


# イベント処理の例
```
import React, { Component } from 'react';

const App = () => {
  return (
    <Counter/>
  )
}

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  handlePlus = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <React.Fragment>
        <div>count : { this.state.count }</div>
        <button onClick={this.handlePlus}>+++</button>
      </React.Fragment>
    )
  }
}
```

## イベントの更新でパラメータを設定したときのやり方
```
import React, { Component } from 'react';

const App = () => {
  return (
    <Counter/>
  )
}

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  handleCount = (value) => {
    this.setState({ count: this.state.count + value})
  }

  render() {
    return (
      <React.Fragment>
        <div>count : { this.state.count }</div>
        <button onClick={() => this.handleCount(1)}>---</button>
      </React.Fragment>
    )
  }
}

```


# reduxの基本
以下にカウンターを+1するだけのアプリのサンプルソースを示す

## install
npm i --save redux react-redux

## ディレクトリ構成
├── src
│   ├── actions
│   │   └── index.js
│   ├── components
│   │   └── App.js
│   ├── index.js
│   ├── reducers
│   │   ├── count.js
│   │   └── index.js


## イベントの登録
ボタンが押された時にカウンタを増やすアクション

actions/index.js
```
export const INCREMENT = 'INCREMENT'

export const increment = () => ({
  type: INCREMENT
})
```

## ストアの定義
reduxで管理するストアの定義を行う。
また、上記で定義したアクション毎にstateをどのように更新するかをここで実装する

src/reducers/count.js
```
import { INCREMENT } from '../actions'

const initialState = { value: 0 }   // stateの初期値

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 }
    default:
      return state
  }
}
```

また、こちらでreducersを統合し、扱いやすくする(今回は1つだけなので、わかりづらい)
reducersの種類が増えない限りは基本、最初に1度定義するだけになる。

src/reducers/index.js
```
import { combineReducers } from 'redux'
import count from './count'

export default combineReducers({ count })
```

## コンポーネントと紐付ける
今回はAppコンポーネントでstoreを扱えるようにする

src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';    // createStoreをimport
import { Provider } from 'react-redux'; // providerコンポーネントをimport

import './index.css';
import reducer from './reducers'  // reducerをimport
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer)  // reducerからstoreを定義

ReactDOM.render(
  <Provider store={store}>            // Providerタグで囲ってstoreを使えるようにする
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## コンポーネント内部でreduxのstoreのstateとreducerをpropsとして扱えるようにする
src/components/App.js
```
import React, { Component } from 'react';
import { connect } from 'react-redux'

import { increment } from '../actions'

class App extends Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div>value: { props.value }</div>
        <button onClick={props.increment}>+++</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ // propsにstoreのstateを定義
  value: state.count.value,
})

const mapDispatchToProps = dispatch => ({ // propsにactionを定義
  increment: () => dispatch(increment()),
})

// mapDispatchToPropsのショートハンドとして以下のような記述も可能
// const mapDispatchToProps = dispatch => ({ increment })

export default connect(mapStateToProps, mapDispatchToProps)(App)  // ここでコンポーネントと接続する
```

