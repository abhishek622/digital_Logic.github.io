//BCD sum
function getOpt() {
    var x = document.getElementById("bcd_num1").value;
    var y = document.getElementById("bcd_num2").value;
    var opt = document.getElementById('optn').value;
    if (opt == "inDec") {
        var s1 = parseInt(x) + parseInt(y);
        var l = s1.toString();
        document.getElementById("bcd_ans").innerHTML = dec_bcd(l);
        document.getElementById("dec_ans").innerHTML = s1;
    }
    else if (opt == "inBcd") {
        var p1 = bcd_dec(x);
        var p2 = bcd_dec(y);
        var a1 = parseInt(p1) + parseInt(p2);
        var k = a1.toString();
        document.getElementById("bcd_ans").innerHTML = dec_bcd(k);
        document.getElementById("dec_ans").innerHTML = a1;

    }
};


//gray-bcd-decimal-binary

//excess3 to others

function x3_bcd(str) {                                                          //1
    var len = str.length;
    var cc = multi(len);
    var kk;
    if (len < cc)
        kk = leftFillNum(str, cc);
    else if (len > cc) {
        var z = cc + 4;
        kk = leftFillNum(str, z);
    }
    else
        kk = str;
    var patt1 = /\d{4}/g;
    var res = kk.match(patt1);
    var s = [];
    for (i = 0; i < res.length; i++) {
        s[i] = parseInt(res[i], 2).toString(10);
        s[i] = parseInt(s[i]) - 3;
        s[i] = ((s[i] >>> 0).toString(2)).padStart(4, "0");
    }
    return s.join("");
}

function x3_dec(val) {                                                      //2
    var x = x3_bcd(val);
    var patt1 = /\d{4}/g;
    var res = x.match(patt1);
    var s = [];
    for (i = 0; i < res.length; i++) {
        s[i] = parseInt(res[i], 2).toString(10);
    }
    return s.join("");
}

function x3_bin(val) {                                                  //3
    var x = x3_dec(val);
    return (x >>> 0).toString(2);
}

function x3_gray(val) {                                                 //4
    var x = x3_dec(val);
    var y = dec_gray(x);
    return y;
}

// decimal to others
function dec_bcd(val) {                                               //5
    var inputStore = val.split("");
    var res = [];
    for (i = 0; i < inputStore.length; i++) {
        var binary = res[i] = parseInt(inputStore[i], 10).toString(2);
        var paddedBinary = binary.padStart(4, 0);
        res[i] = paddedBinary.toString() + " ";
    }
    return res.join("");
}

function dec_bin(val) {                                                 //6
    return (val >>> 0).toString(2);
}

function dec_gray(val) {                                                //7
    var x = dec_bin(val);
    var y = bin_gray(x);
    return y;
}

function dec_x3(val) {                                                  //8
    var y = val.split('');
    var s = [];
    for (i = 0; i < y.length; i++) {
        s[i] = parseInt(y[i]) + 3;
    }
    for (i = 0; i < s.length; i++) {
        s[i] = ((s[i] >>> 0).toString(2)).padStart(4, "0");
    }
    return s.join("");
}

// bcd to others
function bcd_dec(str) {                                                //9
    var len = str.length;
    var c = multi(len);
    var k;
    if (len < c)
        k = leftFillNum(str, c);
    else if (len > c) {
        var z = c + 4;
        k = leftFillNum(str, z);
    }
    else
        k = str;
    var patt1 = /\d{4}/g;
    var res = k.match(patt1);
    var z = 0;
    var s = [];
    var y = "Invalid BCD";
    for (i = 0; i < res.length; i++) {
        s[i] = parseInt(res[i], 2).toString(10);
        if (s[i] > 9) {
            z = s[i];
            break;
        }
    }
    if (z != 0)
        return y;
    else
        return s.join("");
}
function multi(n) {
    var x = 4;
    if (x > n)
        return x;
    n = n + x / 2;
    n = n - (n % x);
    return n;
}
function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, 0);
}

function bcd_bin(val) {                                               //10
    var x = bcd_dec(val);
    return (x >>> 0).toString(2);
}

function bcd_x3(str) {                                                //11
    var x = bcd_dec(str);
    var n = parseInt(x);
    var y = x.split('');
    var s = [];
    for (i = 0; i < y.length; i++) {
        s[i] = parseInt(y[i]) + 3;
    }
    for (i = 0; i < s.length; i++) {
        s[i] = ((s[i] >>> 0).toString(2)).padStart(4, "0");
    }
    return s.join("");
}

function bcd_gray(val) {                                            //12
    var x = bcd_bin(val);
    var y = bin_gray(x);
    return y;
}

// binary to others
function bin_bcd(str) {                                              //13
    var x = parseInt(str, 2).toString(10);
    var y = dec_bcd(x);
    return y;
}

