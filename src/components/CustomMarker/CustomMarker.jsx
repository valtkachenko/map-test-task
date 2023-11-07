import { Marker } from '@react-google-maps/api';

const CustomMarker = ({ label, position }) => {
  return <Marker label={label} position={position} />;
};

export { CustomMarker };
