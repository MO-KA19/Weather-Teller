// Accesing elements and Declaring variables and arraies
let pic = document.querySelector("#pic1");
let deg = document.querySelector("#degree1");
let state = document.querySelector("#st1");
let mix = document.querySelector(".degs #mx1");
let min = document.querySelector(".degs #mn1");



let apiKey = ["82265ec458186eb48ed958640e3c3e8f",
              "e8f422b6880b5780a465af9fb83fcd1d",
              "7e2f761cffcb7887640ec841d4c17f09",
              "acfa2edc495b9b975033ccce071fd01c",
              "5f20eb0eb80fcd94c357e5e466889b5d",
              "8df704ab22068df9cbd1027c9a40f521",
              "f62530d0e20f4c2566bd28d92a336eb2",
              "9b888cec12fcdf23db3f476846c63808",
              "12d169a177886e785a7fff87d930f54c",
              "eec337253dfd612adeed560c75fd3e1c",
              "4a032eef2ec10343037df1d4f87a14cc"];



let imgs = {
    "Sunny": "../Weather Images/img5.png",
    "Clouds": "../Weather Images/img2.png",
    "Clear": "../Weather Images/img5.png",
    "Rain": "../Weather Images/img7.png",
    "Snow": "../Weather Images/img9.png",
    "Wind": "../Weather Images/img27.png",
    "Drizzle": "../Weather Images/img10.png",
    "Mist": "../Weather Images/img33.png",
    "Smoke": "../Weather Images/img33.png",
    "Dust": "../Weather Images/img33.png",
    "Fog": "../Weather Images/img33.png",
    "Thunderstorm": "../Weather Images/img13.png",
    "not found": "../Main Resources/error.png"
};



// Build a function to get user location
function getLocation (param) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(param)
    }

    else {
        alert ("Couldn't get your Location.");
    }
}



// A function to select a random api key from a list above
function randomKey() {
    let key = apiKey[Math.floor(Math.random() * apiKey.length)];
    return key
}



getLocation(currentWeather);
getLocation(TomorroWeather);



// Get current day weather for user city using API
async function currentWeather (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;


    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${randomKey()}`;
    const response = await fetch(url);
    const data = await response.json();



    if (response.status == 200) {
        let Mainweather = data["weather"]["0"]["main"];
        state.innerHTML = Mainweather;

        let deggre = Math.round(data["main"]["temp"]-273);
        deg.innerHTML = deggre + "<sup>∘</sup>";

        let picture = imgs[Mainweather];
        pic.setAttribute("src",picture);

        let maxDeg = Math.round(data["main"]["temp_max"]-273);
        let minDeg = Math.round(data["main"]["temp_min"]-273);

        mix.innerHTML = maxDeg;
        min.innerHTML = minDeg;
    }


    else {
        state.innerHTML = "Some Error Aquaired...."
        deg.remove()
        mix.remove()
        min.remove()
        pic.setAttribute("src",imgs["not found"])
    };
};



// Get next day weather for user city using API
let pic2 = document.querySelector("#pic2");
let deg2 = document.querySelector("#degree2");
let state2 = document.querySelector("#st2");
let mix2 = document.querySelector(".degs #mx2");
let min2 = document.querySelector(".degs #mn2");



async function TomorroWeather (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;



    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${randomKey()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {

        let MainWetaher2 = data["list"][8]["weather"]["0"]["main"];
        state2.innerHTML = MainWetaher2;

        let degrre2 = Math.round(data["list"][8]["main"]["temp"]-273);
        deg2.innerHTML = degrre2 + "<sup>∘</sup>";

        let picture = imgs[MainWetaher2];
        pic2.setAttribute("src",picture);
    
        
        let maxDeg = Math.round(data["list"][8]["main"]["temp_max"]-273);
        let minDeg = Math.round(data["list"][8]["main"]["temp_max"]-273);

        mix2.innerHTML = maxDeg;
        min2.innerHTML = minDeg;

    }
    


    else{

        state.innerHTML = "Some Error Aquaired...."
        deg.remove()
        mix.remove()
        min.remove()
        pic.setAttribute("src",imgs["not found"])
    };
};

// Get the weather states for a certian city from the user
let customCity = document.querySelector("#custom");
let plus = document.querySelector(".pic3a");
let inp = document.querySelector("#ip");
let btn = document.querySelector(".box3btn");
let builds = document.querySelector("#pic3b");
let frame = document.querySelector(".frame");
let divState = document.querySelector("#cust_st");
let divDegs = document.querySelector("#cust_deg");
let custDeg = document.querySelector("#cust_st h1"); 
let custstate = document.querySelector("#cust_st h2");
let custmx = document.querySelector("#cust_deg .d1 h1");
let custmn = document.querySelector("#cust_deg .d2 h1");
let box3 = document.querySelector(".box3");



plus.onclick = (() => {
    plus.style.display = "none";
    inp.style.display = "block";
    btn.style.display = "block";
});



// Toggel custom box elements
function toggelElements (...params) {
    for (let i = 0; i < params.length; i++) {
        
        if (params[i].style.display != "none") {
            params[i].style.display = "none";
            
        }


        else {
            params[i].style.display = "block";
        };
    };
};



// The function which build for getting weather data for the custom city
btn.onclick = (async () => {
    let city = inp.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${randomKey()}`;
    const response = await fetch (url);
    const data = await response.json();
    

    
    if (response.status === 200) {

        toggelElements(inp, btn, builds);
        customCity.innerHTML = data['name'] + '<sup class="trash"><i class="fa-regular fa-trash-can"></i></sup>';
        let state = data["weather"]['0']['main'];
        let temp = Math.round(data["main"]["temp"]-273)
        let maxDeg = Math.round(data["main"]["temp_max"]-273)
        let minDeg = Math.round(data["main"]["temp_min"]-273)
    
    
        let img = document.createElement("img");
        img.classList.add("pic3a");
        img.setAttribute("src",imgs[state]);
        img.style.height = "180px";
        frame.appendChild(img);


        divDegs.style.display = "flex";
        divState.style.display = "block";

        custDeg.innerHTML = temp + "<sup>∘</sup>";;
        custstate.innerHTML = state;
    
        custmx.innerHTML = maxDeg;
        custmn.innerHTML = minDeg;


        let removeCity = document.querySelector(".trash i");
        removeCity.setAttribute("title", "Remove city and reload the page")
        removeCity.onclick = (() => {
            document.location.reload(true)
        });
    }




    else {
        toggelElements(inp, btn, builds)
        customCity.innerHTML = data["message"];


        var mrErr = document.createElement("img");
        mrErr.classList.add("pic3a");
        mrErr.style.height = "180px"
        mrErr.setAttribute("src",imgs['not found']);
        frame.appendChild(mrErr);
        

        var reset = document.createElement("button");
        reset.innerHTML = "Reset";
        reset.classList.add("box3btn");
        reset.style.display = "block";
        box3.appendChild(reset);


        reset.onclick = (() => {
            toggelElements(inp,btn,builds);
            reset.style.display = "none";
            mrErr.style.display = "none";
        });
    };
});


// A scrolling button for more user interactive
let scrolldown = document.querySelector(".more i");
let scrollup = document.querySelector("#up");

scrolldown.onclick = (() => {
    window.scrollBy(0,1400);
});



window.onscroll = function () {
    this.scrollY >= 1000 ? scrollup.style.cssText = ("display:block; transform:translateY(0);")
    : scrollup.style.cssText = ("display:none; transform:translateY(60px);");
};



scrollup.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };