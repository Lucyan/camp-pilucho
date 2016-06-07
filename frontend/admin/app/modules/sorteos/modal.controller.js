piluchoAdminAPP.controller("sorteosModalController", function ($scope, $http, $uibModalInstance) {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	$scope.fechaSorteo = dd + '/' + mm + '/' + yyyy;

	$scope.haymas = true;
	$scope.userList = [];
	$scope.userListPage = 0;
	var page = 0;

	$scope.getUsers = function(page) {
		if (page == undefined) page = 0;

		$http.get('/api/admin/galeria?active=1&page=' + page).then(function(resp) {
			if (resp.data.length > 0) {
				for (key in resp.data) {
					$scope.userList.push(resp.data[key]);
				}
			} else
				$scope.haymas = false;
		});
	}

	$scope.getUsers(0);

	$scope.cargarMas = function() {
		page++;
		$scope.getUsers(page);
	}

	$scope.markWinner = function(i) {
		$http.post('/api/admin/markwinner', { id: $scope.userList[i].id }).then(function(resp) {
			$uibModalInstance.close(resp.data);
		});
	}
});
