async function initMap() {
  try {
    // 1. Явно загружаем библиотеку маркеров
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // 3. Загружаем стили карты (если нужно)
    const styleJson = await fetch('js/map.json').then(res => res.json());

    // 4. Создаём карту
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 48.86091, lng: 2.3364 },
      zoom: 16,
      styles: styleJson
    });

    // 5. Добавляем маркеры
    const markers = [
      { lat: 48.8609, lng: 2.3364, title: "Marker 1" },
      { lat: 48.8602, lng: 2.3333, title: "Marker 2" },
      { lat: 48.8607, lng: 2.3397, title: "Marker 3" },
      { lat: 48.8619, lng: 2.3330, title: "Marker 4" },
      { lat: 48.8625, lng: 2.3365, title: "Marker 5" }
    ];

    markers.forEach(markerData => {
      const iconElement = document.createElement('img');
      iconElement.src = markerData.icon;
      iconElement.width = 32;

      new AdvancedMarkerElement({
        map: map,
        position: { lat: markerData.lat, lng: markerData.lng },
        content: iconElement
      });
    });

  } catch (error) {
    console.error("Ошибка инициализации карты:", error);
  }
}