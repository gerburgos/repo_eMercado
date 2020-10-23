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
            
            <div class="shoping__checkout" style="width: 45%; height: 340px ; display: inline-block;">
            <h5>Delivery</h5>
            <ul>
                <li><input name="envio" type="radio" value="15" required="" onclick="calcEnvio();"> Premium (2-5 días) - Costo del 15% sobre el subtotal.</li>
                <li><input name="envio" type="radio" value="7" required="" onclick="calcEnvio();" > Express (5-8 días) - Costo del 7% sobre el subtotal.</li>
                <li><input name="envio" type="radio" value="5" checked="" required="" onclick="calcEnvio();"> Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</li>
                <p>Las opciones de envío se actualizarán durante el pago.</p>
            </ul>
        </div>
                <div class="col-lg-6 ml-auto">
             
                    <div class="shoping__checkout" style="height: 340px">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span id="subT">${calcSubTotal() + " USD"}</span></li>
                            <li>Delivery Cost <span id="envioP">625 USD</span></li>
                            <li>Total <span id="Total">${calcSubTotal() + " USD"}</span></li>
                            <a href="" class="primary-btn" style="margin-top: 25px" data-toggle="modal" data-target="#form">Proceed to checkout</a>
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
    document.getElementById("subT").innerHTML = calcSubTotal() + " USD";

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
          var env = parseInt(envio[i].value);         
          break;
      }
    }  
    calcTotal(env);
}

function calcTotal(x){
    let totalconEnvio = (x * calcSubTotal()) / 100;
    document.getElementById('envioP').innerHTML = Math.round(totalconEnvio) + " USD";
   document.getElementById('Total').innerHTML = Math.round((totalconEnvio + calcSubTotal())) + " USD";
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

$('#form').modal('hide',{ 
    backdrop: 'static', 
    keyboard: false 
}); 
$('#formPayment').modal('hide',{ 
    backdrop: 'static', 
    keyboard: false 
}); 

function methodPayment(){
    let paypal = `
        <div class="pagoPaypal form-group" style="margin-top: 10px;">
        <label for="Email" class="col-form-label">Email: </label> <br>
        <input type="email" class="form-control mr-2 " id="email_PayPal" placeholder="Email" required>
        </div>
    `;
    let mastercard = `  <div class="pagoMasterCard form-group">
    <label for="card-number" class="col-form-label">Card number: </label> <br>
    <input type="text" class="form-control" id="card-number" required maxlength="16"  onkeypress="onlyNumber(event, 'modal-payment', 'ErrorPayment','480px','400px');">

    <label for="expirationdate" class="col-form-label">Expiration date: </label> <br>
    <input type="text" class="form-control mr-2 " style="display: inline-block;width:85px;" id="experiationMonth"
    placeholder="MM" required maxlength="2" onkeypress="onlyNumber(event, 'modal-payment', 'ErrorPayment','480px','400px')">
    <input type="text" class="form-control mr-2 " style="display: inline-block;width:85px;" id="experiationYear"
    placeholder="YY" required maxlength="4" onkeypress="onlyNumber(event, 'modal-payment', 'ErrorPayment','480px','400px')"><br>
    <label for="CVV" class="col-form-label">CVV2/CVC2</label> <br>
    <input type="text" class="form-control mr-2 " style="display: inline-block;width:85px;" id="CVV" placeholder="CVV"
    required maxlength="3" onkeypress="onlyNumber(event, 'modal-payment', 'ErrorPayment','480px','400px')">
    </div>
`;

    let wiretransfer = `
    <div class="wiretransfer form-group">
        <label for="nroCuenta" class="col-form-label">Account number: </label> <br>
        <input type="text" class="form-control mr-2 " id="accNumber" placeholder="Enter account number" required onkeypress="onlyNumber(event,'modal-payment','ErrorPayment','450px', '360px');" maxlength="20"><br>

        <label for="cedula" class="col-form-label">Identification card: </label> <br>
        <input type="text" class="form-control mr-2 " id="ID" placeholder="Enter ID number" required onkeypress="onlyNumber(event,'modal-payment','ErrorPayment','450px', '360px');" maxlength="20"><br>
    </div>
    `;
let divPay = document.getElementById("payment"); 
    let payment = document.getElementsByName("payment");
    for (var i = 0; i < payment.length;i++){
      if(payment[i].checked){
          var pay = parseInt(payment[i].value);
          if (pay == 0) {
              divPay.innerHTML = mastercard;
              $("#modal-payment").css("height","400px");                    
          } else if (pay == 1){
            divPay.innerHTML = paypal;
            $("#modal-payment").css("height","300px");
            
          } else{
            divPay.innerHTML = wiretransfer;
            $("#modal-payment").css("height","360px");
          }
          break;
      }
    }  

    
}




  











