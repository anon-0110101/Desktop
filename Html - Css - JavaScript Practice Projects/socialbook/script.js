window.settingsMenuToggle = function() {
    var settingsMenu = document.querySelector(".settings-menu");
    settingsMenu.classList.toggle("settings-menu-height");
}  
var darkBtn = document.getElementById("dark-btn");

darkBtn.onclick = function() {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
}


if (localStorage.getItem("theme") == "light") {
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme") == "dark") {
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else{
    localStorage.setItem("theme", "light");
}


localStorage.setItem("theme", "dark");
localStorage.getItem("theme");