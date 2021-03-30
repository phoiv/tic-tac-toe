import React from 'react';
import Board from './Board.js'
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

class Game extends React.Component {
    state = {
        stepNumber: 0, //how deep in the game we are
        history: [{ squares: Array(9).fill(null), move: [], onTree: null }],
        xIsNext: true,
        orderAsc: true,
        //FIRST PLAYER HAS X ALLWAYS
        pcFirst: true,
        //root of game tree
        // root: null,
    };

    componentDidMount() {

        //create Game Tree full depth
        if (!treeRoot) {
            console.log("MAKING TREE...")
            const history = this.state.history;
            let maxing;
            let mining;
            if (this.state.pcFirst) {
                maxing = "X"
                mining = "O"
            }
            else {
                maxing = "O"
                mining = "X"
            }

            treeRoot = new Node(history[history.length - 1].squares, null, null, this.state.pcFirst ? true : false);
            generateTree(treeRoot, maxing, mining);
            // console.log("leafs = ", count)
            calculateHeuristicValues(treeRoot, maxing, 0, 8);

            this.setState({
                history: [{ squares: Array(9).fill(null), move: [], onTree: treeRoot }]
            })
        }
    }

    componentDidUpdate() {

        const shouldPCplay = (this.state.xIsNext && this.state.pcFirst) || (!this.state.xIsNext && !this.state.pcFirst)
        if (this.props.mode == 1 && shouldPCplay) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            console.log(current)
            //delay pc move for abit
            setTimeout(() => { this.computerMove(current) }, 700)

        }
    }

    handleClick(i) {
        //ignore click if its cpu turn
        const shouldPCplay = (this.state.xIsNext && this.state.pcFirst) || (!this.state.xIsNext && !this.state.pcFirst)
        if (this.props.mode == 1 && shouldPCplay) {
            return;
        }
        this.makeMove(i);
    }

    makeMove(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const currentMove = [Math.floor(i / 3) + 1, i % 3 + 1]
        const currentOnTree = current.onTree.children.find((child) => child.myMove == i)

        this.setState({
            history: history.concat([{ squares: squares, move: currentMove, onTree: currentOnTree }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });


        console.log("ontree", currentOnTree)
    }

    computerMove({ squares, onTree }) {

        let possibleMoves = []
        console.log(onTree)
        //the possible moves are the children on tree that have the same heuristic value as the current node
        onTree.children.forEach((child) => {
            if (onTree.value == child.value)
                possibleMoves.push(child.myMove)
        })

        let comMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        this.makeMove(comMove)
    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggleOrder = () => {
        this.setState({
            orderAsc: !this.state.orderAsc
        })
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let moves = history.map((_, step, array) => {
            const desc = step ? `${step % 2 ? 'X' : 'O'} to ${this.state.history[step].move}` : 'Go to game start';
            return (<li key={step}><button
                onClick={() => this.jumpTo(step)}
                style={{ fontWeight: step === this.state.stepNumber ? "600" : "400" }}
            >{desc}</button></li>);
        });
        if (!this.state.orderAsc)
            moves = moves.reverse()


        let status;
        if (this.state.stepNumber == 9) status = "DRAW"
        else
            if (winner) { status = 'Winner: ' + winner[0]; } else { status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); }
        return (

            <div className={this.props.isActive ? "game on-screen" : "game"} >
                <div className="game-board-wrapper">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} winners={winner} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <p onClick={this.toggleOrder}>Moves <span style={{
                        transform: (this.state.orderAsc ? "" : "rotate(180deg)")
                    }}><FontAwesomeIcon icon={faCaretDown} /></span></p>
                    <ol>{moves}</ol>
                </div>
            </div>
        );

    }
}

export default Game


function calculateWinner(squares) {
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

            return [squares[a], [a, b, c]];
        }
    }
    return null;
}

//maxing for O by default
//this can be simpler with only checking win loss and draw
function heuristicTTT(newBranch, maxing) {
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
    let value = 0;
    for (let i = 0; i < 8; i++) {
        const [a, b, c] = lines[i]
        let oCount = 0;
        let xCount = 0;
        if (newBranch[a] == "O") oCount++
        if (newBranch[b] == "O") oCount++
        if (newBranch[c] == "O") oCount++
        if (newBranch[a] == "X") xCount++
        if (newBranch[b] == "X") xCount++
        if (newBranch[c] == "X") xCount++



        if (oCount == 3)
            value += 100
        else if (xCount == 3)
            value = -100

        else if (xCount == 0) {
            if (oCount == 1)
                value += 1
            else if (oCount == 2)
                value += 3
        }
        else if (oCount == 0) {
            if (xCount == 1)
                value -= 1
            else if (xCount == 2)
                value -= 3
        }


    }
    //draw is bad but better than loss

    if (maxing == "O")
        return value;
    else
        return -value;


}



class Node {
    constructor(squares, parent, move, maxer) {
        this.squares = squares;
        this.myMove = move
        this.parent = parent;
        this.children = [];
        this.value = null;
        this.maxer = maxer; //true false
    }
}

// let leafs = []
let treeRoot = null;
// let count = 0;
function generateTree(currentNode, maxing, mining) {

    //check if its winning config
    if (calculateWinner(currentNode.squares)) {
        // leafs.push(currentNode)
        // count++;
        return;
    }
    //if current node is MAX children are MIN
    let nextMaxer = !currentNode.maxer
    let nextSymbol;
    //when current is node is max its cpu turn so the children are their cpus move with maxing
    if (currentNode.maxer)
        nextSymbol = maxing;
    else
        nextSymbol = mining;

    //populate the children
    for (let i = 0; i < 9; i++) {
        if (currentNode.squares[i] == null) {
            let childSquares = [...currentNode.squares]
            childSquares[i] = nextSymbol;
            let child = new Node(childSquares, currentNode, i, nextMaxer)
            currentNode.children.push(child)
        }
    }

    //counting leaf nodes
    if (currentNode.children.length == 0) {
        // leafs.push(currentNode)
        // count++
        return;
    }

    currentNode.children.forEach((child) => {
        generateTree(child, maxing, mining)
    })


}

function calculateHeuristicValues(currentNode, maxing, currentDepth, targetDepth) {

    if (currentNode.children.length == 0) {
        currentNode.value = heuristicTTT(currentNode.squares, maxing);
        // if (currentNode.value < 0) {
        //     console.log(currentNode.value)
        // }
    }
    else if (currentNode.maxer) {
        currentNode.value = Math.max(...currentNode.children.map((child) => {
            return calculateHeuristicValues(child, maxing);
        }))

    }
    else if (!currentNode.maxer)
        currentNode.value = Math.min(...currentNode.children.map((child) => {
            return calculateHeuristicValues(child, maxing);
        }))

    return currentNode.value;
}