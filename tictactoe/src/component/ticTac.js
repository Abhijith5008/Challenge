import { useState } from 'react'

const generateBoard = (size) => {
    const newBoard = []
    for (let i = 0; i < size; i++) {
        newBoard.push([...Array(size)])
    }
    return newBoard;
}

function TicTac() {
    const [board, setBoard] = useState(generateBoard(3));
    const [boardLength, setBoardLength] = useState(3);
    const [boardFlag, setBoardFlag] = useState(false);
    const [winner, setWinner] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('🐱');

    const checkHorizotal = (board) => {
        for (let row of board) {
            const rowSet = new Set(row)
            // eslint-disable-next-line
            if (rowSet.size == 1 && !rowSet.has(undefined)) {
                return true
            }
        }
    }

    const rowsToColums = (board) => {
        const newBoard = []
        let column = 0;
        while (column < board.length) {
            const newRow = []
            for (let row = 0; row < board.length; row++) {
                newRow.push(board[row][column])
            }
            newBoard.push(newRow)
            column++
        }
        return newBoard
    }

    const diagonalToRow = (board) => {
        const newBoard = [[], []]
        let increment = 0
        let decrement = board.length - 1
        while (increment < board.length) {
            newBoard[0].push(board[increment][increment])
            newBoard[1].push(board[increment][decrement])
            increment++
            decrement--
        }
        return newBoard
    }

    const checkForWin = (board) => {
        if (checkHorizotal(board)) {
            return true
        }
        if (checkHorizotal(rowsToColums(board))) {
            return true
        }
        if (checkHorizotal(diagonalToRow(board))) {
            return true
        }
    }

    const handleClick = (row, col) => {
        setBoardFlag(true);
        board[row][col] = currentPlayer;
        setBoard([...board]);
        if (checkForWin(board)) {
            setWinner(currentPlayer + "Wins ! ! !");
        }
        // eslint-disable-next-line
        setCurrentPlayer(currentPlayer == '🐱' ? '🐭' : '🐱')
    };

    const handleBoard = (input) => {
        let newBoard = null;
        if (Number(input) <= 9 && Number(input) >= 3) {
            setBoardLength(Number(input))
            newBoard = generateBoard(Number(input));
            console.log(newBoard)
            if (newBoard) {
                setBoard(newBoard);
            }
        }
    };

    const handleReset = () => {
        setBoardFlag(false);
        setBoard(generateBoard(boardLength))
        setWinner(null);
    };

    return (
        <div>
            <h4 style={{ color: "whitesmoke" }}>Board Size : {boardLength}</h4>
            <input type='number' disabled={boardFlag} defaultValue={board.length} onChange={(e) => handleBoard(e.target.value)}></input>
            <button style={{ background: "whitesmoke", color: "black", margin: "1rem" }} onClick={handleReset}>RESET</button>
            {board.map((row, r) => (
                <div style={{ display: "flex" }} key={r}>
                    {row.map((cell, c) => (
                        <div
                            key={c}
                            style={{
                                border: "solid whitesmoke 1px",
                                height: "60px",
                                width: "60px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onClick={() => handleClick(r, c)}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
            <p style={{ color: "whitesmoke" }}>{winner}</p>
        </div>

    );
}

export default TicTac;
