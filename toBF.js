export function reverseInterpret(input) {
    function StringBuilder() {
        var sb = {};

        sb.value = '';
        sb.append = (txt) => sb.value += txt;

        return sb;
    }

    function closest(num, arr) {
        var arr2 = arr.map((n) => Math.abs(num - n))
        var min = Math.min.apply(null, arr2);
        return arr[arr2.indexOf(min)];
    }

    function buildBaseTable(arr) {
        var out = StringBuilder();
        out.append('+'.repeat(10));
        out.append('[')
        arr.forEach(function (cc) {
            out.append('>');
            out.append('+'.repeat(cc / 10));
        });
        out.append('<'.repeat(arr.length));
        out.append('-');

        out.append(']');
        return out.value;
    }

    function encode_utf8(s) {
        return unescape(encodeURIComponent(s));
    }

    var output = StringBuilder();

    var charArray = encode_utf8(input).split('').map((c) => c.charCodeAt(0));
    var baseTable = charArray.map((c) => Math.round(c / 10) * 10).filter((i, p, s) => s.indexOf(i) === p);

    output.append(buildBaseTable(baseTable));
//Ajuste de variável
    var pos = -1;
    charArray.forEach(function (charCode) {
        var bestNum = closest(charCode, baseTable);
        var bestPos = baseTable.indexOf(bestNum);

        var moveChar = pos < bestPos ? '>' : '<';
        output.append(moveChar.repeat(Math.abs(pos - bestPos)))
        pos = bestPos;

        var opChar = baseTable[pos] < charCode ? '+' : '-';
        output.append(opChar.repeat(Math.abs(baseTable[pos] - charCode)));
        output.append('.');
        baseTable[pos] = charCode;
    });

    //console.log(output.value)
    //console.log('Length of BF code: ' + output.value.length);
    //console.log('Score: ' + output.value.length / input.length);

    return output.value;
}