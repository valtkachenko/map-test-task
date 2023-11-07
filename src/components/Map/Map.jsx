import { useRef, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import styles from './Map.module.css';
import { CustomMarker } from '../CustomMarker/CustomMarker';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
};

const Map = ({ center, markers, onClick }) => {
  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={defaultOptions}
      >
        {markers.length &&
          markers.map(({ lat, lng }, index) => (
            <CustomMarker
              key={`${lat}${lng}`}
              position={{ lat, lng }}
              label={`${index + 1}`}
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export { Map };
