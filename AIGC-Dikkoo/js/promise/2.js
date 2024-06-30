function a(cbB, cbC, cbD) {
    cbB(cbC, cbD);
}

function b(cb, cbD) {
    cb(cbD);
}

function c(cb) {
    cb();
}

function d() {
    console.log('hello');
}

a(b, c, d);