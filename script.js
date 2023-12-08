

const inputSlider = document.querySelector("[data-lengthSlider]"); //custon attribute
const lengthdisplay = document.querySelector("[data-length-number]"); //custon attribute

const passworddisplay = document.querySelector("[data-passwordDisplay]"); //custon attribute
const copyBtn = document.querySelector(".copy-btn") 
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#option1")
const lowercaseCheck = document.querySelector("#option2")
const numbersCheck = document.querySelector("#option3");
const symbolsCheck = document.querySelector("#option4");
const indicator = document.querySelector(".indicator");
const generateBtn = document.querySelector(".generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordlength = 8;
let checkCount=0;
handleSlider(); //slider se password ki length set kar deta hai
///ek checkbox pehle se selected hoga
let ckeckCount =1;

///handle slider--> slider se password ki length set kar deta hai
function handleSlider(){
    inputSlider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
}


function setIndicator(color){
     indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
   let num = Math.floor( Math.random() * (max - min)) + min;
   return num;
}

////Math.random()--> 0 to 1 ke beech me ek random number generate karta hai
////Math.floor()--> round off kar deta hai
////Math.random()*(max-min) ---> 0 to max-min ke beech me ek random number generate karta hai
////Math.floor( Math.random() * (max - min) )+ min; ---> min to max ke beech me ek random number generate karta hai


function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
} 

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols.charAt(getRndInteger(0,symbols.length));
}

function calcStrength(){
    let hasupper = uppercaseCheck.checked;
    let haslower = lowercaseCheck.checked;
    let hasNumber = numbersCheck.checked;
    let hasSymbol = symbolsCheck.checked;


    if(hasupper && haslower && (hasNumber || hasSymbol) &&  passwordlength >= 10){
        setIndicator("green");
    }else if( ( hasupper && haslower && (hasNumber || hasSymbol) && passwordlength<=8 ) || (    haslower && hasNumber && (hasupper || hasSymbol) && passwordlength>=8  ) || ( hasupper && hasNumber && (haslower || hasSymbol) && passwordlength>=8 ) || ( hasupper && hasSymbol && (haslower || hasNumber) && passwordlength>=8 ) ){
        setIndicator("orange");
    }   else{
        setIndicator("red");
    
    }
}



async function copy_btn_f(){ 
   
    try{
        await navigator.clipboard.writeText(passworddisplay.value); 
        copyMsg.innerText = "Copied!";
    ////async function hai , return promise(resolve hone par copy karega),
    ////yeh API hai 
    
    }catch(err){
        copyMsg.innerText = "Failed!";
    }
    
    copyMsg.classList.add("active");///yeh css copy message main active class add kar rahe hai

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000) ;  //yaha hum 2sec ke baad active class ko remove kar rahe hai  
}


inputSlider.addEventListener("input",(e)=>{
    passwordlength = e.target.value;
    lengthdisplay.innerText = passwordlength;  
});


// async function copy_btn_f(){ 
//     var $copiedElement = $("<span>");
//     $copiedElement.addClass('copied').text('copied!');
//     $('.copyto-clipboard').append($copiedElement);
//     $copiedElement.fadeIn(100);
//     $copiedElement.fadeOut(5000);
// }


// passworddisplay.value = "amandkfnd";
copyBtn.addEventListener("click",()=>{
    if(passworddisplay.value){
        copy_btn_f();
    }
});



function handleCheckBoxChange(){
     checkCount =0 ;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordlength< checkCount){
        passwordlength = checkCount;
        handleSlider();
    }

}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});




generateBtn.addEventListener("click",()=>{

    // console.log("i am here");

    if(checkCount == 0){
        alert("Please select atleast one option");
        return;
    }

    if(checkCount > passwordlength){
        alert("Password length is less than the number of options selected");
        return;
    }


    
    if(passwordlength< checkCount){
        passwordlength = checkCount;
        handleSlider();
    }


 

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // console.log(allCheckBox.length);
    // console.log(funcArr[0]());
    // console.log(funcArr[1]());
    // console.log(funcArr[2]());
    // console.log(funcArr[3]());
    


    for(let i=0;i<checkCount;i++){
            let k = parseInt(i);
            password += funcArr[k]();
        
    }

    for(let i=0;i<passwordlength-checkCount;i++){
        let aman = parseInt(getRndInteger(0 , funcArr.length));
        password += funcArr[aman]();
    }

    passworddisplay.value = shuffle(Array.from(password)); ;
    
});


function shuffle(array){

    for(let i = array.length-1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str="";
    array.forEach((el) => (str+=el));
    return str;

   
}

function reset(){
    password.length =0 ;
    password="";
    passworddisplay.value = password ;
    for(let i=0; i<allCheckBox.length;i++){
        allCheckBox[i].checked = false;
    }
    inputSlider.value = 8;  
    lengthdisplay.innerText = 8;
    passwordlength =8;

}
