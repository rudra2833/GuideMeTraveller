import React from 'react';
import { Compass, Sparkles, Coffee, MapPin } from 'lucide-react';

export default function BadgeChip({ type }) {
  if (type === 'TOUR_ITINERARY') {
    return (
      <span className="badge badge-tour">
        <Sparkles size={11} />
        Tour Itinerary
      </span>
    );
  }

  if (type === 'OPTIONAL') {
    return (
      <span className="badge badge-optional">
        <Compass size={11} />
        Optional Idea
      </span>
    );
  }

  if (type === 'FREE_DAY_IDEA') {
    return (
      <span className="badge badge-slowday">
        🌿 Free Day Pick
      </span>
    );
  }

  if (type === 'FOOD_PICK') {
    return (
      <span className="badge badge-food">
        <Coffee size={11} />
        Food Pick
      </span>
    );
  }

  return (
    <span className="badge badge-optional">
      <MapPin size={11} />
      {type}
    </span>
  );
}
