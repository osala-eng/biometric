function showPassword(){
    var x = document.getElementById("passInput");
    if(x.type == "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}
function scanPage(){
    var doccx = document.getElementsByName("scan");
}