/**
 * Calculate distance between two lat/lng coordinates in kilometers (Haversine formula)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Get human-friendly travel time and distance estimates based on distance
 */
export function getEstimatedTravel(distKm) {
  if (distKm <= 0.8) {
    return {
      distStr: `~${Math.round(distKm * 1000)} m`,
      timeStr: `~${Math.max(5, Math.round(distKm * 14))} min`,
      primaryTransport: '🚶 Walk'
    };
  } else if (distKm <= 3) {
    const minTime = Math.round(distKm * 3.5);
    const maxTime = minTime + 5;
    return {
      distStr: `~${distKm.toFixed(1)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚕 Taxi / 🚇 MTR'
    };
  } else if (distKm <= 10) {
    const minTime = Math.round(distKm * 2.2) + 6;
    const maxTime = minTime + 8;
    return {
      distStr: `~${distKm.toFixed(1)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚇 MTR / 🚕 Taxi'
    };
  } else {
    const minTime = Math.round(distKm * 1.8) + 10;
    const maxTime = minTime + 12;
    return {
      distStr: `~${Math.round(distKm)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚇 MTR / 🚕 Taxi'
    };
  }
}

/**
 * Generate Google Maps directions URL from hotel to destination
 */
export function getGoogleMapsDirectionsUrl(hotelName, hotelLat, hotelLng, destName, destLat, destLng) {
  const origin = encodeURIComponent(`${hotelName} (${hotelLat},${hotelLng})`);
  const destination = encodeURIComponent(`${destName} (${destLat},${destLng})`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
}

/**
 * Generate Google Maps place search URL
 */
export function getGoogleMapsPlaceUrl(name, city, lat, lng) {
  const query = encodeURIComponent(`${name}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${lat},${lng}`;
}
