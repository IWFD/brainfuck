import { interpret, resetState } from './toText.js';
import { reverseInterpret } from './toBF.js';

$("#bf").on("paste keyup",function(e){
    $(this).val(this.value.replace(/[^+\-\[\]<>.,]*/g,''))
 })

function copy(value) {
   
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("Copy");
    $temp.remove();
    new Noty({
        theme: 'metroui',
        text: 'Copiado!',
        timeout: 1500,
        progressBar: false,
        type: 'success',
    }).show();
}

$("#cpText").click(function (event) {
    const value = textInput.val();
    copy(value);
});

$("#bfText").click(function (event) {
    const value = bfInput.val();
    copy(value);
});

$("#explainText").click(function (event) {
    window.open('https://en.wikipedia.org/wiki/Text', 'name');
});

$("#explainBF").click(function (event) {
    window.open('https://en.wikipedia.org/wiki/Brainfuck', 'name');
});

const textInput = $('#text');
const bfInput = $('#bf');

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

function textToBf(e) {
    const textTemp = textInput.val();
    const bfTemp = reverseInterpret(textTemp);
    bfInput.val(bfTemp);
    if (!textTemp) {
        bfInput.val('');
    }
}

function bfToText(e) {
    resetState();
    const bfTemp = bfInput.val();
    const textTemp = interpret(bfTemp);
    textInput.val(textTemp);
    if (!textInput.val()) {
        textInput.val('');
    }
}

textInput.on('input', function() {
    textToBf()
});

bfInput.on('input', function() {
    bfToText()
});

$("#delete").click(function(ev){
    textInput.val('');
    bfInput.val('');
})
