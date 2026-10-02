import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { 
  Heart, CheckSquare, Edit3, CloudRain, 
  Sparkles, Compass, ShieldCheck, Download, Trash2 
} from 'lucide-react';
import { CHECKLIST_ITEMS, CITIES } from '../data/tripData';
import { useFavorites } from '../hooks/useFavorites';
import { useNotes } from '../hooks/useNotes';
import { useHotelStore } from '../hooks/useHotelStore';
import PlaceCard from '../components/places/PlaceCard';

export default function MorePage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { notes, setNotes } = useNotes();
  const { getActiveHotel } = useHotelStore();

  const [activeTab, setActiveTab] = useState('build'); // 'build', 'picks', 'notes', 'checklist', 'rain'
  
  // Checklist State in localStorage
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('guidemetraveller_checklist');
      return saved ? JSON.parse(saved) : CHECKLIST_ITEMS;
    } catch {
      return CHECKLIST_ITEMS;
    }
  });

  const toggleCheck = (id) => {
    setChecklist(prev => {
      const next = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      try {
        localStorage.setItem('guidemetraveller_checklist', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Build My Day state
  const [selectedCityForDay, setSelectedCityForDay] = useState('hongKong');
  const [selectedPlaces, setSelectedPlaces] = useState(['hk_victoria_peak', 'hk_madame_tussauds']);
  const [selectedFood, setSelectedFood] = useState('Vegetarian');
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const city = CITIES[selectedCityForDay];
  const activeHotel = getActiveHotel(selectedCityForDay);

  const handleTogglePlace = (id) => {
    setSelectedPlaces(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBuildDay = () => {
    const chosenPlaces = [
      ...city.officialPlaces,
      ...city.optionalPlaces
    ].filter(p => selectedPlaces.includes(p.id));

    const planSequence = [
      { time: '09:00', title: `Leave ${activeHotel.shortName || activeHotel.name}`, type: 'hotel', icon: '🏨' }
    ];

    if (chosenPlaces.length > 0) {
      planSequence.push({
        time: '10:00',
        title: chosenPlaces[0].name,
        desc: chosenPlaces[0].whyGo,
        icon: '🏙'
      });
    }

    planSequence.push({
      time: '12:30',
      title: `${selectedFood} Lunch`,
      desc: `Nearby family dining recommended for ${selectedFood} preference`,
      icon: '🍽'
    });

    if (chosenPlaces.length > 1) {
      planSequence.push({
        time: '14:30',
        title: chosenPlaces[1].name,
        desc: chosenPlaces[1].whyGo,
        icon: '📸'
      });
    }

    if (chosenPlaces.length > 2) {
      planSequence.push({
        time: '17:00',
        title: chosenPlaces[2].name,
        desc: chosenPlaces[2].whyGo,
        icon: '✨'
      });
    }

    planSequence.push({
      time: '18:30',
      title: 'Relaxed Afternoon Tea or Stroll',
      desc: 'Family catch-up time & snack break',
      icon: '☕'
    });

    planSequence.push({
      time: '20:00',
      title: `Return to ${activeHotel.shortName || activeHotel.name}`,
      desc: 'Rest and recharge for tomorrow',
      icon: '🏨'
    });

    setGeneratedPlan(planSequence);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Planner Toolkit"
        subtitle="Custom Tools & Notes"
        showBack={false}
      />

      <div style={{ padding: '16px 20px 36px' }}>
        
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '20px',
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => setActiveTab('build')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'build' ? 'var(--color-navy)' : '#FFFFFF',
              color: activeTab === 'build' ? '#FFF8F1' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ✨ Build My Day
          </button>

          <button
            onClick={() => setActiveTab('picks')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'picks' ? 'var(--color-coral-dark)' : '#FFFFFF',
              color: activeTab === 'picks' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ♡ Our Picks ({favorites.length})
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'checklist' ? 'var(--color-teal)' : '#FFFFFF',
              color: activeTab === 'checklist' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ✓ Checklist
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'notes' ? '#6C8B82' : '#FFFFFF',
              color: activeTab === 'notes' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ✎ Little Notes
          </button>

          <button
            onClick={() => setActiveTab('rain')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'rain' ? '#5E7270' : '#FFFFFF',
              color: activeTab === 'rain' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ☔ Rain Backup
          </button>
        </div>

        {/* TAB 1: BUILD MY DAY FEATURE */}
        {activeTab === 'build' && (
          <div className="animate-fade-in">
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--color-teal)',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                CUSTOM SEQUENCE GENERATOR
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--color-navy)',
                margin: '2px 0 6px'
              }}>
                Build My Day
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Select places you feel like visiting, pick your dining vibe, and generate a gentle custom day flow starting right from your hotel base!
              </p>

              {/* City selector */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-navy)', display: 'block', marginBottom: '6px' }}>
                  1. Which City?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {Object.values(CITIES).map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCityForDay(c.id);
                        setGeneratedPlan(null);
                      }}
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: selectedCityForDay === c.id ? 'var(--color-navy)' : 'var(--color-cream)',
                        color: selectedCityForDay === c.id ? '#FFFFFF' : 'var(--color-navy)',
                        fontWeight: 700,
                        fontSize: '0.8rem'
                      }}
                    >
                      {c.flag} {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base */}
              <div style={{
                padding: '10px 12px',
                backgroundColor: 'var(--color-cream)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                marginBottom: '16px',
                border: '1px solid var(--color-border)'
              }}>
                🏨 <strong>Starting Base: </strong> {activeHotel.name}
              </div>

              {/* Checkbox places */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-navy)', display: 'block', marginBottom: '8px' }}>
                  2. Choose Places to Include:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[...city.officialPlaces, ...city.optionalPlaces].map(p => {
                    const checked = selectedPlaces.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleTogglePlace(p.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: checked ? 'var(--color-coral-light)' : '#FFFFFF',
                          border: checked ? '1px solid var(--color-coral)' : '1px solid var(--color-border)',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.86rem', fontWeight: checked ? 700 : 500, color: 'var(--color-navy)' }}>
                          {p.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Food selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-navy)', display: 'block', marginBottom: '6px' }}>
                  3. Food Preference:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Vegetarian', 'Indian Curries', 'Cozy Cafe', 'Asian Dim Sum'].map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFood(f)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: selectedFood === f ? '#B5670D' : 'var(--color-cream)',
                        color: selectedFood === f ? '#FFFFFF' : 'var(--color-navy)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleBuildDay}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <Sparkles size={16} />
                <span>Generate Suggested Day Sequence</span>
              </button>
            </div>

            {/* Generated Sequence Output */}
            {generatedPlan && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '22px 20px',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)' }}>
                    Your Suggested Sequence
                  </h4>
                  <span className="script-annotation">
                    family pace ✦
                  </span>
                </div>

                <div style={{
                  position: 'relative',
                  paddingLeft: '24px',
                  borderLeft: '2px dashed var(--color-teal)',
                  marginLeft: '6px'
                }}>
                  {generatedPlan.map((step, idx) => (
                    <div key={idx} style={{ position: 'relative', marginBottom: '18px' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-33px',
                        top: '2px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '3px solid var(--color-teal)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.65rem'
                      }}>
                        {step.icon}
                      </div>

                      <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-teal)' }}>
                        {step.time}
                      </div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                        {step.title}
                      </div>
                      {step.desc && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {step.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-text-light)',
                  fontStyle: 'italic',
                  marginTop: '12px'
                }}>
                  * This is a personal planning tool for inspiration, not a rigid tour schedule.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: OUR PICKS (FAVORITES) */}
        {activeTab === 'picks' && (
          <div className="animate-fade-in">
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--color-navy)',
              marginBottom: '6px'
            }}>
              Our Saved Places
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Items you tapped ♡ to save for the family trip.
            </p>

            {favorites.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--color-border)'
              }}>
                <Heart size={32} color="var(--color-coral)" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  No saved picks yet!
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                  Tap the heart on any attraction or restaurant card to save it here.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {favorites.map(item => (
                  <PlaceCard
                    key={item.id}
                    place={item}
                    activeHotel={activeHotel}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="animate-fade-in">
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--color-navy)',
              marginBottom: '6px'
            }}>
              Before You Go Checklist
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Essential travel prep reminders for Hong Kong, Shenzhen, and Macau.
            </p>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '16px',
              boxShadow: 'var(--shadow-card)'
            }}>
              {checklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: '0.86rem',
                      color: item.completed ? 'var(--color-text-light)' : 'var(--color-navy)',
                      textDecoration: item.completed ? 'line-through' : 'none',
                      fontWeight: item.completed ? 400 : 600
                    }}>
                      {item.text}
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: '0.68rem',
                      color: 'var(--color-teal)',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LITTLE NOTES */}
        {activeTab === 'notes' && (
          <div className="animate-fade-in">
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--color-navy)',
              marginBottom: '6px'
            }}>
              Little Notes
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
              Saved automatically to your phone's browser storage. No login or internet required.
            </p>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '16px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={12}
                placeholder="Type your family reminders, flight numbers, souvenir ideas..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical',
                  fontSize: '0.92rem',
                  lineHeight: '1.6',
                  color: 'var(--color-navy)',
                  backgroundColor: 'transparent'
                }}
              />
              <div style={{
                fontSize: '0.74rem',
                color: 'var(--color-teal)',
                textAlign: 'right',
                marginTop: '8px',
                fontWeight: 600
              }}>
                ✓ Autosaved locally
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RAINY DAY BACKUP */}
        {activeTab === 'rain' && (
          <div className="animate-fade-in">
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--color-navy)',
              marginBottom: '6px'
            }}>
              Rainy Day Backups ☔
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              If weather gets drizzly or tropical rain arrives, here are the top 100% sheltered, air-conditioned options:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-coral)'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-coral-dark)' }}>HONG KONG</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
                  New Town Plaza (Sha Tin) & Citygate Outlets
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '4px' }}>
                  Multi-level mega malls directly connected to MTR stations with cinemas, children play areas, and hundreds of shops under cover.
                </p>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-teal)'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-teal)' }}>MACAU</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
                  The Venetian & teamLab SuperNature
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '4px' }}>
                  Spend an entire rainy day entirely indoors: teamLab digital labyrinth, indoor gondola canals, and connected airbridges to Parisian and Londoner.
                </p>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-sage-dark)'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-sage-dark)' }}>SHENZHEN</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
                  SEG Plaza & Shenzhen Civic Museum
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '4px' }}>
                  Multi-story tech bazaars at Huaqiangbei and spacious air-conditioned galleries at the Shenzhen Museum.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
