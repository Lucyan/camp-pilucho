piluchoApp.controller("ganadoresController", function ($scope, $http) {
	$scope.sorteos = [];

	$scope.indexList = 0;

	$scope.setStyle = function() {
		$scope.elementWidth = $('#ganadores .list').width();

		$scope.elementStyle = {
			width: $scope.elementWidth + 'px'
		}
	}

	$http.get('/api/winners/').then(function(resp) {
		$scope.sorteos = resp.data.winners;
	});

	$scope.openWinner = function($event) {
		$ele = $($event.currentTarget);
		if ($ele.hasClass('fa-plus')) {
			$('.packs-movil .user.open').removeClass('open');
			$('.packs-movil .sorteo i.fa-minus').removeClass('fa-minus').addClass('fa-plus');
			$ele.removeClass('fa-plus').addClass('fa-minus');
			$ele.parent().parent().find('.user').addClass('open');
		} else {
			$ele.removeClass('fa-minus').addClass('fa-plus');
			$ele.parent().parent().find('.user').removeClass('open');
		}
	}
});
