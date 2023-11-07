import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './components/Map/Map';
import { getLatLng } from './helpers';
import { useQuests } from './hooks';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [document, setDocument] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });
  const { add, update } = useQuests();

  const onClick = async (event) => {
    try {
      const questMarker = {
        location: getLatLng(event),
        timestamp: Date.now(),
      };
      const nextQuest = markers.length + 1;

      if (!document) {
        const resDoc = await add(nextQuest, questMarker);
        setDocument(resDoc.id);
      } else {
        await update(nextQuest, questMarker, document);
      }

      setMarkers([...markers, getLatLng(event)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      {isLoaded ? (
        <Map center={defaultCenter} markers={markers} onClick={onClick} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default App;
