var artCart = [];
var arrayArticles = [];

function showCart(array) {
    let carritoHTML = "";
    carritoHTML +=  `
    <section class="shoping-cart spad" style="margin-top: 50px;">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="shoping__cart__table">
                    <table>
                        <thead>
                            <tr>
                                <th class="shoping__product">Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
    `
   for(var i = 0; i < array.articles.length; i++) {
    arrayArticles = array.articles[i];
   
    
    carritoHTML += `
  
                                <tr id="${i}">
                                    <td class="shoping__cart__item">
                                        <img src="${arrayArticles.src}" alt="" width="100px" height="100px">
                                        <h5>${arrayArticles.name}</h5>
                                    </td>
                                    <td class="shoping__cart__price">
                                        ${arrayArticles.unitCost} ${arrayArticles.currency}
                                    </td>
                                    <td class="shoping__cart__quantity">
                                    <div>
                                    <input type="button" style="width: 23px; color: white; background-color: coral;" value="+" id="add" onclick="addition(${i});">
                                    <input type="number" id="numb_${i}" style="width: 23px; text-align: center;  border: 1px solid #ebebeb;" min="1" value="${arrayArticles.count}" onclick="changeText();">
                                    <input type="button" style="width: 23px; color: white; background-color: coral;" value="-" id="subtract" onclick="subtract(${i});">
                                    </div>
                                    </td>
                                    <td class="shoping__cart__total">
                                        <div id="showTotal_${i}">${convertToUSD(array.articles[i].currency,array.articles[i].unitCost,[i])} USD</div>
                                    </td>  
                                    <td class="shoping__cart__item__close">
                                    <span class="fal fa-times" id="btn_${i}" onclick="removeItem(${i});"></span>
                                    </td>
                                </tr>                          
  `
   }
   carritoHTML += `	
                   </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="row">
            
            <div class="shoping__checkout" style="width: 45%; height: 300px ; display: inline-block;">
            <h5>Envío</h5>
            <ul>
                <li><input name="envio" type="radio" value="0" checked="" required="" onclick="calcEnvio();"> Retira en el local</li>
                <li><input name="envio" type="radio" value="5" required="" onclick="calcEnvio();" > Montevideo Urbano: US$ 5.00</li>
                <li><input name="envio" type="radio" value="12" required="" onclick="calcEnvio();"> Envío al Interior para despacho: US$ 12.00</li>
                <p>Las opciones de envío se actualizarán durante el pago.</p>
            </ul>
        </div>
                <div class="col-lg-6 ml-auto">
             
                    <div class="shoping__checkout" style="height: 300px">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span id="subT">${"$" + calcSubTotal()}</span></li>
                            <li>Total <span id="Total">${"$" + calcSubTotal()}</span></li>
                            <a href="" class="primary-btn" style="margin-top: 20px" data-toggle="modal" data-target="#form">Proceed to checkout</a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
   `
   
    document.getElementById("showCartProd").innerHTML = carritoHTML;

};


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status == "ok") {
            artCart = resultObj.data;
            showCart(artCart);            
        }
              
    });
    
});

function addition(id){
    artCart.articles[id].count++;
    let quantityNumber = document.getElementById("numb_"+id);  
    quantityNumber.value = artCart.articles[id].count;
    showSubT(id);
}
function subtract(id){
    artCart.articles[id].count--;
    if(artCart.articles[id].count < 1){
        artCart.articles[id].count = 1;
    }
    let quantityNumber = document.getElementById("numb_"+id);
    quantityNumber.value = artCart.articles[id].count;
    showSubT(id);
    
}

function showSubT(id){
    var x;
   if(id == 0){
    x = artCart.articles[id].unitCost * artCart.articles[id].count / 40;
   }else{
    x = artCart.articles[id].unitCost * artCart.articles[id].count
   }

        document.getElementById("showTotal_"+id).innerHTML = x + " USD"; 
    document.getElementById("subT").innerHTML = "$" + calcSubTotal();

    calcEnvio();
}

function calcSubTotal(){
    let subTotal = 0;
    for (var i = 0; i < artCart.articles.length;i++){
        
        if(i == 1){
            subTotal  +=  (artCart.articles[i].unitCost * artCart.articles[i].count);
        } else{
            subTotal += (artCart.articles[i].unitCost * artCart.articles[i].count) / 40;
        }
    
    }
    return subTotal;
}
function calcEnvio(){
    
    let envio = document.getElementsByName("envio");
    for (var i = 0; i < envio.length;i++){
      if(envio[i].checked){
          var pepe = parseInt(envio[i].value);
          break;
      }
    }  
    calcTotal(pepe);
}

function calcTotal(x){
   document.getElementById('Total').innerHTML = "$" + (x + calcSubTotal());
}

function removeItem(id){
    $('#'+id).css('display', 'none');
}

function convertToUSD (currency, unitCost, id){
    if(currency === 'UYU'){
        return (unitCost / 40) * artCart.articles[id].count ;
    }else {
        return unitCost;
     }
}











