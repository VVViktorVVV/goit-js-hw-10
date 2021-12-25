// import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
const debounce = require('lodash.debounce');

let countries = '';

function findCountry() {
   
    countries = input.value;
    
    fetchCountries(countries)
        .then(renderCountriesList)
    // .catch(error => Notify.failure('Oops, there is no country with that name'))
    
    
}

input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));



function renderCountriesList(array) {
    const countryElList = array.map((country => createListCountreisElement(country))).join('');
    const countryElListInfo = array.map((country => createCountryInfo(country))).join('');
    console.log(countryElList);
    console.log( countryElListInfo);
    countriesList.insertAdjacentHTML("afterbegin", countryElList);
    countriesList.insertAdjacentHTML("afterbegin", countryElListInfo);
    



    
}

function createListCountreisElement(array) {
    return `<li class='item'>
    <div> 
            <img src='${array.flags.svg}' alt='country flag' width = '200px'></img>
            <p>'${array.name.official}'</p>

    </div> </li>`
}

function createCountryInfo(array) {
   return `<ul>
        <li>Capital: ${array.capital} </li>
        <li>Population: ${array.population} </li>
        <li>Languages: ${array.languages} </li>
    </ul>`
    
}