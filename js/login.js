var serverUrl = 'http://localhost:3333';
var xhr = new XMLHttpRequest();

document.querySelector('.register').addEventListener('click', function(event) {
	event.preventDefault();
	log = document.querySelector('input');
	var logval = log.value;
	
	var body = 'username=' + logval;
	xhr.open('POST', serverUrl + '/register', true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {		
	    if(xhr.readyState == 4 && xhr.status == 200) {
	    	var data = JSON.parse(xhr.responseText);
	    	if(data.status === 'ok') {
	    		localStorage.setItem('userToken',data.user.id);
	    		localStorage.setItem('username',data.user.username);
	    	} else {
	    		document.querySelector('.login-info').textContent = "Такой пользователь уже есть";
	    	}
	    }
	}
	xhr.send(body);
});

document.querySelector('.login').addEventListener('click', function(event) {
	event.preventDefault();

	if(localStorage.getItem('username')) {
		var user_id = localStorage.getItem('userToken');
		
		var body = 'user_id=' + user_id;
		xhr.open('POST', serverUrl + '/login', true);

		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {		
		    if(xhr.readyState == 4 && xhr.status == 200) {
	    		var data = JSON.parse(xhr.responseText);
		    	if(data.status !== 'error') {
	    			window.location.replace("fight.html");
		    	} else {
		    		if(data.message === 500) {
		    			console.log('Не удалось залогиниться.');
		    		} else {
		    			console.log('Пользователь не существует.');
		    		}
		    	}
		    }
		    
		}
		xhr.send(body);	
	} else {
		console.log('Вы не зарегистрированы.');
	}
});

document.querySelector('.is-your-login-yes').addEventListener('click', function() {

});