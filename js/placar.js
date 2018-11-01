$("#botao-placar").click(mostraPlacar);
$("#botao-synch").click(sincronizaPlacar);

function inserePlacar(){
	var tabela =  $(".placar").find("tbody");
	var usuario = $("#usuarios").val();
	var numPal = $("#contador-palav").text();

	var linha = novaLinha(usuario, numPal);
	linha.find(".botao-remover").click(remover);

	tabela.append(linha);
	$(".placar").slideDown(500);
	scrollPlacar();
}

function scrollPlacar(){
	var  posicaoPlacar = $(".placar").offset().top;
	$("body").animate({
		scrollTop: posicaoPlacar+'px'
	}, 1000);
}

function novaLinha(usuario, numPal){
	var linha = $("<tr>");
	var coluna = $("<td>").text(usuario);
	var colunaPal = $("<td>").text(numPal);
	var colRemove = $("<td>");
	var link = $("<a>").addClass("botao-remover").attr("href", "#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colRemove.append(link);
	linha.append(coluna);
	linha.append(colunaPal);
	linha.append(colRemove);

	return linha;
}

function remover(){
	$(".botao-remover").click(event, function(){
		event.preventDefault();
		var linha = $(this).parent().parent();
		linha.fadeOut(1000);
		setTimeout(function(){
			linha.remove();	
		}, 1000);
		
	});
}

function mostraPlacar(){
	$(".placar").stop().slideToggle(500);
}

function sincronizaPlacar(){
	var placar = [];
	var linhas = $("tbody > tr");
	linhas.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavras = $(this).find("td:nth-child(2)").text();
		var score = {
			usuario: usuario,
			pontos: palavras
		};

		placar.push(score);

	});
	var dados = {
		placar: placar
	};
	$.post("http://localhost:3000/placar", dados, function(){
		console.log("Dados Salvos");
		$(".tooltip").tooltipster("open");
	}).fail(function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "falha ao sincronizar");
	}).always(function(){
		setTimeout(function(){
			$(".tooltip").tooltipster("close");	
		}, 2000);
	});
}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			linha.find(".botao-remover").click(remover);
			$("tbody").append(linha);
		});
	});
}