function bin_x3(val) {                                              //14
    var x = bin_dec(val);
    var y = dec_x3(x);
    return y;
}

function bin_gray(val) {                                            //15
    var s = [];
    s[0] = val[0];
    for (i = 1; i < val.length; i++) {
        s[i] = val[i - 1] ^ val[i];
    }
    return s.join("");
}

function bin_dec(val) {                                             //16
    return parseInt(val, 2).toString(10);
}


// gray to others
function gray_bin(gn) {                                             //17
    if (gn < 0) {
        throw new RangeError("gray code numbers cannot be negative");
    }
    var g = gn.toString(2).split("");
    var b = [];
    b[0] = g[0];
    for (var i = 1; i < g.length; i++) {
        b[i] = g[i] ^ b[i - 1];
    }

    return b.join("");
}
function gary_dec(val) {                                                //18
    var bin = gray_bin(val);
    return parseInt(bin, 2).toString(10);;
}

function gray_bcd(val) {                                                //19
    var x = gray_bin(val);
    var y = bin_bcd(x);
    return y;
}

function gray_x3(val) {                                                 //20
    var g = gray_bin(val);
    var x = parseInt(g, 2).toString(10);
    var z = x.toString();
    var y = z.split('');
    var s = [];
    for (i = 0; i < y.length; i++) {
        s[i] = parseInt(y[i]) + 3;
    }
    for (i = 0; i < s.length; i++) {
        s[i] = ((s[i] >>> 0).toString(2)).padStart(4, "0");
    }
    return s.join("");
}

function getOption() {
    var a = document.getElementById("numberX").value;
    var optt1 = document.getElementById("cho1").value;
    var opt2 = document.getElementById("cho2").value;
    if (optt1 == "g") {
        if (opt2 == "d1")
            document.getElementById("demo5").innerHTML =         //1
                gary_dec(a);
        else if (opt2 == "b1")
            document.getElementById("demo5").innerHTML =         //2
                gray_bin(a);
        else if (opt2 == "e1")
            document.getElementById("demo5").innerHTML =         //16
                gray_x3(a);
        else if (opt2 == "c1")
            document.getElementById("demo5").innerHTML =         //10
                gray_bcd(a);
        else if (opt2 == "g1")
            document.getElementById("demo5").innerHTML =
                a;
    }
    else if (optt1 == "b") {
        if (opt2 == "d1")
            document.getElementById("demo5").innerHTML =         //3
                bin_dec(a);
        else if (opt2 == "g1")
            document.getElementById("demo5").innerHTML =         //4
                bin_gray(a);
        else if (opt2 == "e1")
            document.getElementById("demo5").innerHTML =        //14
                bin_x3(a);
        else if (opt2 == "c1")
            document.getElementById("demo5").innerHTML =         //5
                bin_bcd(a);
        else if (opt2 == "b1")
            document.getElementById("demo5").innerHTML =
                a;
    }
    else if (optt1 == "d") {
        if (opt2 == "b1")
            document.getElementById("demo5").innerHTML =         //6
                dec_bin(a);
        else if (opt2 == "g1")
            document.getElementById("demo5").innerHTML =         //11
                dec_gray(a);
        else if (opt2 == "e1")
            document.getElementById("demo5").innerHTML =         //15
                dec_x3(a);
        else if (opt2 == "c1")
            document.getElementById("demo5").innerHTML =         //7
                dec_bcd(a);
        else if (opt2 == "d1")
            document.getElementById("demo5").innerHTML =
                a;
    }
    else if (optt1 == "e") {
        if (opt2 == "d1")
            document.getElementById("demo5").innerHTML =         //17
                x3_dec(a);
        else if (opt2 == "b1")
            document.getElementById("demo5").innerHTML =         //18
                x3_bin(a);
        else if (opt2 == "g1")
            document.getElementById("demo5").innerHTML =         //19
                x3_gray(a);
        else if (opt2 == "c1")
            document.getElementById("demo5").innerHTML =         //18
                x3_bcd(a);
        else if (opt2 == "e1")
            document.getElementById("demo5").innerHTML =
                a;
    }
    else if (optt1 == "c") {
        if (opt2 == "d1")
            document.getElementById("demo5").innerHTML =         //8
                bcd_dec(a);
        else if (opt2 == "b1")
            document.getElementById("demo5").innerHTML =         //9
                bcd_bin(a);
        else if (opt2 == "g1")
            document.getElementById("demo5").innerHTML =         //12
                bcd_gray(a);
        else if (opt2 == "e1")
            document.getElementById("demo5").innerHTML =         //13
                bcd_x3(a);
        else if (opt2 == "c1")
            document.getElementById("demo5").innerHTML =
                a;
    }
    else
        document.getElementById("demo5").innerHTML = "Wrong input";

};
