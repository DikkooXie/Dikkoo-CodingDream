/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors) {
    const len = colors.length;
    const k = 3;
    let res = 0;

    for(let i = 0; i < k; i++) {
        colors.push(colors[i]);
    }

    for(let i = 0; i < len; i++) {
        if(judge(i)) 
            res++;
    }

    return res;

    function judge(i) {
        let temp = colors[i];
        for(let j = i+1; j < i+k; j++) {
            if(colors[j] === temp)
                return false;
            temp = colors[j];
        }
        return true;
    }

};