import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
const debounce = require('lodash.debounce');

let countries = '';


function findCountry() {
   
    countries = input.value.trim().toLowerCase();

    if (countries === '') {
        countriesList.innerHTML = '';
        countryInfo.innerHTML = '';
        return
        
    } else {
        fetchCountries(countries)
            .then(renderCountriesList)
            .catch(error => Notify.failure('Oops, there is no country with that name'));
    }
    
    
}

input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));



function renderCountriesList(array) {
    let countryElList = array.map((country => createListCountreisElement(country))).join('');
    let countryElListInfo = array.map((country => createCountryInfo(country))).join('');
    console.log(countryElList);
    console.log(countryElListInfo);

    if (array.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.')
    }
    
    if (array.length > 1 && array.length <= 10) {
        countriesList.innerHTML = countryElList;
        countryInfo.innerHTML = "";


    } else if (array.length === 1) {
        countriesList.innerHTML = '';
        countriesList.innerHTML = countryElList;
        countryInfo.innerHTML = countryElListInfo;

        document.querySelector('.item-box__name').classList.add('item-box__name--uniq');
        return
    }
        
}

function createListCountreisElement(array) {
    return `<li class='item'>
    <div class="item-box"> 
            <img src='${array.flags.svg}' alt='country flag' width = '25px' class="flag__base"></img>
            <p class="item-box__name">${array.name.official}</p>

    </div> </li>`
}

function createCountryInfo(array) {
    const languages = Object.values(array.languages).join('');
    console.log(languages);

    return `<ul>
        <li class="conuntry-info__item"><span>Capital:</span> ${array.capital} </li>
        <li class="conuntry-info__item"><span>Population:</span> ${array.population} </li>
        <li class="conuntry-info__item"><span>Languages:</span> ${languages} </li>
    </ul>`
    
}