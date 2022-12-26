export const getInstructions = (code: number[][], direction: "rows" | "cols"): number[][] => {
    const result = [];

    for (let i = 0; i < code.length; i++) {
        const tempArr = [];
        let value = 0;
        for (let j = 0; j < code[i].length; j++) {
            const item = direction === "rows" ? code[i][j] : code[j][i];

            if (item) {
                value++
                continue;
            }

            tempArr.push(value);
            value = 0;
        }

        if (value > 0) {
            tempArr.push(value);
            value = 0;
        }

        result.push(tempArr.filter((item) => item !== 0))
    }

    return result;
}
