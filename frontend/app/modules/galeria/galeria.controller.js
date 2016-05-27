piluchoApp.controller("galeriaController", function ($scope, $http) {
	$scope.listGallery = [];
	$scope.showMore = true;
	$scope.inPlay = false;
	var page = 0;

	$scope.fetchGallery = function(page) {
		if (page == undefined) page = 0;
		$http.get('/api/galeria/?page=' + page).then(function(resp) {
			if (resp.data.length > 0) {
				for (page in resp.data) {
					$scope.listGallery.push(resp.data[page]);
				}
			} else {
				$scope.showMore = false;
			}
		});
	}

	$scope.fetchGallery(page);


	$scope.getMore = function() {
		page++;
		$scope.fetchGallery(page);
	}

	$scope.playRecord = function($event, i, j) {
		if (!$scope.inPlay) {
			$scope.inPlay = true;
			$($event.currentTarget).addClass('playing');

			var sound = new Howl({
				src: [$scope.listGallery[i][j].audio],
				autoplay: true,
				onend: function() {
					$($event.currentTarget).removeClass('playing');
					$scope.inPlay = false;
					$scope.$apply();
					sound.unload();
				}
			});
		}
	}
});
