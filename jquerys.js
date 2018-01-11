window.$ = window.jQuery = require('jquery');

//on document ready...

$(function(){
	//creation phase adding new elements to html and adding text content to it.
	(function creation(){
		
		$('article').prepend('<center></center>');
		$('<h2></h2>').insertBefore('center').addClass('head').prop('id', 'initial');
		$('center').html('<img/>');
		$('img').attr({
			 id: 'load', src: 'img/loading.gif'
		}).css("display","none");
		$('<button id="options" class="tooltip">Click Here to Get Fresh Content<span class="tooltiptext">Reload Content from Server!</span></button>').addClass('button').css("display","none").insertAfter('header');
		$('header').text("Good "+wish()+"Welcome to JSHOTS!!");
		$('footer').text("JSHOTS Created by Syed Umair");
		$('#initial').text("Click on a topic in the sidebar to read articles about it or use Command+Tab or Control+Tab to browse through the first topic in sidebar.");

		function wish(){
			let now = new Date;
			now = now.getHours();
			if(now < 12){
				return 'Morning!';
			}
			else if(now == 12){
				return 'Noon!';
			}
			else
				return 'Evening!';
		}

	})();
	
	(function settingEvents(){
		$('li').on({
			mouseenter: function(event) {
							event.target.style.color = 'Red';},
			mouseleave: function(event) {
				event.target.style.color = 'black';},
			click: sidebarHandler

		});
		$("main").hover(
			function(){
		        $(this).css("background-color", "#f6f6f6");
		    },
		    function(){
		        $(this).css("background-color", "#ffffff");
			});
		$("button").click(function(event) {
			$(this).hide();
			let id = $(event.target).prop('context');
			console.log(id);
			$('p#'+id+" ,p#error").remove();
			initiate_ajax(id);
		});
	})();

});

function sidebarHandler(event){
	$("li").show();
	$(event.target).hide();
	$('p, h2, #tryAgain, #options').hide();
	initiate_ajax($(event.target).text());
}

function initiate_ajax(id){
	if($('p#'+id)[0] === undefined){
		$.ajax('http://localhost:3000/?content='+id,{
			type: 'GET',
			beforeSend: function(){
				$('#load').toggle();
				$('li').off('click');
				console.log('initiated ajax');
			},
			dataType: 'JSON',
			error: function(xhr,status,error){
				$('#load').toggle();
				if($('p#error')[0] === undefined)
					$('<p id=error>'+error+' '+xhr.statusText+'.</p>').appendTo('article');
				else
					$('#error').show();
				$( 'li' ).on('click',sidebarHandler);
			},
			success: function(result,status,xhr){
				setTimeout(()=>{
				$('#load').toggle();
				$('h2#initial').text(id).show();
				$('<p id='+id+'>'+result[id]+'</p>').appendTo('article');
				$( 'li' ).on('click',sidebarHandler);
				},1200);
			},
		})
	}
	else{
		$('h2#initial').text(id).show();
		$('p#'+id).show();
	}
	$('#options').prop('context', id).show(100);
}