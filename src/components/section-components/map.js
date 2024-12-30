import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.659886381724!2d55.2039177!3d25.113372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6bf00d9db9%3A0xace2f9664c2a5174!2sHeart%20Of%20Carthage%20Real%20Estate!5e0!3m2!1sfr!2stn!4v1734973884209!5m2!1sfr!2stn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Heart of Carthage Location"
        />
      </div>
    );
  }
}

export default Map;
