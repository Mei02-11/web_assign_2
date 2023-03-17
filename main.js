const cart = [];//declare an array, cannot be change
const order = [];


function Next(roomType, price, pic) {
  const bedChoice = document.querySelector('input[name="Bed"]:checked')?.value ?? 'Single bed';
  const hasBreakfast = document.querySelector('input[name="Meal"]:checked')?.value ?? 'No';
  const checkInDate = document.querySelector('input[name="check-in-date"]').value;
  const checkOutDate = document.querySelector('input[name="check-out-date"]').value;
  let ordtest = localStorage.getItem('cartprice')
  if(ordtest)
  {
    price = localStorage.getItem('cartprice');
  }

  cart.push({ roomType, price, pic, bedChoice, hasBreakfast, checkInDate, checkOutDate });
  window.localStorage.removeItem('cartprice');
  localStorage.setItem('cart', JSON.stringify(cart));
  displaycart();
}

function displaycart(){
  let cartcontainer=document.querySelector("#cart-items");
  if(cartcontainer){
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let htm="";
    cart.forEach(item => {
      htm="<div class='order_list list ft2'>Your booking From <i class='i-1'>"+item.checkInDate+
      "</i> Until <i class='i-1'>"+item.checkOutDate+
      "</i><ul id='check-date'></ul></div><div class='room_list list'><h5 class='ft4'>Room</h5><div class='row'><div class='col-lg-2'>Room type :</div><div class='col-lg-4'><i>"+item.roomType+
      "</i></div><div class='col-lg-2'>Included Amenities :</div><div class='col-lg-4'><i>Air conditioner/WiFi/refrigerator</i></div></div><div class='row'><div class='col-lg-2'>Bedding :</div><div class='col-lg-4'><i>"+item.bedChoice+
      "</i></div><div class='col-lg-2'>Included Services :</div><div class='col-lg-4'><i>"+item.hasBreakfast+
      "</i></div></div></div><hr><div class='price-list list'><div class='row'><div class='col-lg-6'></div><div class='col-lg-3'><h4 class='ft4'>Total Amount : </h4></div><div class='col-lg-2'><i>"+item.price+
      "</i> (Included tax)</div></div></div>";
      cartList.innerHTML+=htm;
    });
  }
}


function displayorder(){
  let productcontainer=document.querySelector("#orderdisplay");//find the id or class is important!
  if(productcontainer){
    const orderList = document.getElementById('orderdisplay');
    orderList.innerHTML = '';
    let ttprice=0;
    let intprice;
    let htm="";
    order.forEach(item => {
      htm="<div class='p-item'><div class='row pimg'><div class='col-lg-3'><img class='p-img' src='"+item.pic+
      "index.jpg' alt=''></div><div class='col-lg-8'><div class='pt1'><b class='ft5' style='font-size:20px;'>"+item.roomType+
      "</b></div><div class='pt'>Check-in Date: "+item.checkInDate+
      " - Check-out Date: "+item.checkOutDate+
      "<br>Bed: "+item.bedChoice+
      "<br> Meal: "+item.hasBreakfast+
      "</div><div class='pt txt3'>Total: <b>RM"+item.price+
      " </b></div></div></div></div>";
      orderList.innerHTML+=htm;
      intprice = parseInt(item.price);
      ttprice=intprice+ttprice;
    });
    document.getElementById('ttpriceShow').innerHTML=ttprice;
    localStorage.setItem('totalprice',ttprice);
  }

  // htm2="<hr class='p-bottom'><div class='row p-bottom'><div class='col-lg-9'>Subtotal:</div><div class='col-lg-2'></div><div class='col-lg-1'><b>RM </b></div></div>";
}


function orderlist(){
  order.push(...cart); // move items from cart to order
  localStorage.setItem('order', JSON.stringify(order)); // save order to local storage
  removecartlocal();
  let olength = order.length;
  localStorage.setItem('ordernumber',olength);
  displayorder();
}


function removecartlocal(){
  window.localStorage.removeItem('cart');
  window.localStorage.removeItem('cartprice');
}

function clearall(){
  localStorage.clear();
}

function orderNumdisplay() {
  let numcontainer=document.querySelector("#ordernumdisplay");
  let orderNum = localStorage.getItem('ordernumber');
  orderNum = parseInt(orderNum);
  if (numcontainer) {
    if(orderNum)
    {
      document.getElementById('ordernumdisplay').textContent = orderNum;
    }else{
      document.getElementById('ordernumdisplay').textContent = 0;
    }

  }
}

window.addEventListener('load', () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.push(...JSON.parse(storedCart));
    displaycart();
  }

  const storedorder = localStorage.getItem('order');
  if (storedorder) {
    order.push(...JSON.parse(storedorder));
    displayorder();
  }
  orderNumdisplay();

});

