var serverUrl = 'http://localhost:3333';
localStorage.setItem('userToken', 'yS8aUb');

var listRequest = new XMLHttpRequest();
listRequest.open('GET', serverUrl + '/online', true);
listRequest.send();

var listResponse;
listRequest.onreadystatechange = function () {
    if (listRequest.readyState !== 4) return;
    //console.log(listRequest.responseText);

    if (listRequest.status !== 200) {
        console.log(listRequest.status + ': ' + listRequest.statusText);
    } else {
        listResponse = JSON.parse(listRequest.responseText);
        console.log(listResponse);

        var onlineList = document.querySelector('.online-list');
        listResponse.users.forEach(function (element) {
            var newLi = document.createElement('li');
            newLi.textContent = element.username;
            onlineList.appendChild(newLi);
        });
    }

}

var fightRequest = new XMLHttpRequest();

var fightResponse;
// var combatId= 'eoHSLl';
var combatId;
var checkStatus;
var statusRequest = new XMLHttpRequest();
var waitPrompt = document.querySelector('.wait-prompt');
fightRequest.onreadystatechange = function () {
    if (fightRequest.readyState !== 4) return;
    // console.log(fightRequest.responseText);

    if (fightRequest.status !== 200) {
        console.log(fightRequest.status + ': ' + fightRequest.statusText);
        console.log(fightRequest.responseText);
    } else {
        fightResponse = JSON.parse(fightRequest.responseText);
        console.log(fightResponse);
        // combatId = (fightResponse.combat) ? fightResponse.combat.id : 'eoHSLl';
        combatId = fightResponse.combat.id;
        console.log(combatId);
        
        waitPrompt.textContent = 'Ждем второго игрока';

        checkStatus = setInterval(function () {
            statusRequest.open('GET', serverUrl + '/status?' + 'user_id=' + encodeURIComponent(localStorage.userToken)
                + '&combat_id=' + encodeURIComponent(combatId), true);
            statusRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            statusRequest.send();
        }, 300);
    }
}

var statusResponse;
statusRequest.onreadystatechange = function () {
    if (statusRequest.readyState !== 4) return;
    //console.log(statusRequest.responseText);

    if (statusRequest.status !== 200) {
        console.log(statusRequest.status + ': ' + statusRequest.statusText);
        console.log(statusRequest.responseText);
    } else {
        statusResponse = JSON.parse(statusRequest.responseText);
        console.log(statusResponse);

        if(statusResponse.combat.status === 'progress'){
            console.log('Game started!');
            clearTimeout(checkStatus);
            waitPrompt.textContent = 'Дождались!';
        }
    }
}

var btnStartFight = document.querySelector('.btn-start-fight');
btnStartFight.addEventListener('click', function () {
    console.log('btnStartFight clicked');
    fightRequest.open('POST', serverUrl + '/fight', true);
    fightRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    fightRequest.send('user_id=' + encodeURIComponent(localStorage.userToken));
});

