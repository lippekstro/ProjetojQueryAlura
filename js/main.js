var tempoInicial = $("#tempo").text();
var campo = $("#campo-digitacao");
var frase = $(".frase").text();
var conteudo = campo.val();

$(function(){
	pegaTamFrase();
	inicializaContadores();
	inicializaCronometro();
	comparaFrase();
	reinicializaJogo();
	$("#restart").click(reinicializaJogo);
	atualizaPlacar();
	$("#usuarios").selectize({
		create: true,
		sortField: 'text'
	});
	$(".tooltip").tooltipster({
		trigger: 'custom'
	});
});

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo").text(tempo);
}

function pegaTamFrase(){
	var frase = $(".frase").text();	
	var contaPalavras = frase.split(" ").length;
	var tamFrase = $("#tamFrase");
	tamFrase.text(contaPalavras);
}

function inicializaContadores(){
	campo.on("input", function() {
		var conteudo = campo.val();
	    var qtdPalavras = conteudo.split(/\S+/).length - 1;
	    $("#contador-carac").text(conteudo.length);
	    $("#contador-palav").text(qtdPalavras);
	});

}

function inicializaCronometro(){
	campo.one("focus", function(){
		var tempoRestante = $("#tempo").text();
		$("#restart").addClass("disabled");
		var cronometroId = setInterval(function(){
			tempoRestante--;
			$("#tempo").text(tempoRestante);
			if (tempoRestante == 0) {
				clearInterval(cronometroId);
				finalizaJogo();
			}
		}, 1000);
	});
}

function finalizaJogo(){
	campo.attr("disabled", true);			
	$("#restart").removeClass("disabled");
	campo.addClass("campo-desativado");
	inserePlacar();
}

function comparaFrase(){
	campo.on("input", function(){
		var frase = $(".frase").text();
		var conteudo = campo.val();
		var comparavel = frase.substr(0, conteudo.length);
		if(conteudo == comparavel){
			campo.addClass("digitado-certo");
			campo.removeClass("digitado-errado");
		}else{
			campo.addClass("digitado-errado");
			campo.removeClass("digitado-certo");
		}
	});
}

function reinicializaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	campo.removeClass("campo-desativado");
	campo.removeClass("digitado-errado");
	campo.removeClass("digitado-certo");
	$("#contador-carac").text("0");
    $("#contador-palav").text("0");
    $("#tempo").text(tempoInicial);
    inicializaCronometro();
}
