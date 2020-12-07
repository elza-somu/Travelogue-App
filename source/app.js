const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
      // date.focus();
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
  // let travelData = document.querySelector('.travelData')

  if (newDate === '') {
    alert("Please enter a Date")
  }

  if (newPlace === '') {
    alert("Please enter a Location")
  }
  travel = { coords, newDate, newPlace, newDescription };

  let html = `
      <p class = "row">Visited ${travel.newPlace} on ${travel.newDate}</p>
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

})