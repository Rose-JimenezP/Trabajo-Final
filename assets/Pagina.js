const en = {
    encode(codigo, msj){
        if (msj == ""){ throw new TypeError;}
        let letter;
    let msjEncode = "";
    for(let i = 0; i < msj.length; i++){
      letter = msj.charCodeAt(i);
      msjEncode += String.fromCharCode(getLetter(letter,codigo));
    }
    return msjEncode;
  },
  decode(codigo,msj){
    if (msj == ""){ throw new TypeError;}
    codigo *= -1;
    let letter;
    let msjDecode = "";
    for(let i = 0; i < msj.length; i++){
      letter = msj.charCodeAt(i);
      msjDecode += String.fromCharCode(getLetter(letter,codigo));
    }
    return msjDecode;
  }
};

function getLetter(letter, codigo){
    let idLetter = letterValidate(letter);
    let quantityLetter = 26;
    if(idLetter === 0){ return letter;}
    if(idLetter === 48){ quantityLetter = 10;}
    let position = (letter - idLetter + codigo) % quantityLetter;
    if(position < 0){ position = quantityLetter + position;}
    return (position + idLetter);
}

function letterValidate(letter){
    let idLetter = 0; 
    if(letter >=65 && letter<=90){ idLetter = 65;} 
    if(letter >=97 && letter<=122){ idLetter = 97;} 
    if(letter >=48 && letter<=57){ idLetter = 48;} 
    return idLetter;
}


const txtMsj = document.getElementById("msj");
const contador = document.getElementById("contador");
const codigo = document.getElementById("codigo");
const btnEn = document.getElementById("en");
const btnDes = document.getElementById("des");
const labelMsjResultado = document.getElementById("labelMsjResultado");
const txtMsjResultado = document.getElementById("msjResultado");
const btnCopia = document.getElementById("copia");
const modalC = document.getElementsByClassName("modalContenedor")[0];
const modal = document.getElementsByClassName("modal")[0];
const close = document.getElementById("close");

txtMsj.addEventListener("keyup", () =>{
    contador.innerHTML = txtMsj.value.length + "/420";
});

btnEn.addEventListener("click",()=>{
    if(txtMsj.value == ""){
        alert("Ingresa tu mensaje secreto.");
    }else if(codigo.value == ""){
        alert("No olvides ingresar tu código.");
    }else{
        labelMsjResultado.innerHTML = "Su mensaje cifrado es ";
        let msjResultado = en.encode(parseInt(codigo.value),txtMsj.value);
        txtMsjResultado.innerHTML = msjResultado;
        openModal();
    }
});

btnDes.addEventListener("click",()=>{
    if(txtMsj.value == ""){
        alert("Ingresa tu mensaje secreto.");
    }else if(codigo.value == ""){
        alert("No olvides ingresar tu clave secreta.");
    }else{
        labelMsjResultado.innerHTML = "Su mensaje descifrado es ";
        let msjResultado = en.decode(parseInt(codigo.value),txtMsj.value);
        txtMsjResultado.innerHTML = msjResultado;
        openModal();
    }
});

btnCopia.addEventListener("click",()=>{
    txtMsjResultado.select();
    document.execCommand("copy");
    setTimeout(()=>{
        btnCopia.textContent = "Copiado!";
    }, 100);
});

function openModal(){
    modalC.classList.remove("contenedorClose");
    modal.classList.remove("modalClose");
}