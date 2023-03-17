// const form = document.getElementById("myForm");
//
// // add an event listener for the submit event
// form.addEventListener("submit", function(event) {
//   // prevent the form from submitting
//   event.preventDefault();
//
//   // call the checkvalidation function to validate the form
//   if (checkvalidation()) {
//     // if the form is valid, submit it
//     form.submit();
//   }
// });

function checkvalidation(){
  let chek_in_time=document.getElementById("chek_in_time");
  let email=document.getElementById("email");
  let first_name=document.getElementById("first_name");
  let last_name=document.getElementById("last_name");
  let address=document.getElementById("address");
  let contact_num=document.getElementById("contact_num");
  let card_num=document.getElementById("card_num");
  let card_name=document.getElementById("card_name");
  let expiry_date=document.getElementById("expiry_date");
  let security_code=document.getElementById("security_code");

  //no empty validation
  if(chek_in_time.value==""){
    alert(chek_in_time.name+" must be fill");
    chek_in_time.focus();
    return false;
  }
  if(email.value==""){
    alert(email.name+" must be fill");
    email.focus();
    return false;
  }
  if(first_name.value==""){
    alert(first_name.name+" must be fill");
    first_name.focus();
    return false;
  }
  if(last_name.value==""){
    alert(last_name.name+" must be fill");
    last_name.focus();
    return false;
  }
  if(address.value==""){
    alert(address.name+" must be fill");
    address.focus();
    return false;
  }
  if(contact_num.value==""){
    alert(contact_num.name+" must be fill");
    contact_num.focus();
    return false;
  }
  if(card_num.value==""){
    alert(card_num.name+" must be fill");
    card_num.focus();
    return false;
  }
  if(card_name.value==""){
    alert(card_name.name+" must be fill");
    card_name.focus();
    return false;
  }
  if(expiry_date.value==""){
    alert(expiry_date.name+" must be fill");
    expiry_date.focus();
    return false;
  }
  if(security_code.value==""){
    alert(security_code.name+" must be fill");
    security_code.focus();
    return false;
  }
  //email validation
  if(email.value.indexOf("@",0)<0){
    alert("Please enter a valid email address that include '@'");
    email.focus();
    return false;
  }
  //phone no validation
  let p = contact_num.getAttribute("pattern");
  let ppattern=RegExp(p);//to set the pattern using RegExp()
  if(!ppattern.test(contact_num.value))
  {
    alert("Please enter a valid phone number.");
    contact_num.focus();
    return false;
  }
  //credit/debit card validation
  let c = card_num.getAttribute("pattern");
  let cpattern=RegExp(c);//to set the pattern using RegExp()
  if(!cpattern.test(card_num.value))
  {
    alert("Please enter a valid credit card number.");
    card_num.focus();
    return false;
  }
  // date validation
  var GivenDate = (new Date(document.getElementById("expiry_date").value)).getTime();
  var CurrentDate = new Date();

  if(GivenDate < CurrentDate){
      alert('The date is greater than current date.');
      document.getElementById("expiry_date").focus();
      return false;
  }
  orderlist();
  return true;

}