// const form = document.getElementById("myForm_e");
// // add an event listener for the submit event
// form.addEventListener('submit', function(event) {
//   // prevent the form from submitting
//   event.preventDefault();
//
//   // call the checkvalidation function to validate the form
//   if (checkvalidation_e(70)) {
//     // if the form is valid, submit it
//     form.submit();
//   }
// });

// checkvalidation
function checkvalidation_e(price){
  let check_in_date=document.getElementById("check_in_date");
  let check_out_date=document.getElementById("check_out_date");

  //meal validation
  let checkSelected = document.querySelector('input[name="Meal"]:checked');
  if(checkSelected==null){
    alert("Meal selection must be select.");
    return false;
  }

  if(check_in_date.value==""){
    alert(check_in_date.name+" must be fill");
    check_in_date.focus();
    return false;
  }
  if(check_out_date.value==""){
    alert(check_out_date.name+" must be fill");
    check_out_date.focus();
    return false;
  }

  //date validation
  var GivenDate = new Date(check_in_date.value);
  var CurrentDate = new Date();

  if(GivenDate < CurrentDate){
      alert('The date is greater than current date.');
      check_in_date.focus();
      return false;
  }
  //date validation
  var CheckInDate = new Date(check_in_date.value);
  var CheckOutDate = new Date(check_out_date.value);

  if(CheckOutDate < CheckInDate){
      alert('The check in date is early than check out date..');
      check_in_date.focus();
      return false;
  }else{
    var time_difference = CheckOutDate.getTime() - CheckInDate.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    var price = days_difference * price;
    localStorage.setItem('cartprice',price);
  }
  Next('Economy Room', 70,'eroomchoose 2 ');
  return true;
}

function checkvalidation_m(price){
  let check_in_date=document.getElementById("check_in_date");
  let check_out_date=document.getElementById("check_out_date");

  //bed validation
  let checkBedSelected = document.querySelector('input[name="Bed"]:checked');
  if(checkBedSelected==null){
    alert("Bed selection must be select.");
    return false;
  }

  //meal validation
  let checkMealSelected = document.querySelector('input[name="Meal"]:checked');
  if(checkMealSelected==null){
    alert("Meal selection must be select.");
    return false;
  }

  if(check_in_date.value==""){
    alert(check_in_date.name+" must be fill");
    check_in_date.focus();
    return false;
  }
  if(check_out_date.value==""){
    alert(check_out_date.name+" must be fill");
    check_out_date.focus();
    return false;
  }

  //date validation
  var GivenDate = new Date(check_in_date.value);
  var CurrentDate = new Date();

  if(GivenDate < CurrentDate){
      alert('The date is greater than current date.');
      check_in_date.focus();
      return false;
  }
  //date validation
  var CheckInDate = new Date(check_in_date.value);
  var CheckOutDate = new Date(check_out_date.value);

  if(CheckOutDate < CheckInDate){
      alert('The check in date is early than check out date.');
      check_in_date.focus();
      return false;
  }else{
    var time_difference = CheckOutDate.getTime() - CheckInDate.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    var price = days_difference * price;
    localStorage.setItem('cartprice',price);
  }
  Next('Medium Room', 160,'mroomchoose 3 ');
  return true;
}

function checkvalidation_q(price){
  let check_in_date=document.getElementById("check_in_date");
  let check_out_date=document.getElementById("check_out_date");

  //bed validation
  let checkBedSelected = document.querySelector('input[name="Bed"]:checked');
  if(checkBedSelected==null){
    alert("Bed selection must be select.");
    return false;
  }

  //meal validation
  let checkMealSelected = document.querySelector('input[name="Meal"]:checked');
  if(checkMealSelected==null){
    alert("Meal selection must be select.");
    return false;
  }

  if(check_in_date.value==""){
    alert(check_in_date.name+" must be fill");
    check_in_date.focus();
    return false;
  }
  if(check_out_date.value==""){
    alert(check_out_date.name+" must be fill");
    check_out_date.focus();
    return false;
  }

  //date validation
  var GivenDate = new Date(check_in_date.value);
  var CurrentDate = new Date();

  if(GivenDate < CurrentDate){
      alert('The date is greater than current date.');
      check_in_date.focus();
      return false;
  }
  //date validation
  var CheckInDate = new Date(check_in_date.value);
  var CheckOutDate = new Date(check_out_date.value);

  if(CheckOutDate < CheckInDate){
      alert('The check in date is early than check out date.');
      check_in_date.focus();
      return false;
  }else{
    var time_difference = CheckOutDate.getTime() - CheckInDate.getTime();
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    var price = days_difference * price;
    localStorage.setItem('cartprice',price);
  }
  Next('Queen Room', 240,'qroomchoose ');
  return true;
}
