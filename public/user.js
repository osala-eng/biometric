function showPassword(){
    var x = document.getElementById("passInput");
    if(x.type == "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}
var hostIpAddress = "192.168.0.121";

function startScan(){
    window.open(`http://${hostIpAddress}:3000/scan.html`,"_self");
}
function homePage(){
    window.open(`http://${hostIpAddress}:3000/main.html`,"_self");
}
function newPatient(){
    window.open(`http://${hostIpAddress}:3000/newpatient.html`,"_self");
}
function logOut(){
    window.open(`http://${hostIpAddress}:3000/user.html`,"_self");
}
function cancelScan(){
    window.open(`http://${hostIpAddress}:3000/main.html`,"_self");
}