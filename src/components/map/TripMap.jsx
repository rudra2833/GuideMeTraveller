import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../../utils/distance';

export default function TripMap({ activeHotel, places = [], height = '380px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map if not already done
    if (!mapInstanceRef.current) {
      const initialLat = activeHotel?.lat || 22.3193;
      const initialLng = activeHotel?.lng || 114.1694;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Light, clean OpenStreetMap Road Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layers = layerGroupRef.current;
    layers.clearLayers();

    const bounds = [];

    // 1. Add Active Hotel Marker (Dark Navy Star Pin)
    if (activeHotel && activeHotel.lat && activeHotel.lng) {
      const hotelIcon = L.divIcon({
        className: 'custom-hotel-marker',
        html: `
          <div style="
            background-color: #1F3436;
            color: #FFF8F1;
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(31, 52, 54, 0.4);
            border: 2px solid #FFF8F1;
          ">
            <span style="transform: rotate(45deg); font-size: 16px;">🏨</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38]
      });

      const hotelMarker = L.marker([activeHotel.lat, activeHotel.lng], { icon: hotelIcon });
      hotelMarker.bindPopup(`
        <div style="font-family: var(--font-body); padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; color: #557B76; text-transform: uppercase;">YOUR ACTIVE BASE</div>
          <div style="font-size: 14px; font-weight: 700; color: #1F3436; margin: 2px 0 4px;">${activeHotel.name}</div>
          <div style="font-size: 12px; color: #5E7270;">${activeHotel.area}</div>
        </div>
      `);
      layers.addLayer(hotelMarker);
      bounds.push([activeHotel.lat, activeHotel.lng]);
    }

    // 2. Add Destination Markers (Numbered Coral Circles)
    places.forEach((place, index) => {
      if (!place.lat || !place.lng) return;

      const number = index + 1;
      const distKm = activeHotel ? calculateDistanceKm(activeHotel.lat, activeHotel.lng, place.lat, place.lng) : 0;
      const estimate = getEstimatedTravel(distKm);
      const directionsUrl = activeHotel ? getGoogleMapsDirectionsUrl(activeHotel.name, activeHotel.lat, activeHotel.lng, place.name, place.lat, place.lng) : '#';

      const placeIcon = L.divIcon({
        className: 'custom-place-marker',
        html: `
          <div style="
            background-color: #EFA7A0;
            color: #1F3436;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 14px;
            box-shadow: 0 3px 10px rgba(239, 167, 160, 0.6);
            border: 2px solid #FFFFFF;
            cursor: pointer;
          ">
            ${number}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([place.lat, place.lng], { icon: placeIcon });
      marker.bindPopup(`
        <div style="font-family: var(--font-body); min-width: 190px; padding: 2px;">
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 3px;">
            <span style="background: #EFA7A0; color: #1F3436; font-size: 10px; font-weight: 800; width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">${number}</span>
            <span style="font-size: 10px; font-weight: 800; color: #557B76; text-transform: uppercase;">${place.badge ? place.badge.replace('_', ' ') : 'DESTINATION'}</span>
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #1F3436; line-height: 1.25;">${place.name}</div>
          ${place.chineseName ? `<div style="font-size: 11px; color: #8E9E9C;">${place.chineseName}</div>` : ''}
          
          <div style="margin: 8px 0 6px; padding: 6px; background: #FFF8F1; border-radius: 6px; font-size: 11px;">
            <div>📍 <strong>${estimate.distStr}</strong> from hotel (${estimate.timeStr})</div>
            <div style="color: #557B76; margin-top: 2px;">${estimate.primaryTransport}</div>
          </div>

          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="
            display: block;
            text-align: center;
            background: #1F3436;
            color: #FFF8F1;
            padding: 6px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 6px;
          ">
            Open in Google Maps ↗
          </a>
        </div>
      `);
      layers.addLayer(marker);
      bounds.push([place.lat, place.lng]);
    });

    // Fit map bounds smoothly
    if (bounds.length > 0) {
      map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: 15,
        animate: true
      });
    }

  }, [activeHotel, places]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-card)',
      position: 'relative'
    }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Floating Legend Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 500,
        backgroundColor: 'rgba(255, 248, 241, 0.94)',
        backdropFilter: 'blur(8px)',
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.74rem',
        fontWeight: 700,
        color: 'var(--color-navy)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>🏨 Hotel Base</span>
        <span>•</span>
        <span style={{ color: 'var(--color-coral-dark)' }}>● Destinations</span>
      </div>
    </div>
  );
}
