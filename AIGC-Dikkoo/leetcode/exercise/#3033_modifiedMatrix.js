/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var modifiedMatrix = function(matrix) {
    for (let j = 0; j < matrix[0].length; j++) {
        let mx = 0;
        for (const row of matrix) {
            mx = Math.max(mx, row[j]);
        }
        for (const row of matrix) {
            if (row[j] === -1) {
                row[j] = mx;
            }
        }
    }
    return matrix;
};