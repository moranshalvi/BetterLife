import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FindHelpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
          
          function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
          
            const geocoder = new window.google.maps.Geocoder();
            const latLng = new window.google.maps.LatLng(latitude, longitude);
          
            geocoder.geocode({ 'location': latLng }, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {
                  const address = results[0].formatted_address;
                  console.log(`Current Address: ${address}`);
                } else {
                  console.log('No results found');
                }
              } else {
                console.log(`Geocoder failed due to: ${status}`);
              }
            });
          }
          
        // setTimeout(() => {
        //     navigate('/breathe');
        // }, 5000);
    }, []);
     

    return (
        <div id='my'  className="find-help-page">
            <h1>Finding a therapist for you</h1>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <a className="gohome" onClick={() => navigate('/')}>HOME</a>
        </div>
    )
}            