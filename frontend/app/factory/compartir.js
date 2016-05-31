piluchoApp.factory("Compartir", function ($location){
	var interfaz = {

		fb: function() {
			var urlFacebook = '//www.facebook.com/share.php?' + $location.absUrl();
			var popupWindow = window.open(
				urlFacebook,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		},

		tw: function() {
			var mensaje = encodeURIComponent('Ingresa ahora, dale un grito de apoyo a Chile y participa por fabulosos premios');
			var url = encodeURIComponent($location.absUrl());

			var urlTwitter = 'https://twitter.com/intent/tweet?text=';
			urlTwitter = urlTwitter + mensaje;
			urlTwitter = urlTwitter +'&url=' + url;
			popupWindow = window.open(
				urlTwitter,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		}
	};

	return interfaz;
});