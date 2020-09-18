var productRelArray = [];
var productsRel = "";
var productInfoArray = [];
var opinionsArray = [];
var numberOfStars = 0;
var comments = '';
var valArea = undefined;
var user = localStorage.getItem("user");
var imgUser = localStorage.getItem("img");

function showCommentUser() {
    valArea = document.getElementById('txtAreaUser').value;
    if (valArea.trim() != "") {
        Swal.fire({
            title: "Comment posted successfully",
            text: "Thanks you for giving your feedback about the product!",
            icon: "success",
            backdrop: true,
            timer: 4000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: true,
        });
        comments += ` 
        <li class="media">
        <a href="#" class="pull-left">
            <img src="${imgUser}" alt="" class="img-circle">
        </a>
        <div class="media-body">
            <span class="text-muted pull-right">
            <strong style="color: blue;">${user}</strong>
            </span>
            <small class="text-muted" style="margin-left:5px;">${nowDate()}</small>
            <p>
                ${valArea}
            </p>                               
    `
        switch (numberOfStars) {
            case 1:
                comments += `<span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>            
            </li>  
            `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
                break;
            case 2:
                comments += `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>            
            </li>  
            `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
                break;
            case 3:
                comments += `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>            
            </li>  
            `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
                break;
            case 4:
                comments += `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                </div>            
                </li>  
                `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
                break;
            case 5:
                comments += `<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    </div>            
                    </li>  
                    `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
                break;
            default:
                comments += `<span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>            
            </li>  
            `
                document.getElementById('sectionComments').innerHTML = comments;
                document.getElementById('txtAreaUser').value = "";
        }

    } else {
        Swal.fire({
            title: "Incorrect Data",
            text: "Wrong data, enter correct data",
            icon: "error",
            backdrop: true,
            timer: 4000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: false
        });
    }
}

function showProductSelected(array, arrayComments, arrayRel) {
    let result = '';
    let imgs = '';
    result += `<div>
         <h2>  ${productInfoArray.name} </h2>
         <hr style="border: 2px solid lightgrey;">
         <p> ${productInfoArray.description} </p>    
         <p><strong>${productInfoArray.cost} ${productInfoArray.currency}</strong></p>
         <p><strong>${productInfoArray.soldCount} Sold </strong></p>
         <hr style="border: 2px solid lightgrey;">
         <br>
    </div> 
    `
    document.getElementById('contents').innerHTML = result;

    for (let i = 0; i < productInfoArray.images.length; i++) {
        imgs += '<img class="img-gallery" src="' + productInfoArray.images[i] + '" width="200px" height="200px" style="padding:10px; border-radius: 50%;">'
        document.getElementById("imagenesinfo").innerHTML = imgs;
    };

    for (let comment in arrayComments) {
        if (opinionsArray[comment].user == "juan_pedro") {

            comments += `
                                <li class="media">
                                    <a href="#" class="pull-left">
                                        <img src="https://i.imgur.com/mhI5gpf.png" alt="" class="img-circle">
                                    </a>
                                    <div class="media-body">
                                        <span class="text-muted pull-right">
                                        <strong style="color: blue;">${opinionsArray[comment].user}</strong>
                                        </span>
                                        <small class="text-muted" style="margin-left:5px;">${opinionsArray[comment].dateTime}</small>
                                        <p>
                                            ${opinionsArray[comment].description}
                                        </p>                               
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>            
                                </li>                                     
        `
        } else if (opinionsArray[comment].user == "paola_perez") {
            comments += `
            <li class="media">
                <a href="#" class="pull-left">
                    <img src="https://i.imgur.com/mhI5gpf.png" alt="" class="img-circle">
                </a>
                <div class="media-body">
                    <span class="text-muted pull-right">
                    <strong style="color: blue;">${opinionsArray[comment].user}</strong>
                    </span>
                    <small class="text-muted" style="margin-left:5px;">${opinionsArray[comment].dateTime}</small>
                    <p>
                        ${opinionsArray[comment].description}
                    </p>                               
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                </div>          
            </li>                             
`
        } else {
            comments += `
            <li class="media">
                <a href="#" class="pull-left">
                    <img src="https://i.imgur.com/mhI5gpf.png" alt="" class="img-circle">
                </a>
                <div class="media-body">
                    <span class="text-muted pull-right">
                    <strong style="color: blue;">${opinionsArray[comment].user}</strong>
                    </span>
                    <small class="text-muted" style="margin-left:5px;">${opinionsArray[comment].dateTime}</small>
                    <p>
                        ${opinionsArray[comment].description}
                    </p>                               
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                </div> 
            </li>                             
`
        }
    }

    document.getElementById("sectionComments").innerHTML = comments;

    for (let relProd in arrayRel) {
        for (let i = 0; i < array.relatedProducts.length; i++) {
            if (relProd == array.relatedProducts[i]) {
                productsRel +=
                    `
                    <div style="display:inline-block;">   
                    <div class="card list-group-item-action text-justify m-3" style="width: 18rem;" onclick="cancelFunction();">
                    <img class="card-img-top" src="${arrayRel[relProd].imgSrc}" alt="Card image cap" style="border: 1px solid lightgrey;">
                    <div class="card-body">
                    <h5 class="card-title">${arrayRel[relProd].name}</h5>
                      <p class="card-text" style="height: 96px;">${arrayRel[relProd].description}</p>
                      <small style="float: right; font-weight: bolder; font-size:16px;">${arrayRel[relProd].cost} \n ${arrayRel[relProd].currency}</small>
                    </div>
                  </div>
                  </div>
     `
            }
        }
        document.getElementById('prodRelatedcon').innerHTML = productsRel;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status == "ok") {
            productInfoArray = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status == "ok") {
            opinionsArray = resultObj.data;

        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status == "ok") {
            productRelArray = resultObj.data;
            showProductSelected(productInfoArray, opinionsArray, productRelArray);
        }
    });

});

document.getElementById('1star').addEventListener('click', () => {
    numberOfStars = 1;
});
document.getElementById('2star').addEventListener('click', () => {
    numberOfStars = 2;
});
document.getElementById('3star').addEventListener('click', () => {
    numberOfStars = 3;
});
document.getElementById('4star').addEventListener('click', () => {
    numberOfStars = 4;
});
document.getElementById('5star').addEventListener('click', () => {
    numberOfStars = 5;
});

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function nowDate() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var hour = hoy.getHours();
    var min = hoy.getMinutes();
    var sec = hoy.getSeconds();

    dd = addZero(dd);
    mm = addZero(mm);

    return (yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec);
}
