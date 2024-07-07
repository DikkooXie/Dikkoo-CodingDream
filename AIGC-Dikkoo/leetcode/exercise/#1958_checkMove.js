
/**
 * @param {character[][]} board
 * @param {number} rMove
 * @param {number} cMove
 * @param {character} color
 * @return {boolean}
 */
var checkMove = function(board, rMove, cMove, color) {
    const ways = [
        [-1,0], //up
        [-1,1], //rightup
        [0,1], //right
        [1,1], //rightdown
        [1,0], //down
        [1,-1], //leftdown
        [0,-1], //left
        [-1,-1], //leftup
    ];
    //分别向八个方向走
    for(let [step_x, step_y] of ways) {
        let x = rMove + step_x;
        let y = cMove + step_y;
        let first = true; // 判断是否第一步
        while (x >= 0 && y >= 0 && x < 8 && y < 8) {
            // 如果是第一步且为'.'或相同颜色则不符合题意
            if (first && board[x][y] === color || board[x][y] === '.') {
                break;
            }
            first = false;
            if (board[x][y] === color) {
                return true;
            }
            x += step_x;
            y += step_y;
        }
    }
    return false;
};