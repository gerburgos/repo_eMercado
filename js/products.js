const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var currentCategoriesArray = [];
const form = document.querySelector('#search');
const buttonSearch = document.querySelector('#btn');
const resultado = document.querySelector('#cat-list-container');

/* Function Sort Categories */
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.soldCount < b.soldCount) { return -1; }
            if (a.soldCount > b.soldCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
            htmlContentToAppend += `    
                             <div class="row">
                                   <div class"col-md-2">
                                    <div class="card  text-justify m-3" style="width: 18rem;">
                                        <img src="` + category.imgSrc + `" class="card-img-top">
                                        
                                    <div class="card-body">
                                         <h5 class="">` + category.name + ` </h5>
                                           <p class="card-text" style="height: 96px">` + category.description + ` <br> <b>` + category.cost + " " + category.currency + `</b></p>   
                                          <a href="#" class="btn btn-primary">Ver más</a>
                                          <p class="text-muted" style="float:right; text-align: center;">` + category.soldCount + ` sold</p>
                                    </div>
                                     </div>
                                   </div>
                             </div>
                                   `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortProducts(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    //Agregamos la funcion de showSpinner 
    showSpinner()

    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            //Agregamos la funcion de hideSpinner 
            hideSpinner();
        }
    });
});
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
});


/* Buscador */
const filter = () => {
    resultado.innerHTML = '';
    const textSearched = form.value.toLowerCase();
    for (let product of categoriesArray) {
        let car = product.name.toLowerCase();
        if (car.indexOf(textSearched) !== -1) {
            resultado.innerHTML += `
            <div class="row">
            <div class"col-md-2">
             <div class="card  text-justify m-3" style="width: 18rem;">
                 <img src="` + product.imgSrc + `" class="card-img-top">
                 
             <div class="card-body">
                  <h5 class="">` + product.name + ` </h5>
                    <p class="card-text" style="height: 96px">` + product.description + ` <br> <b>` + product.cost + " " + product.currency + `</b></p>   
                   <a href="#" class="btn btn-primary">Ver más</a>
                   <p class="text-muted" style="float:right; text-align: center;">` + product.soldCount + ` sold</p>
             </div>
              </div>
            </div>
      </div>
            `
        }
    }

    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
        <div>
         <p>No se encuentra el producto buscado</p>
       </div>
       `
    }
}
buttonSearch.addEventListener('click', filter);
form.addEventListener('keyup', filter);
filter();