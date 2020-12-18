import React from 'react';
import Square from './Square.js'
import './index.css';


class Board extends React.Component {
    renderSquare(i) {
        let winners = []
        if (this.props.winners)
            winners = this.props.winners[1]
        let color = null;
        if (this.props.squares[i] === "X")
            color = "#202020";
        else
            color = "whitesmoke";

        return <Square
            animate={(winners.includes(i)) ? "anim 1s linear infinite" : "none"}
            value={this.props.squares[i]}
            color={color}
            onClickFun={() => this.props.onClick(i)
            }
        />;
    }

    render() {
        return (
            <div className="game-board">

                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}

            </div>
        );
    }

}

export default Board