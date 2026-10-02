import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function TravellerTip({ tip, customTitle = "Traveller Tip" }) {
  if (!tip) return null;

  return (
    <div className="traveller-tip-box">
      <Lightbulb size={16} className="tip-icon" />
      <div>
        <div className="tip-title">{customTitle}</div>
        <div className="tip-text">{tip}</div>
      </div>
    </div>
  );
}
