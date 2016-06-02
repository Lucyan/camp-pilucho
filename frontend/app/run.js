piluchoApp.run(function (User, preloader, $rootScope){

	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch();
		}
	});

	Dancer.setOptions({
		flashJS  : 'lib/lialosiu-dancer/lib/soundmanager2.js',
		flashSWF : 'lib/lialosiu-dancer/lib/soundmanager2.swf'
	});

	$rootScope.pageLoader = true;
	var imageList = [
		'/img/agegate/bg.jpg',
		'/img/agegate/movil/bg.jpg',
		'/img/bg.png',
		'/img/boca.png',
		'/img/footer/hinchas.png',
		'/img/footer/logo.png',
		'/img/galeria/facebook.png',
		'/img/galeria/link.png',
		'/img/galeria/mas.png',
		'/img/galeria/movil/pilucho.gif',
		'/img/galeria/movil/pilucho.jpg',
		'/img/galeria/movil/separador.png',
		'/img/galeria/play.png',
		'/img/galeria/player.png',
		'/img/galeria/separador-bottom.png',
		'/img/galeria/separador.png',
		'/img/galeria/title.png',
		'/img/galeria/twitter.png',
		'/img/galeria/user.png',
		'/img/ganadores/arrow-left.png',
		'/img/ganadores/arrow-right.png',
		'/img/ganadores/bg-packs.png',
		'/img/ganadores/bg-super.png',
		'/img/ganadores/bg.png',
		'/img/ganadores/movil/bg-packs.png',
		'/img/ganadores/movil/bg-super.png',
		'/img/ganadores/movil/title.png',
		'/img/ganadores/separador.png',
		'/img/ganadores/title.png',
		'/img/home/bg.jpg',
		'/img/home/llamado.png',
		'/img/home/movil/pilucho.png',
		'/img/home/pilucho.png',
		'/img/home/separador.png',
		'/img/kit/botella.png',
		'/img/kit/challa.png',
		'/img/kit/item1.png',
		'/img/kit/item2.png',
		'/img/kit/item3.png',
		'/img/kit/logo.png',
		'/img/menu/logo.png',
		'/img/menu/movil/facebook.png',
		'/img/menu/movil/galeria.png',
		'/img/menu/movil/ganadores.png',
		'/img/menu/movil/home.png',
		'/img/menu/movil/kit.png',
		'/img/menu/movil/menu-movil.png',
		'/img/menu/movil/premios.png',
		'/img/menu/movil/twitter.png',
		'/img/menu/movil/user.png',
		'/img/menu/movil/youtube.png',
		'/img/menu/user.png',
		'/img/premios/premio1.png',
		'/img/premios/premio2.png',
		'/img/premios/separador.png',
		'/img/premios/title.png',
		'/img/record/desktop/btn-enviar.png',
		'/img/record/desktop/btn-play.png',
		'/img/record/desktop/btn-record.png',
		'/img/record/desktop/btn-stop.png',
		'/img/record/desktop/close.png',
		'/img/record/desktop/pilucho.png',
		'/img/record/desktop/title.png',
		'/img/record/final/facebook.png',
		'/img/record/final/link.png',
		'/img/record/final/logo.png',
		'/img/record/final/twitter.png',
		'/img/redes/facebook.png',
		'/img/redes/twitter.png',
		'/img/redes/youtube.png',
		'/img/velo.png'
	];

	preloader.loadSet(imageList, function() {
		setTimeout(function() {
			$rootScope.pageLoader = false;
			$rootScope.$apply();
		}, 1000)
	});

});
