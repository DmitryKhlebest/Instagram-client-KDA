
let ws;
connect();

function connect() {
	ws = new WebSocket('ws://localhost:3000');
	ws.onopen = wsOpen;
	ws.onmessage = wsMessage;
	ws.onclose = wsClose;
	ws.onerror = wsError;

	//console.log(ws);
}

function wsOpen() {
	//console.log("Open");
}

function wsMessage(response) {
	let data = JSON.parse(response.data);
	console.log(data);

	switch(data.command) {

		case "error":
			console.log(data.error);
			break;

		case "login":
			if(data.token) {
				let user = {
					userId: data.userId,
					username: data.username,
					avatarName: data.avatarName,
					avatarNumberLikes: data.avatarNumberLikes,
					locationPageId: data.userId
				};

				let token = data.token;
				ws.user = user
				//let userId = data.userId;
				console.log(token);
				localStorage.setItem('instagram_token', token);
				//localStorage.setItem('instagram_user_id', userId);
				localStorage.setItem('instagram_user', JSON.stringify(user));
				
				window.location.href = `/${user.userId}/personal_page.html`;
			} else {
				let error = document.getElementById("error");
				error.innerText = "   " + data.error;
			}
			break;

		case "upload_images_from_server":
			let images = data.images;
			console.log(images);
			personalPage.displayImagesOnPage(images);
			break;

		case "upload_avatar_to_server":
			console.log(data.message);
			let user = JSON.parse(localStorage.getItem('instagram_user'));
			window.location.href = `/${user.userId}/personal_page.html`;
			break;

		case "cheak_authorization":
			if(data.access) {
				personalPage.load();
			} else {
				window.location.href = "/authorization.html";
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

