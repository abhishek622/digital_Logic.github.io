Find.addEventListener('click', (e) => {
    e.preventDefault();
    var a = document.getElementById("num1").value;
    var b = document.getElementById("num2").value;
    var opt = document.getElementById('operation').value;
    var x = parseInt(a, 2);
    var y = parseInt(b, 2);
    var src = "";
    if (opt == "add") {
        var sum = x + y;
        var ans = sum.toString(2);
    }
    else if (opt == "sub") {
        var sub = x - y;
        var ans = sub.toString(2);
    }
    else if (opt == "mul") {
        var mul = x * y;
        var ans = mul.toString(2);
    }
    else if (opt == "div") {
        if (y) {
            var div = x / y;
            var ans = div.toString(2);
        }
    }
    src = ans;
    if (opt == "div") {
        document.getElementById("bin").innerHTML = parseFloat(src);
        document.getElementById("dec").innerHTML = toDecimal(src);
    }
    else {
        document.getElementById("bin").innerHTML = src;
        document.getElementById("dec").innerHTML = parseInt(src, 2).toString(10);
    }
});

function toDecimal(string) {
    radix = 2;
    var s = string.split('.');
    var decimal = parseInt(s[0], radix);

    if (s.length > 1) {
        var fract = s[1].split('');

        for (var i = 0, div = radix; i < fract.length; i++, div = div * radix) {
            decimal = decimal + fract[i] / div;
        }
    }
    return decimal;
}

//complement of a number

comp.addEventListener('click', (e) => {
    e.preventDefault();
    var x = document.getElementById("c_num").value;
    //var n = parseInt(x);
    var y = document.getElementById("b_num").value;
    if (y == "bin")
        b = 2;
    else if (y == "dec")
        b = 10
    else if (y == "hex")
        b = 16
    else if (y == "oct")
        b = 8
    document.getElementById("rc_res").innerHTML = rComp(x, b);
    document.getElementById("drc_res").innerHTML = drComp(x, b);
});

function drComp(n, b) {
    if (b == 2) {
        var bits = n.split("");
        var c = '';
        for (var i = 0; i < n.length; i++) {
            c += bits[i] === '0' ? '1' : '0';
        }
        return c;
    }
    else if (b == 10) {
        var num = n.split("");
        var k = [];
        for (i = 0; i < n.length; i++)
            k[i] = 9 - parseInt(num[i], 10);
        return k.join("");
    }
    else if (b == 8) {
        var num = n.split("");
        var k = [];
        for (i = 0; i < n.length; i++)
            k[i] = 7 - parseInt(num[i], 10);
        return k.join("");
    }
    else if (b == 16) {
        var x = n.split("");
        num = [];
        for (i = 0; i < n.length; i++) {
            num[i] = parseInt(x[i], 16);
        }
        var k = [];
        for (i = 0; i < n.length; i++) {
            var hex = 15 - parseInt(num[i], 10);
            k[i] = hex.toString(16);
        }
        return k.join("");
    }
}

function rComp(n, b) {
    if (b == 2) {
        var k = drComp(n, b);
        var x = parseInt(k, 2);
        var b = 1;
        b = b.toString();
        var y = parseInt(b, 2);
        var sum = x + y;
        var ans2 = sum.toString(2);
        return ans2;
    }
    else {
        var k = drComp(n, b);
        if (b == 16) {
            var p = parseInt(k, 16) + 1;
            var t = p.toString(16);
            return t;
        }
        else {
            var p = parseInt(k, 10) + 1;
            return p;
        }
    }
}

//bcd addition

function getOpt() {
    var x = document.getElementById("bcd_num1").value;
    var y = document.getElementById("bcd_num2").value;
    document.getElementById("text_area").innerHTML = bcd_sum(x, y);
};

function bcd_sum(a, b) {
    var x = a.split("");
    var y = b.split("");
    var res = [];
    var s = 1;
    var p = [];
    var len = x.length;
    for (i = 0; i < len; i++) {
        res[i] = parseInt(x[i], 10) + parseInt(y[i], 10);
        if (res[i] > 9) {
            res[i] = parseInt(res[i], 10) + 6;
        }
        res[i] = (parseInt(res[i], 10).toString(2)).padStart(4, "0");
    }
    var arr1 = [];
    for (i = 0; i < a.length; i++) {
        arr1[i] = leftFillNum((parseInt(res[i], 10) % 10000), 4);
    }
    if (res[0].length == 5)
        p[0] = 1;
    else
        p[0] = 0;
    for (i = 0; i < len - 1; i++) {
        if (res[i + 1].length == 5) {
            var k = parseInt(arr1[i], 2) + 1;
            p[i + 1] = (k.toString(2)).padStart(4, "0");
        } else
            p[i + 1] = arr1[i];
    }
    p[len] = arr1[len - 1];
    jj = [];
    for (i = 0; i < p.length; i++)
        jj[i] = parseInt(p[i], 2).toString(10);
    return "BCD : " + p.join(" ") + "\nDecimal : " + jj.join("");
}

