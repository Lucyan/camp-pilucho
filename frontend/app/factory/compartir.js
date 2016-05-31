piluchoApp.factory("Compartir", function ($location){
	var url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

	var interfaz = {

		fb: function(id) {
			var shareURL = url;
			if (id) shareURL += '/ver/' + id;
			console.log(shareURL);
			var urlFacebook = '//www.facebook.com/share.php?u=' + encodeURIComponent(shareURL);
			var popupWindow = window.open(
				urlFacebook,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		},

		tw: function(id) {
			var shareURL = url;
			if (id) shareURL += '/ver/' + id;
			console.log(shareURL);
			var mensaje = encodeURIComponent('Ingresa ahora, dale un grito de apoyo a Chile y participa por fabulosos premios');
			var shareURL = encodeURIComponent(shareURL);

			var urlTwitter = 'https://twitter.com/intent/tweet?text=';
			urlTwitter = urlTwitter + mensaje;
			urlTwitter = urlTwitter +'&url=' + shareURL;
			popupWindow = window.open(
				urlTwitter,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		}
	};

	return interfaz;
});