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
  constructor(props){
    super(props);
    this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
    };
  }

  //value作为参数传值,通过this.props.value取值
  renderSquare(i) {
    //onClick 对应的是Square类中的props.onClick
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
     />;
  }

  handleClick(i){
    //slice() 获取一个数组副本immutable，不是地址赋值
    const squares = this.state.squares.slice();
    //如果有人获胜，或者该方块被点击过。就忽略点击事件
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //相应位置的数组元素赋值X
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //将修改过的数组副本赋给state.squares
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


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
