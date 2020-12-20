// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// // Bing GeoCoder
// let api = 'Aq - w08bXUpPJZlzl3xsEANT1NM14l3qQdunMCTnOD4kRA - Sm4vj6NdVaWa2fWHM_'
// var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
//   cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', { attribution: cloudmadeAttribution });

// var map = new L.Map('map').addLayer(cloudmade).setView(new L.LatLng(48.5, 2.5), 15);

// var bingGeocoder = new L.Control.BingGeocoder(api);

// map.addControl(bingGeocoder);

// var options = {
//   collapsed: true, /* Whether its collapsed or not */
//   position: 'topright', /* The position of the control */
//   text: 'Locate', /* The text of the submit button */
//   callback: function (results) {
//     var bbox = results.resourceSets[0].resources[0].bbox,
//       first = new L.LatLng(bbox[0], bbox[1]),
//       second = new L.LatLng(bbox[2], bbox[3]),
//       bounds = new L.LatLngBounds([first, second]);
//     this._map.fitBounds(bounds);
//   }
// };

// Selection of form inputs
let form = document.querySelector('.form');
let date = document.querySelector('.date');
let place = document.querySelector('.place');
let description = document.querySelector('.description');

let coords;
let map;
let mapEvent;
let travel = {};

// Acquiring current location
navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    coords = [latitude, longitude];
    map = L.map('mapid').setView(coords, 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Brings forward input form
    map.on('click', function (mapE) {
      mapEvent = mapE
      form.classList.remove('hidden');
      date.focus();
    })
  },
  function () {
    alert(`Current location unavailable!`)
  }
)


form.addEventListener('submit', function (e) {
  e.preventDefault();
  let newDate = date.value;
  let newPlace = place.value;
  let newDescription = description.value;

  if (newDate === '') {
    alert("Please enter a Date")
  }

  if (newPlace === '') {
    alert("Please enter a Location")
  }

  if (newDescription === '') {
    alert("Please enter your experience")
  }

  travel = { coords, newDate, newPlace, newDescription };
  console.log(travel);

  let html = ` 
      <p class = "row"> 🗺  Visited: ${travel.newPlace} 
      <br> ⏳ Date: ${travel.newDate} 
      <br>🌟 Narrative: ${travel.newDescription} </p>
  `
  form.insertAdjacentHTML('afterend', html);

  // Display travel Pin
  const lat = mapEvent.latlng.lat;
  const lng = mapEvent.latlng.lng;

  L.marker([lat, lng]).addTo(map)
    .bindPopup(L.popup({
      maxHeight: 400,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false

    }))
    .setPopupContent(travel.newDate)
    .openPopup();

  // Set the input fields to empty after submitting form
  date.value = '';
  place.value = '';
  description.value = '';

  form.classList.add('hidden');

})

