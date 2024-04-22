const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Element selections
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// Data container 
const cities = [];

// Gets data from external source
// fetch(endpoint).then(stuff => stuff.json()).then(data => cities.push(...data));

// Gets data from internal source
fetch("./cities.json").then(stuff => stuff.json()).then(data => cities.push(...data));

// Event listeners
searchInput.addEventListener("change",displayMatching);
searchInput.addEventListener("keyup",displayMatching);

// Main Functionality

function findMatching(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    })
}

// puts comma between numbers for readability 
function numberWithCommas(pHolder) {
    return pHolder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

// html setter
function displayMatching() {
    const matchArray = findMatching(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }