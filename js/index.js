const CAR_PRODUCTOS = "cartProductsId";

document.addEventListener("DOMContentLoaded",() => {
    loadProducts();
});


function getProductsDb() {
    const url = "../dbproduct.json";
   fetch(url).then(response =>{
     return response.json();
   })
    .then(result =>{
    return result;
   });
   .catch(err => {
       console.log(err);

   });
  
}
 async function loadProducts() {
    console.log("Funcion loadProducts funciona orrectamente");
   
  const products = await  getProductsDb();
  console.log(products);

}