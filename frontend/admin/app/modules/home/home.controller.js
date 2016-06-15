piluchoAdminAPP.controller("homeController", function ($scope, $http) {
	var page = 0;
	$scope.openview = false;
	$scope.haymas = true;
	$scope.galleryList = [];

	$scope.getGaleria = function(page) {
		if (page == undefined) page = 0;

		$http.get('/api/admin/galeria?page=' + page).then(function(resp) {
			if (resp.data.length > 0) {
				for (key in resp.data) {
					$scope.galleryList.push(resp.data[key]);
				}

				$scope.openview = true;
			} else
				$scope.haymas = false;
		});
	}

	$scope.getGaleria();
  	

	$scope.toggleActive = function(i) {
		$http.post('/api/admin/toogleactive', {id: $scope.galleryList[i].id}).then(function(resp) {
			$scope.galleryList[i].active = resp.data.active;
		});
	}

	$scope.cargarMas = function() {
		page++;
		$scope.getGaleria(page);
	}

	$scope.clearFiles = function() {
		if(confirm('¿Estas seguro que quieres limpiar los archivos de audio no resgistrados del servidor?')) {
			$http.get('/api/admin/clearwav').then(function(resp) {
				alert('Se han eliminado ' + resp.data.count + ' archivos no registrados en el servidor');
			});
		}
	}
});
