import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { Map } from './components/Map/Map';
import { db } from './firebase';
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

  const onClick = async (event) => {
    try {
      const questMarker = {
        location: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        timestamp: Date.now(),
      };

      if (!document) {
        const resDoc = await addDoc(collection(db, 'quests'), {
          [`quest_${markers.length + 1}`]: questMarker,
        });
        setDocument(resDoc.id);
      } else {
        await updateDoc(
          doc(db, 'quests', document),
          {
            [`quest_${markers.length + 1}`]: questMarker,
          },
          { merge: true }
        );
      }

      setMarkers([
        ...markers,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
      ]);
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
