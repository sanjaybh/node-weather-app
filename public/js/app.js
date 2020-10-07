const search = document.querySelector('input')
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const baseURL = "http://localhost:3000";

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'loading...'
    messageTwo.textContent = '';

    //function call
    getWeatherData(location);
})

function getWeatherData(location){
    fetch(`${baseURL}/weather?address=${location}`).then((response)=>{
        response.json().then(({ error, location, country, region, forecast, temperature, feelslike})=>{
            if(error){
                messageOne.textContent = error;
            } else {
                messageOne.innerHTML = `We are in <b>"${location}"</b> of <b>"${country}"</b> country in region <b>"${region}"</b>`
                messageTwo.innerHTML = `<b>${forecast}</b> :- It is currently <b>${temperature}</b> degrees out. It feels like <b>${feelslike}</b> degree out.`
            }
        })
    })
}