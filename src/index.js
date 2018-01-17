import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//小方格
// class Square extends React.Component {
//   //构造方法
//   constructor(props){
//     super(props);
//     //state变量value属性初始化为null
//     this.state = {
//       value: null
//     };
//   }
//
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props){
  // 注意是props.onClick而不是props.onClick()
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


//棋盘
class Board extends React.Component {
  //value作为参数传值,通过this.props.value取值
  renderSquare(i) {
    //onClick 对应的是Square类中的props.onClick
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
     />;
  }

  render() {
    return (
      <div>
        {/* <div className="status">{status}</div> */}
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
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    //slice() 获取一个数组副本immutable，不是地址赋值
    const squares = current.squares.slice();
    //如果有人获胜，或者该方块被点击过。就忽略点击事件
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //相应位置的数组元素赋值X
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //state状态中更新当前操作记录history
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    //当前棋盘布局，是历史布局数组的最后一个元素
    const current = history[history.length - 1];
    //根据当前棋盘布局计算胜者
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  //所有胜利条件的坐标集(三横三纵两对角)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i=0; i<lines.length; i++){
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
