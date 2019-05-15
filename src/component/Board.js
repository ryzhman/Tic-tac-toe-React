import React from 'react';
import Square from "./Square.js";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //this state is private inside the component, so we cannot make down-up updates
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i) {
        return (
            <Square value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}/>
        );
    }

    calculateWinner(squares) {
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
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.state.xIsNext) {
            squares[i] = 'X';
        } else {
            squares[i] = 'O';
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }



    render() {
        let status = this.state.xIsNext ? 'Next player: X' : 'Next player: O';

        const result = this.calculateWinner(this.state.squares);
        if (result) {
            status = 'The winner is ' + result;
            // return (<div> {status}</div>)
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

export default Board;
