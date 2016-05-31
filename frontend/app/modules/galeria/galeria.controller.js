piluchoApp.controller("galeriaController", function ($scope, $http, deviceDetector) {
	$scope.listGallery = [];
	$scope.showMore = true;
	$scope.inPlay = false;
	var page = 0;
	$scope.isDesktop = deviceDetector.isDesktop();

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
			$scope.inPlay = true;
			$($event.currentTarget).addClass('playing');

			if (deviceDetector.isDesktop()) {
				var dancer = new Dancer();
				dancer.load({src: $scope.listGallery[i][j].audio});

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
	}


	$scope.success = function () {
        console.log('Copied!');
    };

    $scope.fail = function (err) {
        console.error('Error!', err);
    };
});
