function inserePlacar(){
	var tabela =  $(".placar").find("tbody");
	var usuario = "Fellipe";
	var numPal = $("#contador-palav").text();

	var linha = novaLinha(usuario, numPal);
	linha.find(".botao-remover").click(remover);

	tabela.append(linha);
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
		$(this).parent().parent().remove();
	});
}