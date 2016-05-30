piluchoApp.controller("recordDektopController", function ($scope, User, $rootScope, deviceDetector) {
	var mediaConstraints = {
		audio: true
	};

	var audioSRC = null;
	var playBackTimeID = null;

	restart();

	$scope.mediaRecorder = false;
	if (deviceDetector.os != 'ios') navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

	function onMediaSuccess(stream) {
	    $scope.mediaRecorder = new MediaStreamRecorder(stream);
	    $scope.mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
	    $scope.mediaRecorder.ondataavailable = function (blob) {
	    	if (playBackTimeID != null) clearInterval(playBackTimeID);
	    	$scope.onUpoad = true;
	    	$scope.onRecord = false;

	    	var fileType = 'audio'; // or "audio"
			var fileName = 'record-' + new Date().getTime() + '.wav';  // or "wav" or "ogg"

	    	var formData = new FormData();
	    	formData.append(fileType + '-filename', fileName);
	    	formData.append(fileType + '-blob', blob);

	    	User.saveAudio(formData, function(resp) {
	    		$scope.backSRC = resp.url;
	    		$scope.setAudioPlay(resp.url)
	    		audioSRC = resp.url;
	    		$scope.onData = true;
	    		$scope.onUpoad = false;
	    	});
	    };
	}

	function onMediaError(e) {
	    console.error('media error', e);
	}

	$scope.record = function() {
		if (deviceDetector.os == 'ios') {
			$('#record .ios-form input').click();
			return false;
		}
		if ($scope.mediaRecorder && !$scope.onPlay) {
			$scope.mediaRecorder.start(15 * 1000);
			$scope.recorCount = 0;
			$scope.onRecord = true;
			$scope.onData = false;
			$scope.onPlay = false;
			if (playBackTimeID != null) clearInterval(playBackTimeID);
			playBackTimeID = setInterval(function() {
				$scope.recorCount++;
				$scope.$apply();
			}, 1000);
		}
	}

	$scope.iOSSaveFile = function() {
		var oFile = document.getElementById('video_file').files[0];

		// filter for image files
		var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
		if (rFilter.test(oFile.type)) {
			alert('El archivo seleccionado no es un video');
			return;
		}


		$scope.onUpoad = true;

		var videoName = 'record-' + new Date().getTime() + '.MOV';
		var audioName = 'record-' + new Date().getTime() + '.wav';
		var formData = new FormData($('#record .ios-form')[0]);
		formData.append('audio-filename', audioName);
		formData.append('video-filename', videoName);

		User.saveAudio(formData, function(resp, msg) {
			if (resp) {
				$scope.backSRC = resp.url;
				$scope.setAudioPlay(resp.url)
				audioSRC = resp.url;
				$scope.onData = true;
			} else {
				alert(msg);
			}

			$scope.onUpoad = false;
    	});
	}

	$scope.stop = function() {
		if ($scope.mediaRecorder) {
			$scope.mediaRecorder.stop();
		}
	}

	var dancer = null;

	$scope.setAudioPlay = function(src) {
		if (deviceDetector.isDesktop()) {
			dancer = new Dancer();
			dancer.load({src: src});

			var max = 0;
			var actualClase = '';

			dancer.after(0.1, function() {
				var frequency = this.getFrequency( 100 ) * 10000;
				if (frequency > 0) {
					$scope.timePlayback = Math.floor(dancer.getTime());
					$scope.$apply()
					frequency = Math.round(frequency);
					if (max < frequency && frequency < 50) max = frequency;
					var middle = max / 3;

					var clase = '';
					if (frequency > middle) {
						clase = 'open';
					}

					if (actualClase != clase) {
						$('#record .pilucho-content .boca').removeClass(actualClase).addClass(clase);
						actualClase = clase;
					}
				} else {
					dancer.pause();
					$scope.onPlay = false;
					$scope.$apply();
					dancer.audioAdapter.context.close();
				}
			});
		} else {
			if ($scope.sound) $scope.sound.unload();

			$scope.sound = new Howl({
				src: [src],
				onend: function() {
					$scope.onPlay = false;
					$scope.clearPlayer();
					$scope.$apply();
				},
				onload: function() {
					$scope.$apply();
				},
				onplay: function() {
					$scope.timePlayback = 0;
					$scope.onPlay = true;
					$scope.setPlayer();
					$scope.$apply();
				}
			});
		}
	}

	$scope.play = function() {
		if (deviceDetector.isDesktop()) {
			$scope.setAudioPlay($scope.backSRC);
			$scope.timePlayback = 0;
			$scope.onPlay = true;
			dancer.play();
		} else if ($scope.sound) {
			$scope.sound.play();
		}
	}

	$scope.setPlayer = function() {
		if (playBackTimeID != null) clearInterval(playBackTimeID);
		playBackTimeID = setInterval(function() {
			$scope.timePlayback = Math.floor($scope.sound.seek());
			$scope.$apply();
		}, 100);
	}

	$scope.clearPlayer = function() {
		if (playBackTimeID != null) clearInterval(playBackTimeID);
	}


	$scope.close = function() {
		$rootScope.userRecord = false;
		restart();
	}

	$scope.saveRecord = function() {
		$scope.onSave = true;
		if ($scope.onData && !$scope.onRecord && audioSRC) {
			User.saveRecord(audioSRC, function(resp) {
				$scope.movilClose = 'Cerrar';
				$scope.showFinal = true;
			});
		}
	}

	function restart() {
		$scope.onRecord = false;
		$scope.onData = false;
		$scope.onPlay = false;
		$scope.onUpoad = false;
		$scope.onSave = false;
		$scope.timePlayback = 0;
		$scope.recorCount = 0;
		$scope.showFinal = false;

		audioSRC = null;
		playBackTimeID = null;
		
		if ($scope.sound) {
			$scope.sound.unload();
			$scope.sound = null;
		}

		$scope.movilClose = 'Cancelar';
	}
});
