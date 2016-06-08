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
});
