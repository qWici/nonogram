import {getInstructions} from "../../utils/getInstructions";
import {Action} from "../action-panel/interactor";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CellState} from "../cell/interactor";
import {deepClone} from "../../utils/deepClone";
import {GameCode} from "../../core/game-code";
import {TwoDMatrix} from "../../global";

export interface IMainPageInteractor {
    code: TwoDMatrix<number>;
    rows: TwoDMatrix<number>;
    cols: TwoDMatrix<number>;
    onSelectAction: (action: Action) => void;
    onCellClick: (row: number, col: number) => void;
    currentAction: Action;
    gameState: TwoDMatrix<CellState>;
}

export const useMainPageInteractor = (): IMainPageInteractor => {
    const gameCode = useMemo(() => new GameCode(), []);
    const TABLE_SIZE = 5;
    const [currentAction, setCurrentAction] = useState<Action>("fill");
    const [gameState, setGameState] = useState<TwoDMatrix<CellState>>([]);

    const handleSelectAction = useCallback((action: Action) => {
        setCurrentAction(action);
    }, [])

    const updateCellState = useCallback((row: number, col: number) => {
        setGameState((prev) => {
            const temp = deepClone(prev);
            temp[row][col] = currentAction === "fill" ? "filled" : "crossed";
            return temp;
        })
    }, [currentAction])

    const autoFillCell = useCallback((row: number, col: number) => {
        setGameState((prev) => {
            const temp = deepClone(prev);
            temp[row][col] = gameCode.getCell(row, col) === 1 ? "filled" : "crossed";
            return temp;
        })
    }, [gameCode])

    const handleCellClick = useCallback((row: number, col: number) => {
        const isRightMove = gameCode.validateMove(currentAction, row, col);
        if (isRightMove) {
            updateCellState(row, col);
            return;
        }

        console.log('wrong move');
        autoFillCell(row, col);
    }, [autoFillCell, currentAction, gameCode, updateCellState])

    const fillCompletedRow = useCallback((row: number) => {
        setGameState((prev) => {
            const temp = deepClone(prev);
            temp[row] = gameCode.getRow(row).map((item) => item === 1 ? "filled" : "crossed");
            return temp;
        })
    }, [gameCode])

    const fillCompletedCol = useCallback((col: number) => {
        setGameState((prev) => {
            const temp: TwoDMatrix<CellState> = deepClone(prev);
            return temp.map((row, ri) => {
                return row.map((item, ci) => {
                    if (ci !== col) {
                        return item
                    }

                    return gameCode.getCell(ri, ci) === 1 ? "filled" : "crossed";
                })
            });
        })
    }, [gameCode])

    const isRowFilled = useCallback((row: number) => {
        return gameState[row].filter((cell) => cell === "empty").length <= 0;
    }, [gameState])

    const isColFilled = useCallback((col: number) => {
        const gameCol = gameState.map((val) => val[col]);
        return gameCol.filter((cell) => cell === "empty").length <= 0;
    }, [gameState])

    useEffect(() => {
        for (let i = 0; i < gameState.length; i++) {
            const gameCol = gameState.map((val) => val[i]);
            const gameColPoints = gameCol.reduce((acc, cur) => {
                return acc + (cur === "filled" ? 1 : 0)
            }, 0)

            const codeColPoints = gameCode.getColPoints(i);

            if (gameColPoints == codeColPoints && !isColFilled(i)) {
                fillCompletedCol(i);
            }
        }
    }, [gameState, gameCode, isColFilled, fillCompletedCol])

    useEffect(() => {
        for (let i = 0; i < gameState.length; i++) {
            const gameRowPoints = gameState[i].reduce((acc, cur) => {
                return acc + (cur === "filled" ? 1 : 0)
            }, 0)

            const codeRowPoints = gameCode.getRowPoints(i);

            if (gameRowPoints == codeRowPoints && !isRowFilled(i)) {
                fillCompletedRow(i);
            }
        }
    }, [gameState, gameCode, isRowFilled, fillCompletedRow])

    useEffect(() => {
        // generate empty game state
        setGameState(Array(TABLE_SIZE).fill(Array<CellState>(TABLE_SIZE).fill("empty")))
    }, [])

    return {
        code: gameCode.code,
        rows: getInstructions(gameCode.code, "rows"),
        cols: getInstructions(gameCode.code, "cols"),
        currentAction,
        onSelectAction: handleSelectAction,
        gameState,
        onCellClick: handleCellClick
    };
};
