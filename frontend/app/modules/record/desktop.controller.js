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

	$scope.stop = function() {
		if ($scope.mediaRecorder) {
			$scope.mediaRecorder.stop();
		}
	}

	$scope.setAudioPlay = function(src) {
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

	$scope.play = function() {
		if ($scope.sound) {
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
