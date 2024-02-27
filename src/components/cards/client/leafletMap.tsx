import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function LeafletMap({ address }: { address: string }) {
  const [addressFound, setAddressFound] = useState(true);
  const mapRef = useRef<L.Map | null>(null); // Utilisation de useRef pour conserver l'état de la carte

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) return; // Ne pas réinitialiser la carte si elle existe déjà
      const mapContainer = L.DomUtil.create('div', 'map-container', document.body);
      mapContainer.id = 'map-' + Math.random(); // Assure un ID unique pour chaque conteneur
      mapContainer.style.height = '400px';
      mapContainer.style.width = '100%';
      mapRef.current = L.map(mapContainer).setView([0, 0], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    };

    if (!address) {
      setAddressFound(false);
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setAddressFound(true);
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          initMap();
          if (mapRef.current) {
            mapRef.current.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(mapRef.current).bindPopup(address).openPopup();
          }
        } else {
          console.error('Adresse non trouvée');
          setAddressFound(false);
          if (mapRef.current) mapRef.current.remove();
          mapRef.current = null;
        }
      })
      .catch(error => {
        console.error('Erreur lors du géocodage', error);
        setAddressFound(false);
      });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [address]);

  return addressFound ? (
    <div id={`map-${Math.random()}`} style={{ height: '400px', width: '100%' }}></div>
  ) : (
    <div style={{ height: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Adresse non trouvée.
    </div>
  );
}

export default LeafletMap;
