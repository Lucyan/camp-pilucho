piluchoAdminAPP.controller("sorteosController", function ($scope, $http, $uibModal, $log) {

	$scope.openPackSorteo = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/modules/sorteos/modal.template.html',
			controller: 'sorteosModalController',
			size: 'lg'
		});

		modalInstance.result.then(function (resp) {
				$log.debug(resp);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});
	}

	$scope.packList = [];

	$scope.getPacks = function(page) {
		if (page == undefined) page = 0;

		$http.get('/api/admin/packs?page=' + page).then(function(resp) {
			if (resp.data.length > 0) {
				for (key in resp.data) {
					$scope.packList.push(resp.data[key]);
				}
			} else
				$scope.haymas = false;
		});
	}

	$scope.getPacks();

	$scope.toggleActive = function(i) {
		$http.post('/api/admin/toogleactivepack', {id: $scope.packList[i].id}).then(function(resp) {
			$scope.packList[i].active = resp.data.active;
		});
	}


});
