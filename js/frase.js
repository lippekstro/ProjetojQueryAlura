$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);



function fraseAleatoria(){
	$("#spinner").toggle();

	$.get("http://localhost:3000/frases", trocaFrase).fail(function(){
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		}, 5000);
	}).always(function(){
		$("#spinner").toggle();
	});
}

function trocaFrase(data){
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);
	pegaTamFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	var dados = {
		id: fraseId
	};

	$.get("http://localhost:3000/frases", dados, trocaFraseId).fail(function(){
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		}, 5000);
	}).always(function(){
		$("#spinner").toggle();
	});
}

function trocaFraseId(data){
	var frase = $(".frase");
	frase.text(data.texto);
	pegaTamFrase();
	atualizaTempoInicial(data.tempo);
}