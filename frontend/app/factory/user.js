piluchoApp.factory("User", function ($http, ezfb, $rootScope){
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

		login: function(callback) {
			var _this = this;
			ezfb.login(function(res) {
				if (res.authResponse) {
					_this.loginBackend({accessToken: res.authResponse.accessToken, userID: res.authResponse.userID}, callback);
				} else if (callback) callback(false);
			}, {scope: 'public_profile, email'});
		},

		logout: function() {
			localStorage.removeItem('session');
			$http.defaults.headers.common.Authorization = undefined;
			this.data = null;
			this.isLogin = false;
			$rootScope.userLogin = false;
		},

		loginBackend: function(data, callback) {
			var _this = this;
			$http.post(baseAPI + 'login', data).then(function(resp) {
				_this.setHeaders(resp.data.token);
				_this.setLocalStorage(resp.data.token);
				_this.isLogin = true;
				_this.fetch(callback);
			});
		},

		setLocalStorage: function(token) {
			localStorage.setItem('session', JSON.stringify(token));
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
