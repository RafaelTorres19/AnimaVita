class Pesquisa {
	constructor(){
		this.search();
	}

	search(name, i){
		$.ajax({
			url:"https://kitsu.io/api/edge/characters?filter[name]="+name+"",
			dataType:"json",
			success: function(data){

				let person = data.data[0];
				console.log(person);
					//caso não exista o personagem pesquisado, mostra aviso.
					if (person.length === 0 ) {
						$('.sad').fadeIn();
						window.setTimeout(()=>{
							$('.sad').fadeOut();
						}, 4000);
					}else{
						//caso tenha personagem, cria cards com nomes parecidos.
								
								//cria apenas cards que tenham imagens na API kitsu
								if (data.data[0].attributes.image === null){


									
								}else{

									let canonicalName = data.data[0].attributes.canonicalName;
									let description = data.data[0].attributes.description;
									let another_names = data.data[0].attributes.otherNames

									$('.cards').append("<div class='card card"+i+"'><div class='arrow'><i class='fa fa-angle-up'></i></div><div class='descriptions'><p class='name'>"+canonicalName+"</p><div class='limit'><p class='description'>"+description+"</p></div><p class='another_names'>"+another_names+"</p></div></div>");
									$('.card'+i).css("background-image", "url("+data.data[0].attributes.image.original+")");
								}
					}
				
			},
			//caso retorne algum erro da requisição.
			error: function(erro){
				console.log(erro);
			}
		});
	}

}

