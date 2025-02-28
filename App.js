import { useState } from "react";
import React from 'react';

function Square({value, onSquareClick}){
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i){
        if(squares[i] || calculateWinner(squares)){
            return
        }

        const nextSquares = squares.slice()
        
        if(xIsNext){
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status
    if (winner){
        status = "Winner is " + winner
    } else if(!squares.includes(null)){
        status = "It's a draw guys!"
    } else {
        status = "Next playes " + (xIsNext ? "X" : "0")
    }

    const marimeTabel = 3
    const tablou = []

    for(let row = 0; row < marimeTabel; row++){
        let patrateRand = []
        for(let col = 0; col < marimeTabel; col++){
            
            let index = row * marimeTabel + col
            patrateRand.push(
                <Square value={squares[index]} onSquareClick={() => handleClick(index)}></Square>);
                
            }
            tablou.push(
                <div className="board-row">
                {patrateRand}
                </div>)
        }
    
    return (
    <>
    <div className="status">{status}</div>
    {tablou}
    </>
)
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]}
    }return null
}

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0){
            description = "Go to move #" + move + " "
        }else {
            description = "Go to game start"
        }
        return (
            <li key = {move}>
                 {move === currentMove ?
                    (<p>You are at the move #{move}</p>) :
                    (<button onClick={() => jumpTo(move)}>{description}</button>)
                 }
            </li>
        )
    })


    return(
    <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
    </div>)
}