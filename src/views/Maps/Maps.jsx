import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Slider from "../../components/Parallax/Slider";
import Contact1 from "../../assets/img/CONTACT1.jpg";
import Contact2 from "../../assets/img/CONTACT2.jpg";
import Parallax from "../../components/Parallax/Parallax";

let CustomSkinMap;

const mapKey = process.env.REACT_APP_MAP_API_KEY;
export const defaultLocation = { lat: 6.240738, lng: 7.107323 };

try {
  CustomSkinMap = withScriptjs(
    withGoogleMap(({ location }) => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={location}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: false,
        // styles: [
        //   {
        //     featureType: "water",
        //     stylers: [
        //       { saturation: 43 },
        //       { lightness: -11 },
        //       { hue: "#0088ff" }
        //     ]
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       { hue: "#ff0000" },
        //       { saturation: -100 },
        //       { lightness: 99 }
        //     ]
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#808080" }, { lightness: 54 }]
        //   },
        //   {
        //     featureType: "landscape.man_made",
        //     elementType: "geometry.fill",
        //     stylers: [{ color: "#ece2d9" }]
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "geometry.fill",
        //     stylers: [{ color: "#ccdca1" }]
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#767676" }]
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.text.stroke",
        //     stylers: [{ color: "#ffffff" }]
        //   },
        //   { featureType: "poi", stylers: [{ visibility: "off" }] },
        //   {
        //     featureType: "landscape.natural",
        //     elementType: "geometry.fill",
        //     stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
        //   },
        //   { featureType: "poi.park", stylers: [{ visibility: "on" }] },
        //   {
        //     featureType: "poi.sports_complex",
        //     stylers: [{ visibility: "on" }]
        //   },
        //   { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
        //   {
        //     featureType: "poi.business",
        //     stylers: [{ visibility: "simplified" }]
        //   }
        // ]
        }}
      >
        <Marker position={location} />
      </GoogleMap>
    )),
  );
} catch (ex) {
  throw new Error(ex.message);
}

function Maps({ ...props }) {
  const { classes, location } = props;
  try {
    if (!location.lat) {
      return <Slider classes={classes} images={[Contact1, Contact2]} />;
    }
  } catch (ex) {
    return <Slider classes={classes} images={[Contact1, Contact2]} />;
  }
  return (
    <Parallax filter className="slick-image">
      <CustomSkinMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}`}
        loadingElement={<div style={{ height: "100%", width: "100%" }} />}
        containerElement={<div style={{ width: "200vh", height: "100vh", margin: "0px" }} />}
        mapElement={<div style={{ height: "100%", width: "100%" }} />}
        location={location}
      />
    </Parallax>
  );
}

export default Maps;
