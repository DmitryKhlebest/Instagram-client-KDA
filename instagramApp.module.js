'use strict';

let InstagramApp = angular.module('InstagramApp', ['ngRoute', 'ngResource']);

InstagramApp.run(function($rootScope, $window, $location) {
	$rootScope.authenticated = false;
	connect();

	function connect() {
		let ws = new WebSocket('ws://localhost:3000');
		$rootScope.ws = ws;

		ws.onopen = wsOpen;
		ws.onmessage = wsMessage;
		ws.onclose = wsClose;
		ws.onerror = wsError;
	}

	function wsOpen() {
		//console.log("Open");
		let token = $window.localStorage.getItem('instagram_token');

		if(!token) {
			$location.path('/login');
			if(!$rootScope.$$phase) $rootScope.$apply();
			return;
		}

		let request = {
			command: "cheak_authorization",
			token: token
		};
		console.log("$rootScope.ws", $rootScope.ws);
		console.log("request", request);
		$rootScope.ws.send(JSON.stringify(request));
	}

	function wsMessage(response) {
		response = JSON.parse(response.data);
		console.log("response", response);

		switch(response.command) {

			case "error":
				console.log("response.error", response.error);
				break;

			case "login":
				$rootScope.$emit("loginResponseServer", response);
				break;
				
			case "registration":
				$rootScope.$emit("registrationResponseServer", response);
				break;

            case "cheak_authorization":
                if(response.access) {
                    //personalPage.load();
                    $rootScope.authenticated = true;
                    $rootScope.user = response.user;
                    $rootScope.locationPageUserId = response.user.id;

                    $location.path('/personal_page');
                    if(!$rootScope.$$phase) $rootScope.$apply();
                } else {
                    $rootScope.authenticated = false;
                    $location.path('/login');
                    if(!$rootScope.$$phase) $rootScope.$apply();
                }
                break;

			case "upload_images_from_server":
				if(response.images) {
					$rootScope.$emit("displayImagesOnPersonalPage", response.images);
				} else {
					console.log("response.error", response.error);
				}
				break;

            case "upload_avatar_to_server":
                console.log(response.message);
                $rootScope.user.pathAvatar = response.pathAvatar;
                $location.path('/personal_page');
                if(!$rootScope.$$phase) $rootScope.$apply();
                break;

            case "upload_image_to_server":
                console.log(response.message);

                if(!response.image) return;

                console.log(response.image);

                break;

            case "like_avatar":
                if(response.sign === "+") {
                    $rootScope.user.avatarCountLikes++;
                    $location.path('/personal_page');
                    if(!$rootScope.$$phase) $rootScope.$apply();
                } else if(response.sign === "-") {
                    $rootScope.user.avatarCountLikes--;
                    $location.path('/personal_page');
                    if(!$rootScope.$$phase) $rootScope.$apply();
                } else if(response.message){
                    console.log("message", response.message);
                } else {
                    console.log("sign", response.sign);
                }
                break;

		}			
	}

	function wsClose(e) {
		console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
		setTimeout(function() {
			connect();
		}, 1000);
	}

	function wsError(err) {
		console.error('Socket encountered error: ', err.message, 'Closing socket');
		ws.close();
	}
});
