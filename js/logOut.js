function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        designSign();
        deleteUser();
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}

function deleteUser() {
    location.href = "https://gerburgos.github.io/repo_eMercado/index.htmnl"
    localStorage.removeItem('user');
    localStorage.removeItem('img');
}
