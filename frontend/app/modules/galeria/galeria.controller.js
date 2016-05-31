piluchoApp.controller("galeriaController", function ($scope, $http, deviceDetector, $routeParams) {
	$scope.listGallery = [];
	$scope.showMore = true;
	$scope.inPlay = false;
	var page = 0;
	$scope.isDesktop = deviceDetector.isDesktop();

	if ($routeParams.recordID != undefined) {
		$http.get('/api/galeria/get?id=' + $routeParams.recordID).then(function(resp) {
			if (resp.data.record) {
				$scope.dataSingle = resp.data;
				$scope.viewSingle = true;
			}
		});
	}

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

	$scope.sound = null;

	$scope.playRecord = function($event, i, j) {
		if (!$scope.inPlay) {
			var src = j;
			if (i != null) src = $scope.listGallery[i][j].audio;

			$scope.inPlay = true;
			$($event.currentTarget).addClass('playing');

			if (deviceDetector.isDesktop()) {
				var dancer = new Dancer();
				dancer.load({src: src});

				var max = 0;
				var actualClase = '';

				dancer.after(0.1, function() {
					var frequency = this.getFrequency( 100 ) * 10000;
					if (frequency > 0) {
						frequency = Math.round(frequency);
						if (max < frequency && frequency < 50) max = frequency;
						var middle = max / 3;

						var clase = '';
						if (frequency > middle) {
							clase = 'open';
						}

						if (actualClase != clase) {
							$($event.currentTarget).parent().parent().find('.boca').removeClass(actualClase).addClass(clase);
							actualClase = clase;
						}
					} else {
						dancer.pause();
						$($event.currentTarget).removeClass('playing');
						$scope.inPlay = false;
						$scope.$apply();
						dancer.audioAdapter.context.close();
					}
				});

				dancer.play();
			} else {
				var sound = new Howl({
					src: [src],
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
	}

    $scope.closeSingle = function() {
    	$scope.viewSingle = false;
    }
});
