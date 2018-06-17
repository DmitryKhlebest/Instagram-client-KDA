
let LoginCtrl = InstagramApp.controller('LoginCtrl', ['$scope', '$window', '$rootScope', '$location', function($scope, $window, $rootScope, $location) {
	$scope.login = "Дмитрий";
	$scope.password = "1234";

    $scope.clear = function() {
        $scope.login = "";
        $scope.password = "";
    };

    $scope.loginRequestServer = function() {
        let request = {
            command: "login",
            login: $scope.login,
            password: $scope.password
        };

        console.log("request", request);
        $rootScope.ws.send(JSON.stringify(request));
    };

	$scope.registrationRequestServer = function() {
		let request = {
			command: "registration",
			login: $scope.login,
			password: $scope.password
		};

		console.log("request", request);
		$rootScope.ws.send(JSON.stringify(request));
	};

	$rootScope.$on("loginResponseServer", function(e, response) {
		if(response.token) {
			localStorage.setItem('instagram_token', response.token);
			$rootScope.authenticated = true;
			$rootScope.user = response.user;
			$rootScope.locationPageUserId = response.user.id;
			console.log($rootScope);
			$location.path('/personal_page');
			if(!$scope.$$phase) $scope.$apply();
		} else {
            // Вывести ошибку
            let error = document.getElementById('error');
            error.innerText = response.error;
		}
	});

	$rootScope.$on("registrationResponseServer", function(e, response) {
		if(response.token) {
			localStorage.setItem('instagram_token', response.token);
			$rootScope.authenticated = true;
			$rootScope.user = response.user;
			$rootScope.locationPageUserId = response.user.id;
			$location.path('/personal_page');
			if(!$scope.$$phase) $scope.$apply();
		} else {
            // Вывести ошибку
            let error = document.getElementById('error');
            error.innerText = response.error;
		}
	});


	/*$scope.uploadImageToServer = function() {
		let image = $scope.image;
		console.log(image);

		var reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = function() {
			let imageBase64 = this.result;
			//let token = localStorage.getItem('instagram_token');
			let request = {
				command: "upload_avatar_to_server_test",
				//token: token,
				imageName: image.name,
				imageBase64: imageBase64
			};
			console.log('Image into base64:', imageBase64);
			//ws.send(JSON.stringify(request));

			let newImage = document.createElement('img');
			newImage.src = imageBase64;
			document.getElementById("imgTest").innerHTML = newImage.outerHTML;
		}
	}*/

	$scope.file_changed = function(element) {
        var image = element.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            $scope.$apply(function() {
                let imageBase64 = e.target.result;

                let request = {
					command: "upload_avatar_to_server_test",
					//token: token,
					imageName: image.name,
					imageBase64: imageBase64
				};
				console.log('Image into base64:', imageBase64);
				$rootScope.ws.send(JSON.stringify(request));

				let newImage = document.createElement('img');
				newImage.src = imageBase64;
				document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            });
        };
        
        reader.readAsDataURL(image);
	};


	/*let someFun = function() {
		let image = $scope.image;
		console.log(image);
	}

	$scope.$watch('image', someFun);*/



	/*$scope.instagramLogin = function() {
		$auth.authenticate('instagram')
			.then(function(response) {
				$window.localStorage.currentUser = JSON.stringify(response.data.user);
				$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
			})
			.catch(function(response) {
				console.log(response.data);
			});
	};

	$scope.emailLogin = function() {
		$auth.login({ email: $scope.email, password: $scope.password})
			.then(function(response) {
				$window.localStorage.currentUser = JSON.stringify(response.data.user);
				$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
			})
			.catch(function(response) {
				$scope.errorMessage = {};
				angular.forEach(response.data.message, function(message, field) {
					$scope.loginForm[field].$setValidity('server', false);
					$scope.errorMessage[field] = response.data.message[field];
				});
			});
	};*/
}]);