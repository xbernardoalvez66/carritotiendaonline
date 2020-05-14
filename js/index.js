const CART_PRODUCTOS = "cartProductsId";

document.addEventListener("DOMContentLoaded",() => {
    loadProducts();
    loadProductCart();
});


function getProductsDb() {
    const url = "https://demo2562028.mockable.io/products";
    return fetch(url)
    .then(response =>{
     return response.json();
   })
    .then(result =>{
    return result;
   })
   .catch(err =>{
       console.log(err);

   });

}
 async function loadProducts() {
  const product = await getProductsDb();
  console.log(product);

  let html = "";
  product.forEach(product => {
      html += `
      <div class="col-3  product-container">
      <div class="card product">
      <img 
      src="${product.image}"
      class="card-img-top"
      alt="${product.name}"

      />
      <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.extraInfo}</p>
      <p class="card-text">${product.price}  € / Unidad</p>
      <button type="button" class="btn btn-primary btn-cart" onclick=(addProductCart(${product.id}))>Añadir al carrito</button>
      </div>
      </div>
      </div>
      
      
      `;
      
  });

  document.getElementsByClassName("products")[0].innerHTML = html;

}

function openCloseCart(){
    const containerCart = document.getElementsByClassName("cart-products")[0];
    
   containerCart.classList.forEach(item =>{
       if(item === "hidden"){
           containerCart.classList.remove("hidden");
           containerCart.classList.add("active");
       }

       if(item === "active"){
           containerCart.classList.remove("active");
           containerCart.classList.add("hidden");
       }
   })
}

function addProductCart(IdProduct){
    let arrayProductsId = [];

    let localStorageItems = localStorage.getItem(CART_PRODUCTOS);

    if(localStorageItems === null){
        arrayProductsId.push(IdProduct);
        localStorage.setItem(CART_PRODUCTOS, arrayProductsId);
    } else {
        let productsId = localStorage.getItem(CART_PRODUCTOS);
        if (productsId.length > 0){
        
            productsId += "," + IdProduct
         
    } else {
        productsId = productId;
      }
      localStorage.setItem(CART_PRODUCTOS, productsId);

    

    } 

    loadProductCart();
}


 async function loadProductCart() {
    const products = await getProductsDb();

    


    //convertimos el resultado del localStorage en un array
    
    const localStorageItems = localStorage.getItem(CART_PRODUCTOS);
    let html = "";
    if(!localStorageItems){
        html = `
        <div class="cart-product empty">
        <p>Carrito vacio.</p>
        
        </div>
        
        `;
    }else{


    const IdProductsSplit = localStorageItems.split(",");

    //eliminamos los IDs duplicados

    const IdProductsCart = Array.from(new Set (IdProductsSplit));
    
    
    IdProductsCart.forEach(id =>{
        products.forEach(product =>{


            if(id == product.id) {
            const quantity = countDuplicatesId(id,IdProductsSplit);
            const totalPrice = product.price * quantity;

                html += `
                <div class="cart-product">
               <img src="${product.image} " alt="${product.name}" />
               <div class="cart-product-info">
               <span class="quantity">${quantity}</span>
               <p>${product.name}</p>
               <p>${totalPrice.toFixed(2)}</p>
               <p class="change-quantity">
               <button onClick="decreaseQuantity(${product.id})">-</button>
               <button onClick="increaseQuantity(${product.id})">+</button>
               </p>
               <p class="cart-product-delete">
               <button onClick=(deleteProductsCart(${product.id}))>Eliminar</button>
               </p>
               
               </div>

                </div>
                
                `; 
            }
        });
    });


   }

    document.getElementsByClassName('cart-products')[0].innerHTML = html;

}

function deleteProductsCart(IdProduct){
    

    const IdProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = IdProductsCart.split(",");
    const resultidDelete = deleteAllIds(IdProduct, arrayIdProductsCart);

    if(resultidDelete){
        let count = 0;
        let idsString = "";

        resultidDelete.forEach(id => {
            count++;
            if(count < resultidDelete.length){
                idsString += id + ','
            }else {
                idsString += id;
            }

        });

        localStorage.setItem(CART_PRODUCTOS, idsString);
    }

   const idsLocalStorage = localStorage.getItem(CART_PRODUCTOS);
   if(!idsLocalStorage){
       localStorage.removeItem(CART_PRODUCTOS);
   }


    loadProductCart();
    
}

function increaseQuantity(IdProduct){
    const IdProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = IdProductsCart.split(",");
    arrayIdProductsCart.push(IdProduct);
    
    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id =>{
        count++;
        if(count < arrayIdProductsCart.length ){
            idsString += id + ",";
        }else{
            idsString += id;
        }
    });

    localStorage.setItem(CART_PRODUCTOS,idsString);
    loadProductCart();
}

function decreaseQuantity(IdProduct){
    const IdProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = IdProductsCart.split(",");

    const deleteItems = IdProduct.toString();
    let index = arrayIdProductsCart.indexOf(deleteItems);
    
    if(index > -1){
        arrayIdProductsCart.splice(index, 1);
    }

    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id =>{
        count++;
        if (count < arrayIdProductsCart.length){
            idsString += id + ",";
        }else{
            idsString += id;
        }
    })

    localStorage.setItem(CART_PRODUCTOS, idsString);
    loadProductCart();

}

function countDuplicatesId (value,arrayIds) {
    let count = 0;

    arrayIds.forEach(id =>{
        if(value == id){
            count++;
        }
    });

    return count;

}

function deleteAllIds(id,arrayIds){
    return arrayIds.filter(itemId =>{
        return itemId != id
    })
}