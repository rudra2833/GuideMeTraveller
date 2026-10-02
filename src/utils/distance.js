/**
 * Calculate realistic road/transit distance between two lat/lng coordinates in kilometers.
 * Applies urban routing circuity factor (Hong Kong / Pearl River Delta has harbour crossings,
 * mountain bypasses, and road networks that make road distance 1.2x - 1.45x straight-line).
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
  const haversineDist = R * c;

  if (haversineDist < 0.05) return 0; // Inside hotel / same complex

  // Urban routing detour index:
  // Short walking distance (< 1km): ~1.15x
  // Medium urban distance (1 - 6km): ~1.30x
  // Long cross-district / cross-harbour (> 6km): ~1.42x
  let detourFactor = 1.30;
  if (haversineDist < 1.0) {
    detourFactor = 1.15;
  } else if (haversineDist > 6.0) {
    detourFactor = 1.42;
  }

  return haversineDist * detourFactor;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Get human-friendly travel time and distance estimates based on realistic road distance
 */
export function getEstimatedTravel(distKm) {
  if (distKm <= 0.05) {
    return {
      distStr: '0 m',
      timeStr: 'Inside hotel',
      primaryTransport: '🏨 On-site'
    };
  } else if (distKm <= 0.8) {
    return {
      distStr: `~${Math.round(distKm * 1000)} m`,
      timeStr: `~${Math.max(3, Math.round(distKm * 13))} min`,
      primaryTransport: '🚶 Walk'
    };
  } else if (distKm <= 3.5) {
    const minTime = Math.max(5, Math.round(distKm * 3.2));
    const maxTime = minTime + 5;
    return {
      distStr: `~${distKm.toFixed(1)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚕 Taxi / 🚇 MTR'
    };
  } else if (distKm <= 12) {
    const minTime = Math.round(distKm * 2.0) + 5;
    const maxTime = minTime + 8;
    return {
      distStr: `~${distKm.toFixed(1)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚇 MTR / 🚕 Taxi'
    };
  } else {
    const minTime = Math.round(distKm * 1.6) + 8;
    const maxTime = minTime + 12;
    return {
      distStr: `~${Math.round(distKm)} km`,
      timeStr: `~${minTime}–${maxTime} min`,
      primaryTransport: '🚇 MTR / 🚕 Taxi'
    };
  }
}

/**
 * Generate Google Maps directions URL from hotel to destination.
 * Uses exact coordinate parameters for precise road/transit navigation.
 */
export function getGoogleMapsDirectionsUrl(hotelName, hotelLat, hotelLng, destName, destLat, destLng) {
  if (hotelLat && hotelLng && destLat && destLng) {
    // Official Google Maps Directions API URL format
    const origin = `${hotelLat},${hotelLng}`;
    const destination = `${destLat},${destLng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }
  const queryOrigin = encodeURIComponent(hotelName || '');
  const queryDest = encodeURIComponent(destName || '');
  return `https://www.google.com/maps/dir/?api=1&origin=${queryOrigin}&destination=${queryDest}`;
}

/**
 * Generate Google Maps place search URL
 */
export function getGoogleMapsPlaceUrl(name, city, lat, lng) {
  if (lat && lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const query = encodeURIComponent(`${name}${city ? ', ' + city : ''}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

