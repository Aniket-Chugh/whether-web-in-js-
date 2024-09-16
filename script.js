const input = document.querySelector("input");
const btn = document.querySelector("button");
const temp = document.querySelector(".temp_c");
const state = document.querySelector("#state");
const times = document.querySelector(".time");
const day = document.querySelector(".day");
const dates = document.querySelector(".date");
const icon = document.querySelector("img");
const condition = document.querySelector(".wheather-condition");




input.addEventListener("focus" , ()=>{
    btn.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

})




btn.addEventListener("click" , async function(){


const location = input.value;

if (location != " ") {

    const data  = await fetchFun(location);

    if (data == null) {
        return null;
    }
    else {
        updateDom(data);
        icon.style.display = "block";
    }


}
else if (location == " ") {
    alert("enter place !")

}


})


function updateDom(data) {
    const tempc = data.current.temp_c;
    temp.innerHTML = `${tempc} °C`;
    const name = data.location.name;
state.innerHTML = name;
const localtime = data.location.localtime;
const [date , time] = localtime.split(" ");

times.innerHTML = time;
const Conditions = data.current.condition.text;

condition.innerHTML = Conditions;
dates.innerHTML = date;
const imgs = data.current.condition.icon;
icon.src = imgs;
const days = data.current.is_day;

switch (days) {


        case 0:
            day.innerHTML = "Sunday";
            break;
        case 1:
            day.innerHTML = "Monday";
            break;
        case 2:
            day.innerHTML = "Tuesday";
            break;
        case 3:
            day.innerHTML = "Wednesday";
            break;
        case 4:
            day.innerHTML = "Thursday";
            break;
        case 5:
            day.innerHTML = "Friday";
            break;
        case 6:
            day.innerHTML = "Saturday";
            break;
        default:
            day.innerHTML = "Unknown day";
            break;


}
}


async function fetchFun(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=ab844ace4aaf4d6f992160138241509&q=${location}&aqi=no`;
    const rawData = await fetch(url);
    if (rawData.status == 400) {
        alert("Location is invalid.");
        return null; // Added return to handle invalid location gracefully.
    } else if (rawData.status == 404) {
        alert("Data not found.");
        return null; // Added return to handle data not found gracefully.
    } else {
        const json = await rawData.json(); // Added await here.
        return json;
    }
}
