
InstagramApp.controller('PersonalPageCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.isMyPage = function() {
        return $rootScope.locationPageUserId === ($rootScope.user && $rootScope.user.id);
	};

	$scope.uploadImagesFromServer = function() {
		let token = localStorage.getItem('instagram_token');

		let request = {
			command: "upload_images_from_server",
			token: token
		};
		console.log("request", request);

		$rootScope.ws.send(JSON.stringify(request));
	};

	$scope.uploadImagesFromServer();

	let i = 0;
	$rootScope.$on("displayImagesOnPersonalPage", function(e, images) {
	    console.log(++i);
		//console.log("$scope.images", $scope.images);
		$scope.images = images;
		console.log("$scope.images", $scope.images);

		/*for(image of images) {
			$scope.displayImageOnPersonalPage(image);
		}*/
	});

	/*$scope.displayImageOnPersonalPage = function() {

	}*/

    $scope.uploadAvatar = function() {
        document.getElementById('uploadAvatar').click();
    };

    $scope.uploadAvatarToServer = function(image) {
        $scope.uploadImageOrAvatarToServer(image, "avatar");
    };

    $scope.likeAvatar = function() {
        let token = localStorage.getItem('instagram_token');
        let idOwnerAvatar = $rootScope.locationPageUserId;

        let request = {
            command: "like_avatar",
            token: token,
            idOwnerAvatar: idOwnerAvatar
        };
        console.log("request", request);

        $rootScope.ws.send(JSON.stringify(request));
    };

    $scope.uploadImages = function() {
        document.getElementById('uploadImages').click();
    };

    $scope.uploadImagesToServer = function(images) {
        for(let image of images)
            $scope.uploadImageOrAvatarToServer(image, "picture");
    };

    $scope.uploadImageOrAvatarToServer = function(image, type) {
        //console.log(image);
        let reader = new FileReader();

        reader.onloadend = function() {
            let imageBase64 = this.result;
            let token = localStorage.getItem('instagram_token');

            let request = {
                command: "upload_image_or_avatar_to_server",
                token: token,
                imageName: image.name,
                imageType: type,
                imageBase64: imageBase64
            };
            console.log("request", request);
            $rootScope.ws.send(JSON.stringify(request));
        };

        reader.readAsDataURL(image);
    };





}]);