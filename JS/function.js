//instanciando o documento.
$(document).ready(()=>{

	//verifica conexão com internet
	var online = navigator.onLine;

	$(window).on("offline", ()=>{
		online = false;
		
	});

	$(window).on("online", ()=>{
		$('.conection').fadeOut();
		online = true;
		
	});

	var pesquisa = new Pesquisa();

	pesquisa.search("Itachi Uchiha", 1);
	pesquisa.search("Vegeta", 2);
	pesquisa.search("Okabe Rintarou", 3);
	pesquisa.search("Edward Elric", 4);




	//executa a pesquisa de personagens com Ajax e API kitsu
	$('.button').on("click", function(){

		//se o navegador estiver online executa requisição da api kitsu
		if(online){
    		$('.cards').html("");

    		//pega nome digitado na barra de pesquisas 
			let name = $('.search').val();
			
			//executa requisição https na API usando o nome digitado na barra de pesquisas
			$.ajax({
				url:"https://kitsu.io/api/edge/characters?filter[name]="+name+"",
				dataType:"json",
				success: function(data){

					console.log(data.data[0]);

					//verifica se o nome na barra de pesquisas está vazio
					if ($('.search').val()===""){
						//caso esteja vazio, mostra aviso de que necessita digitar um nome
						$('.empty').fadeIn();
						window.setTimeout(()=>{
							$('.empty').fadeOut();
						}, 2500);
					}else{
						//caso não exista o personagem pesquisado, mostra aviso.
						if (data.data.length === 0 ) {
							$('.sad').fadeIn();
							window.setTimeout(()=>{
								$('.sad').fadeOut();
							}, 4000);
						}else{
							//caso tenha personagem, cria cards com nomes parecidos.
							data.data.forEach((person,i)=>{
									
									//cria apenas cards que tenham imagens na API kitsu
									if (data.data[i].attributes.image === null){


										
									}else{

										canonicalName = data.data[i].attributes.canonicalName;
										description = data.data[i].attributes.description;
										another_names = data.data[i].attributes.otherNames
										$('.cards').append("<div class='card card"+i+"'><div class='arrow'><i class='fa fa-angle-up'></i></div><div class='descriptions'><p class='name'>"+canonicalName+"</p><div class='limit'><p class='description'>"+description+"</p></div><p class='another_names'>"+another_names+"</p></div></div>");
										$('.card'+i).css("background-image", "url("+data.data[i].attributes.image.original+")");
									}
							});
						}
					}
					
				},
				//caso retorne algum erro da requisição.
				error: function(erro){
					console.log(erro);
				}
			});
		}else{
			//se conexão de internet com navegador não existir, mostra aviso de que está sem internet
			$('.conection').fadeIn();
		}

		//executa a pesquisa sem recarregar a pagina.
		return false;
	});

	//executa a abertura da tela de cada card caso tenha descrição
	$(document).on("click",".card", function(){

		//recupera os dados do card clickado
		let descriptionDiv = ($(this).find(".description").html());
		let namep = $(this).find(".name").html();
		let background = $(this).css("background-image");
		let descriptionp = $(this).find(".description").html();
		background = background.replace("url(","").replace(")","");

		//verifica se o card tem descrição ou não
		if (descriptionDiv === ""){
			//caso não tenha descrição, não há necessidades de abrir uma pagina sem informações a mostrar
			
		}else{
			//caso tenha descrição, pega os dados e abre uma pagina com as informações do card
			$('.name-p').html(namep);
			$('.description-p').html("");
			$('.description-p').append(descriptionp);
			$('.photo-p').css("background-image","url("+background+")");
			$("body").css("overflow","hidden");
			$('.person').show("fast");
			$('.person').animate({
				"left":"0%"
			}, 500);
		}

	});

	//volta para tela de pesquisas
	$('.back').on('click', ()=>{
		$('body').css("overflow","scroll");
		$('.person').animate({
			"left":"-100%"
		}, 500)
	});
	
});

