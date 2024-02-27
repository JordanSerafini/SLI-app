import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function LeafletMap({ address }: { address: string }) {
  const [addressFound, setAddressFound] = useState(true);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Conteneur de la carte référencé

  useEffect(() => {
    if (!address) {
      setAddressFound(false);
      return;
    }

    // Géocodage de l'adresse
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setAddressFound(true);
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          if (!mapRef.current && mapContainerRef.current) {
            // Initialise la carte une seule fois et lie-la au `div` référencé
            mapRef.current = L.map(mapContainerRef.current).setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
          }

          // Centre la carte sur les coordonnées
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

    // Nettoyage
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [address]);

  return addressFound ? (
    <div className="rounded-lg mt-4" ref={mapContainerRef} style={{  height: '200px', width: '100%' }}></div>
  ) : (
    <div style={{  height: '200px', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Adresse non trouvée.
    </div>
  );
}

export default LeafletMap;
