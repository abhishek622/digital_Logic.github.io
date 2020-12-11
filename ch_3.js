
document.getElementById('getResult').addEventListener('click', () => {
    var len = vars.length
        , splitBy = Math.round(len / 2)
        , trueSet
        , trues = []
        , falses = []
        , truthData = [];

    vars = document.getElementById('vars').value.split(',');
    expressions = document.getElementById('expression').value.split(',');


    truthData.push(truth(vars, vars, true));
    for (var i = 1; i <= splitBy; i++) {
        trueSet = reduceToCombinations(permut(vars, i));

        trueSet.forEach((truthSrc) => {
            trues = truth(vars, truthSrc);
            truthData.push(trues);
        });


    }
    truthData.push(truth(vars, vars));

    writeTruthTable(truthData);
});

function truth(set, truths, reverse) {
    var w = {};

    set.forEach(v => w[v] = (truths.indexOf(v) >= 0 ? true : false) ^ reverse);

    return w;
}

function reduceToCombinations(arr) {
    var i = 1
        , lastEl;

    arr = arr.map(v => { return v.split('').sort().join('') }).sort();

    lastEl = arr[0];
    while (i < arr.length) {
        if (arr[i] == lastEl) {
            arr.splice(i, 1);
        } else {
            lastEl = arr[i];
            i++;
        }
    }

    arr = arr.map(v => { return v.split('') });

    return arr;
}

function writeTruthTable(truthData) {
    var table = '<table class="table table-sm text-center table-bordered">'
        , keys
        , vals
        , exprRes;

    table += '<thead class="thead-light"><tr>';
    vars.forEach(v => {
        table += '<th scope="col">';
        table += v;
        table += '</th>';
    });
    expressions.forEach(v => {
        table += '<th>';
        table += v;
        table += '</th>';
    });
    table += '</tr></thead>';

    truthData.forEach((v) => {
        vals = [];
        keys = [];
        table += '<tr>';
        console.log(v);
        for (i in v) {
            vals.push(v[i]);
            keys.push(i);
            table += '<td>';
            table += v[i];
            table += '</td>';
        };
        for (var i = 0; i < keys.length; i++) {
            eval(`var ${keys[i]} = ${vals[i]};`);
        }
        expressions.forEach((expr) => {
            exprRes = eval(expr);
            table += '<td>';
            table += exprRes ? '1' : '0';
            table += '</td>';
        });

        table += '</tr>';
    });

    table += '</table>';

    document.getElementById('result').innerHTML = table;
}

function permut(arr, c) {
    var buf = []
        , len
        , arrSlice
        , permArr
        , proArr;
    if (c <= 1) {
        return arr;
    } else {
        len = arr.length;
        for (var i = 0; i < len; i++) {
            arrSlice = arr.slice(0, i).concat(arr.slice(i + 1));
            permArr = permut(arrSlice, c - 1);
            proArr = [];
            for (var y = 0; y < permArr.length; y++) {
                proArr.push([arr[i]].concat(permArr[y]).join(''));
            }
            buf.push(...proArr);
        }
    }
    return buf;
}