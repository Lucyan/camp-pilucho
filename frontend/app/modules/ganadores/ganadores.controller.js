piluchoApp.controller("ganadoresController", function ($scope) {
	$scope.sorteos = [
		{
			title: 'PRIMER SORTEO: 12-06-2015',
			ganador: {
				avatar: 'img/galeria/user.png',
				name: 'Leonardo Olivares Montoya'
			}
		},
		{
			title: 'PRIMER SORTEO: 12-06-2015',
			ganador: {
				avatar: 'img/galeria/user.png',
				name: 'Leonardo Olivares Montoya'
			}
		}
	];

	$scope.indexList = 0;

	$scope.setStyle = function() {
		$scope.elementWidth = $('#ganadores .list').width();

		$scope.elementStyle = {
			width: $scope.elementWidth + 'px'
		}
	}
});
