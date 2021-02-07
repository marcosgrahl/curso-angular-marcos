var MinhaVar = 'Minha variável';
function Minha_Func(x, y) {
    return x + y;
}
// ES 6 ou ES 2015
var num = 2;
var pi = 3.14;
var numeros = [1, 2, 3];
numeros.map(function (valor) {
    console.log(valor * 2);
    return valor * 2;
});
numeros.map(function (valor) {
    console.log(valor * 3);
    valor * 3;
});
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
var n2 = 'marcos';
n2 = 4;
