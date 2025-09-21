async function initMap() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  fetch('js/map.json')
    .then(response => response.json())
    .then(styleJson => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.86091, lng: 2.3364 },
        zoom: 16,
        MapID: '6c6ba37b916bc1348beb09d0',
        styles: styleJson
      });
      const markers = [
        { lat: 48.8609, lng: 2.3364, title: "Marker 1" },
        { lat: 48.8602, lng: 2.3333, title: "Marker 2" },
        { lat: 48.8607, lng: 2.3397, title: "Marker 3" },
        { lat: 48.8619, lng: 2.3330, title: "Marker 4" },
        { lat: 48.8625, lng: 2.3365, title: "Marker 5" }
      ];
      markers.forEach(markerData => {
        const marker = new AdvancedMarkerElement({
        // let marker = new google.maps.marker.AdvancedMarkerElement({
        // let marker = new google.maps.Marker({
          map: map,
          position: { lat: markerData.lat, lng: markerData.lng },
          title: markerData.title,
          content: createMarkerFrom('imgs/marker_gray.svg')
        });
      });
    })
    .catch(error => console.error("Error:", error));
}

function createMarkerFrom(url) {
  const svg = document.createElement('img');
  svg.src = url;
  return svg;
}
