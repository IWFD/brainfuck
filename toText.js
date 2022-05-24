/** Interpreter variables */
// Se liga na memória.. cria uma nova matriz de tamanho 30.000, com cada célula inicializada com o valor 0. A memória pode ser expandida.
const MEMORY_SIZE = 30000;
const memory = new Array(MEMORY_SIZE).fill(0);
// Ponteiro de instrução (aponta para a INSTRUÇÃO atual)
let ipointer = 0;
// Ponteiro de memória (aponta para uma célula em MEMORY)
let mpointer = 0;
// Literalmente a pilha de endereços. Usado para rastrear endereços (índice) de colchetes esquerdos ***Esquerdos e não Direitos :D
let astack = [];

let program = "";
let input = "";
let output = "";

/** Código do Interpretador */

export function resetState() {
    // Limpa a memória, reseta os ponteiros para zero.
    memory.fill(0);
    ipointer = 0;
    mpointer = 0;
    output = "";
    input = "";
    program = "";
    astack = [];
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function sendOutput(value) {
    output += String.fromCharCode(value);
}

function getInput() {
    // Define um valor padrão para retornar caso não haja nenhuma entrada para consumir.
    let val = 0;

    // Se a entrada não estiver vazia
    if (input) {
        // Chama o código de caractere do primeiro caractere da string.
        val = input.charCodeAt(0);
        // Remove o primeiro caractere da string, pois é "consumido" pelo programa.
        input = input.substring(1);
    }

    return val;
}

export function interpret(program) {
    let end = false;

    while (!end) {
        switch (program[ipointer]) {
            case '>':
                if (mpointer == memory.length - 1)
                    /* Se tentar acessar a memória além do que está disponível no momento, expande o array */ 
                    memory.push(0, 0, 0, 0, 0);
                mpointer++;
                break;
            case '<':
                if (mpointer > 0)
                    mpointer--;
                break;
            case '+':
                memory[mpointer]++;
                break;
            case '-':
                memory[mpointer]--;
                break;
            case '.':
                sendOutput(memory[mpointer]);
                break;
            case ',':
                memory[mpointer] = getInput();
                break;
            case '[':
                if (memory[mpointer]) { // Se for diferente de zero
                    astack.push(ipointer);
                } else { // Pular para o colchete direito correspondente *NÃO ESQUECER!!!
                    let count = 0;
                    while (true) {
                        ipointer++;
                        if (!program[ipointer]) break;
                        if (program[ipointer] === "[") count++;
                        else if (program[ipointer] === "]") {
                            if (count) count--;
                            else break;
                        }
                    }
                }
                break;
            case ']':
                //O ponteiro é incrementado automaticamente a cada iteração, portanto, melhor diminuir para obter o valor correto pra não ter erro.
                ipointer = astack.pop() - 1;
                break;
            case undefined: // Chegando ao fim do programa :(
                end = true;
                break;
            default: // Isso é pra ignor qualquer caractere que não faça parte da sintaxe regular do Brainfuck!
                break;
        }
        ipointer++;

    }
    output = decode_utf8(output);
    //console.log(output);
    return output;
}