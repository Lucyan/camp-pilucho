piluchoAdminAPP.factory("User", function ($http, $rootScope){
	var baseAPI = '/api/user/';

	var interfaz = {
		data: null,
		isLogin: false,

		fetch: function(callback) {
			if (this.isLogin) {
				var _this = this;
				$http.get(baseAPI + 'me').then(function(resp) {
					_this.data = resp.data;
					$rootScope.userLogin = true;
					if (callback) callback();
				});
			}

			return this;
		},

		getLocalStorage: function() {
			var token = JSON.parse(localStorage.getItem('session'));
			if (token) return token;
			return false;
		},

		setHeaders: function(token) {
			$http.defaults.headers.common.Authorization = token;
		},

		checkSession: function(callback) {
			var token = this.getLocalStorage();
			if (token) {
				this.setHeaders(token);
				this.isLogin = true;
				if (callback) callback(true);
			} else {
				if (callback) callback(false);
			}
		}
	}
	return interfaz;
});
