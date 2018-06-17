InstagramApp.controller('NavbarCtrl', ['$scope', '$window', '$rootScope', '$location', function($scope, $window, $rootScope, $location) {
	$scope.isAuthenticated = function() {
		//console.log("$rootScope.authenticated", $rootScope.authenticated);
		return $rootScope.authenticated;
	};

	$scope.logout = function() {
		// уведомить сервер о выходе клиента (удалить на сервере сессию)
        let token = localStorage.getItem('instagram_token');
        let request = {
            command: "logout",
            token: token
        };
        console.log("request", request);
        $rootScope.ws.send(JSON.stringify(request));

		$window.localStorage.removeItem('instagram_token');
		$rootScope.authenticated = false;
		delete $rootScope.user;
		$location.path('/login');
		if(!$rootScope.$$phase) $rootScope.$apply();
	};
}]);
