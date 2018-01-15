import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//小方格
class Square extends React.Component {
  //构造方法
  constructor(props){
    super(props);
    //state变量value属性初始化为null
    this.state = {
      value: null
    };
  }

  render() {
    return (
      // button点击时将value值修改
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {/* {this.props.value} */}
        {this.state.value}
      </button>
    );
  }
}


//棋盘
class Board extends React.Component {

  //value作为参数传值,通过this.props.value取值
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//整个界面
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
