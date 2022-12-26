import {Action} from "../modules/action-panel/interactor";

export class GameCode {
    private readonly _code: number[][] = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0]
    ];

    constructor(code?: number[][]) {
        if (code) {
            this._code = code;
        }
    }

    get code() {
        return this._code;
    }

    public validateMove(action: Action, row: number, column: number) {
        if (action === "fill") {
            return !!this._code[row][column];
        }

        return this._code[row][column] === 0;
    }

    public getCell(row: number, column: number) {
        return this._code[row][column];
    }

    public getRow(row: number) {
        return this._code[row];
    }

    public getColumn(column: number) {
        return this._code.map((row) => row[column]);
    }

    public getRowPoints(row: number) {
        return this._code[row].reduce((acc, cur) => {
            return acc + cur;
        }, 0)
    }

    public getColPoints(column: number) {
        const col = this.getColumn(column);
        return col.reduce((acc, cur) => {
            return acc + cur;
        }, 0)
    }
}
