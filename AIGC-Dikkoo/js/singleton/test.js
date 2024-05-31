"use strict";

let name = "阿达";

let obj = {
    name: "dikkoo",
    say: function() {
        console.log(this.name);
    }
}

let obj2 = {
    name: "阿伟",
}

obj.say(); // dikkoo

const fn = obj.say;

fn.apply(obj2); // 阿伟
fn.apply(obj); // dikkoo
//fn(); // 阿达