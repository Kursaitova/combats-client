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
var combatID = 'eoHSLl';
fightRequest.onreadystatechange = function () {
    if (fightRequest.readyState !== 4) return;
    // console.log(fightRequest.responseText);

    if (fightRequest.status !== 200) {
        console.log(fightRequest.status + ': ' + fightRequest.statusText);
        console.log(fightRequest.responseText);
    } else {
        fightResponse = JSON.parse(fightRequest.responseText);
        console.log(fightResponse);
        combatID = (fightResponse.combat) ? fightResponse.combat.id : 'eoHSLl';
        console.log(combatID);
    }
}

var btnStartFight = document.querySelector('.btn-start-fight');
btnStartFight.addEventListener('click', function () {
    console.log('btnStartFight clicked');
    fightRequest.open('POST', serverUrl + '/fight', true);
    fightRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    fightRequest.send('user_id=' + encodeURIComponent(localStorage.userToken));
});

var statusRequest = new XMLHttpRequest();
statusRequest.open('GET', serverUrl + '/status?' + 'user_id=' + encodeURIComponent(localStorage.userToken)
    + '&combat_id=' + encodeURIComponent(combatID), true);
statusRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
statusRequest.send();

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
    }
}

