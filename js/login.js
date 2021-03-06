

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());



    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;


    localStorage.setItem("user", profile.getName());
    localStorage.setItem("img", profile.getImageUrl());

    location.href = "cover.html"


}

function checkLogin() {
    let user = document.getElementById('usr').value;
    let pass = document.getElementById('pwd').value;
    let img = "https://i.imgur.com/mhI5gpf.png"
    if (user.trim() === "" || pass.trim() === "") {
        alert("Comprube sus datos");
    } else {
        localStorage.setItem("img", img);
        localStorage.setItem("user", user);
        location.href = "cover.html";
    }

}

/* Show/hide password */

$(document).ready(function() {
    $('#show').mousedown(function() {
        $('#pwd').removeAttr('type');
        $('#icon').addClass('fa-eye-slash').removeClass('fa-eye');
    });
    $('#show').mouseup(function() {
        $('#pwd').attr('type', 'password');
        $('#icon').addClass('fa-eye').removeClass('fa-eye-slash');
    })
});