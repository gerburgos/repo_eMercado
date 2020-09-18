const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const LIST_URL = "https://api.npoint.io/d320ff9b8570a1f1c8fe";



function setUser() {

    var user = localStorage.getItem("user");
    var img = document.getElementById("profilePic");
    if (user == null) {
        errUser();
    } else {
        document.getElementById("dropdownMenuLink").innerHTML = user;
        img.src = localStorage.getItem("img");
    }
}


var getJSONData = function(url) {
    var result = {};
    //Cambiamos el fetchh por fetch, además de agregar url 
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                //Pusimos Error con minuscula 
                throw error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}
document.addEventListener("DOMContentLoaded", function(e) {
    setUser();
    onLoad();
});

function sendEmail() {
    var message = document.querySelector('#msg').value;
    var mail = document.querySelector('#email').value;
    var subj = document.querySelector('#subject').value;
    window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=' + subj + '&to=' + mail + '&body=' + message + '');
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        includedLanguages: 'en,es,it,de,fr,pt,zh,ru,ja'
    }, 'google_translate_element');
    $("#google_translate_element img").remove();
    $("#google_translate_element span").text('Seleccionar Idioma 🌎');
    $("#google_translate_element div").css('border-radius', '50px');
    $("#google_translate_element div").css('background', '#dd1818');
    $("#google_translate_element div").css('color', 'white');
    $("#google_translate_element div").css('font-family', 'Raleway');
    $("#google_translate_element div").css('padding', '3px');

}