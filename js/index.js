const CAR_PRODUCTOS = "cartProductsId";

document.addEventListener("DOMContentLoaded",() => {
    loadProducts();
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
  const products = await getProductsDb();
  console.log(products);

  let html = "";
  products.forEach(products => {
      html += `
      <div class="col-3  product-container">
      <div class="card product">
      <img 
      src="${products.image}"
      class="card-img-top"
      alt="${products.name}"

      />
      <div class="card-body">
      <h5 class="card-title">${products.name}</h5>
      <p class="card-text">${products.extraInfo}</p>
      <p class="card-text">${products.price}  € / Unidad</p>
      <button type="button" class="btn btn-primary btn-cart" oncClick=(addProductCart(${products.id}))>Añadir al carrito</button>
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

function addProductsCart(idProducts){
    console.log("añadiendo el producto con el ID: "+ idProducts);
    

    let arrayProductsId = [];

    let localStorageItems = localStorage.getItem(CAR_PRODUCTOS);

    if(localStorageItems === null){
        arrayProductsId.push(idProducts);
        localStorage.setItem(CAR_PRODUCTOS, arrayProductsId);
    } else {
        let productsId = localStorage.getItem(CAR_PRODUCTOS);
        if (productsId.length > 0){
        
            productsId += "," + IdProducts
         
    }else {
        productsId = productsId;
      }
      localStorage.setItem(CART_PRODUCTOS, productsId);

      console.log("ya hay contenido en el localStorage");

    } 
}