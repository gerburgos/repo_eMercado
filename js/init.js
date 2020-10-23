const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const LIST_URL = "https://api.npoint.io/d320ff9b8570a1f1c8fe";

var alertError = document.getElementById("Error");
var alertErrorPayment = document.getElementById("ErrorPayment");
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


var getJSONData = function (url) {
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
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}
document.addEventListener("DOMContentLoaded", function (e) {
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

function onlyNumber(e, modal, error, sizeE, sizeC) {
    let msgError = `<strong>Warning!</strong>&nbsp;You must write only numbers.`
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
        alertError.innerHTML = msgError;
        alertErrorPayment.innerHTML = msgError;
        $("#" + modal).css("height", sizeE); /* 300 modal-checkout */
        $("#" + error).removeClass("d-none");
    } else {
        $("#" + modal).css("height", sizeC); /* 270 modal-checkout */
        $("#" + error).addClass("d-none");
    }
}

$(document).ready(function () {
    $('#clearbutton').click(function () {
        $('input[type="text"]').val('');
        $("#Error").addClass("d-none");
    });
});

function onlyLetter(e) {
    let msgError = `<strong>Warning!</strong>&nbsp;You must write only letters.`
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letters = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    chrSpecial = "8-37-39-46";

    special_key = false
    for (var i in chrSpecial) {
        if (key == chrSpecial[i]) {
            special_key = true;
            break;
        }
    }

    if (letters.indexOf(tecla) == -1 && !special_key) {
        alertError.innerHTML = msgError;
        $("#modal-checkout").css("height", "300px");
        $("#Error").removeClass("d-none");
        return false;
    } else {
        $("#Error").addClass("d-none");
        $("#modal-checkout").css("height", "270px");
    }
}
function validationInput(e) {
    let msgError = `<strong>Warning!</strong>&nbsp;Incorrect data`
    var cty = document.getElementById("country").value;
    var srt = document.getElementById("street").value;
    var number = document.getElementById("nmb").value;
    var cnr = document.getElementById("corner").value;

    if (cty.trim() === "" || srt.trim() === "" || number.trim() === "" || cnr.trim() === "") {
        e.preventDefault();
        e.stopPropagation();
        alertError.innerHTML = msgError;
        $("#modal-checkout").css("height", "300px")
        $("#Error").removeClass("d-none");
    } else {
        $('#form').modal('hide');
        $("#modal-checkout").css("height", "270px");
    }
}

function validationChecked() {
    let msgError = `<strong>Warning!</strong>&nbsp;Select a payment method`;
    if (!document.querySelector('input[name="payment"]:checked')) {
        alertErrorPayment.innerHTML = msgError;
        $("#ErrorPayment").removeClass("d-none");
        setTimeout(function () { $("#ErrorPayment").addClass("d-none"); }, 3000)
    }
}



function validationMasterCard() {
    let msgSuccess = `<strong>Congratulations!</strong>&nbsp;Purchase made`
    let msgError = "";
    let card = document.getElementById("card-number").value;
    let expDateM = document.getElementById("experiationMonth").value;
    let expDateY = document.getElementById("experiationYear").value;
    let cvv = document.getElementById("CVV").value
    let anio = (new Date).getFullYear();
    if (card.length < 16) {
        msgError = `<strong>Warning!</strong>&nbsp;You must enter a valid card`
        alertErrorPayment.innerHTML = msgError;
        $("#modal-payment").css("height", "470px");
        $("#ErrorPayment").removeClass("d-none");
    } else if (expDateM > 12 || expDateM < 1) {
        msgError = `<strong>Warning!</strong>&nbsp;You must enter a valid month`
        alertErrorPayment.innerHTML = msgError;
        $("#modal-payment").css("height", "470px");
        $("#ErrorPayment").removeClass("d-none");
    } else if (expDateY < anio) {
        msgError = `<strong>Warning!</strong>&nbsp;You must enter a valid year`
        alertErrorPayment.innerHTML = msgError;
        $("#modal-payment").css("height", "470px");
        $("#ErrorPayment").removeClass("d-none");
    } else if(cvv.trim() === "") {
        msgError = `<strong>Warning!</strong>&nbsp;You must enter a CVV/CVC2`
        alertErrorPayment.innerHTML = msgError;
        $("#modal-payment").css("height", "470px");
        $("#ErrorPayment").removeClass("d-none");
    }else {
        document.getElementById("SuccessPayment").innerHTML = msgSuccess;
        $("#modal-payment").css("height", "470px");
        $("#SuccessPayment").removeClass("d-none");
    }
    setTimeout(function () { $("#ErrorPayment").addClass("d-none"); $("#modal-payment").css("height", "400px"); }, 3000);
}
function validationInputPay() {

    let msgErrorPaypal = `<strong>Warning!</strong>&nbsp;You have to put an email`;
    let msgErrorMasterCard = `<strong>Warning!</strong>&nbsp;Incorrect information or invalid fields`;
    let msgErrorWireTransfer = `<strong>Warning!</strong>&nbsp; ID or Account Number is invalid or empty`;
    let payment = document.getElementsByName("payment");
    for (var i = 0; i < payment.length; i++) {
        if (payment[i].checked) {
            var pay = parseInt(payment[i].value);
            if (pay == 0) {
                let card = document.getElementById("card-number").value;
                let expDateM = document.getElementById("experiationMonth").value;
                let expDateY = document.getElementById("experiationYear").value;
                let cvv = document.getElementById("CVV").value;
                if (card.trim() === "" || expDateM.trim() === "" || expDateY.trim() === "" || cvv.trim() === "") {
                    alertErrorPayment.innerHTML = msgErrorMasterCard;
                    $("#ErrorPayment").removeClass("d-none");
                    $("#modal-payment").css("height", "480px");
                    setTimeout(function () { $("#ErrorPayment").addClass("d-none"); $("#modal-payment").css("height", "400px"); }, 3000);
                }
                validationMasterCard();
                  
            } else if (pay == 1) {
                let email = document.getElementById("email_PayPal").value;
                if (email.trim() === "") {
                    alertErrorPayment.innerHTML = msgErrorPaypal;
                    $("#ErrorPayment").removeClass("d-none");
                    $("#modal-payment").css("height", "340px");
                    setTimeout(function () { $("#ErrorPayment").addClass("d-none"); $("#modal-payment").css("height", "300px"); }, 3000);

                }
            } else {
                let ID = document.getElementById("ID").value;
                let accNumber = document.getElementById("accNumber").value;

                if (ID.trim() === "" || accNumber.trim() === "") {
                    alertErrorPayment.innerHTML = msgErrorWireTransfer;
                    $("#ErrorPayment").removeClass("d-none");
                    $("#modal-payment").css("height", "450px");
                    setTimeout(function () { $("#ErrorPayment").addClass("d-none"); $("#modal-payment").css("height", "360px"); }, 3000);

                } else {
                    if (accNumber.length < 14 || accNumber.length > 20) {
                    alertErrorPayment.innerHTML = `<strong>Warning!</strong>&nbsp; Account Number is invalid (Minimum 14 digits)`;
                    $("#ErrorPayment").removeClass("d-none");
                    $("#modal-payment").css("height", "450px");
                    setTimeout(function () { $("#ErrorPayment").addClass("d-none"); $("#modal-payment").css("height", "360px"); }, 3000);
                    }
                }
            }
            break;
        }
    }
}




