// let map = L.map('mapid', {
//   center: [43.6532, -79.3832],
//   zoom: 9
// });

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let coords = [latitude, longitude];
    let map = L.map('mapid').setView(coords, 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    map.on('click', function (mapE) {
      console.log(mapE)
      const lat = mapE.latlng.lat;
      const lng = mapE.latlng.lng;

      L.marker([lat, lng]).addTo(map)
        .bindPopup('Been Here!')
        .openPopup();
    })
  },
  function () {
    alert(`Current location unavailable!`)
  }
)