const cartSection=document.querySelector("#cart-section")

let cartItems=JSON.parse(localStorage.getItem("cart"))
console.log(cartItems)


function calculateTotal(){
    let totalPrice=0
 cartItems.map((item) => {
    totalPrice+= item.price
   
});
let currentUser=JSON.parse(localStorage.getItem("currentUser"))
currentUser.totalPrice=totalPrice.toFixed(2)

localStorage.setItem("currentUser", JSON.stringify(currentUser))

document.getElementById("total-price").innerHTML = "$"+totalPrice.toFixed(2)
}
calculateTotal()


function renderCartSection(){
    const searchHTML = cartItems.map((item) => renderItems(item));
    document.getElementById("cart-items").innerHTML =  searchHTML.join("");
}
renderCartSection()


function renderList(){
    const searchHTML_2 = cartItems.map((item) => renderPrice(item));
    document.getElementById("list-items").innerHTML  =  searchHTML_2.join("");
}
renderList()


function renderItems(item) {
    return `
   <div class="item">
   <div id="img-div">
   <img src=${item.image} alt="Item" />
   </div>
     <div class="info" id="info-div">
     <div class="title">${item.title}</div>
     <div class="row">
       <div class="price">$${item.price}</div>
       <div class="sized">S,M,L</div>
     </div>
     <div class="colors">
       Colors:
       <div class="row">
         <div class="circle" style="background-color: #000"></div>
         <div class="circle" style="background-color: #4938af"></div>
         <div class="circle" style="background-color: #203d3e"></div>
       </div>
     </div>
     <div class="row">Rating: ${item.rating.rate}⭐</div>
   </div>
   <div id="btn-div">
   <button id="addBtn" onclick="removeItems(${item.id})">Remove from cart</button>
   </div>
  </div>`;
  }

  function renderPrice(item){

    return`
    <div id="itemOfList"> 
    <div>${item.title.slice(0, 20)}...</div>
    <div>$${item.price}</div>
    </div>
    `
  }

  function removeItems(id){
   cartItems=cartItems.filter((item)=>{
        
        return item.id != id
    })
    
    localStorage.setItem("cart",JSON.stringify(cartItems))
    renderCartSection()
    renderList()
    calculateTotal()
  }

  document.querySelector("#pay-btn").addEventListener("click",()=>{
    localStorage.setItem("cart", JSON.stringify([]))
    alert("The items were purchased")
    window.location.href="../razorpay/index.html"
  })
