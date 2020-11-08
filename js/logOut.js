function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        designSign();       
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}

function deleteUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('img');
    localStorage.removeItem('Usuario');
}