// var data = null;

// function a() {
//     setTimeout(() => {
//         data = 'hello';
//     }, 1000);
// }

// function b() {
//     console.log(data);
// }

// a();
// b();

/**
 * 优雅的回调
 */

var data = null;

function a(fun) {
    setTimeout(() => {
        data = 'hello';
        fun();
    }, 1000);
}

function b() {
    console.log(data);
}

a(b);