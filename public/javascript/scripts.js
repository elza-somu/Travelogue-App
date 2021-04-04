// Selection of form inputs
let form = document.querySelector('.form');
let date = document.querySelector('.date');
let place = document.querySelector('.place');
let description = document.querySelector('.description');

let coords;
let map;
let mapEvent;
let html;
// let travel = {};

class App{
  constructor(){

  }
  _getPosition(){
    // Acquiring current location
navigator.geolocation.getCurrentPosition()
  

  }
  _mapLoad(){
    function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    coords = [latitude, longitude];
    map = L.map('mapid').setView(coords, 9);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZWx6YXNiIiwiYSI6ImNrajBncGRwdDBscXkyeGtsa3Fwa2R2c3oifQ.wr0Bb5dxHOEsIW1pFX94HA'
    }).addTo(map); 

    searchCity();
    showForm();

  }
    
  }

  _showForm(){

  }
}



  function () {
    // alert(`Current location unavailable!`)
    map = L.map('mapid').setView([51.0447, -114.0719], 9);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZWx6YXNiIiwiYSI6ImNrajBncGRwdDBscXkyeGtsa3Fwa2R2c3oifQ.wr0Bb5dxHOEsIW1pFX94HA'
    }).addTo(map); 

    searchCity();
    showForm();
  }
)

function searchCity(){
    var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

    L.esri.Geocoding.geosearch({
      providers: [
        arcgisOnline,
        L.esri.Geocoding.mapServiceProvider({
          label: 'States and Counties',
          url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
          layers: [2, 3],
          searchFields: ['NAME', 'STATE_NAME']
        })
      ]
    }).addTo(map);
}

function showForm(){
  // Brings forward input form
  map.on('click', function (mapE) {
    mapEvent = mapE
    form.classList.remove('hidden');
    date.focus();
  })
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let newDate = date.value;
  let newPlace = place.value;
  let newDescription = description.value;
  let newCoords = coords;

  if (newDate === '') {
    alert("Please enter a Date")
    return;
  }

  if (newPlace === '') {
    alert("Please enter a Location")
    return;
  }


  let travel = {
    // id: travelId ,
    date: newDate,
    location: newPlace,
    description: newDescription,
    coords: newCoords
  };

  console.log(travel);

  if (newDescription === '') {
    html = ` 
        <p class = "row"> 🗺  Visited: ${travel.location} 
        <br> ⏳ Date: ${travel.date}     
    `
  } else {
    html = ` 
        <p class = "row"> 🗺  Visited: ${travel.location} 
        <br> ⏳ Date: ${travel.date} 
        <br>🌟 Review: ${travel.description} </p>`
  }

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
    .setPopupContent(`🌟 ${travel.location} on ${travel.date}`)
    .openPopup();

  // Set the input fields to empty after submitting form
  date.value = '';
  place.value = '';
  description.value = '';

  form.classList.add('hidden');

})

