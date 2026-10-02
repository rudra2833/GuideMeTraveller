You are an expert frontend engineer, UI/UX designer, travel-product designer, and static-site developer.

I want you to build a complete mobile-first travel planner website called:

guideMeTraveller

The website is for a family trip to:

Hong Kong → Shenzhen → Macau → Hong Kong

Trip dates:
7 November 2026 onward

The website should NOT look like a generic Bootstrap website, admin dashboard, Google Travel clone, or boring corporate tourism page.

It should feel like a beautiful, cute, premium, hand-designed TRAVEL PLANNER / TRAVEL JOURNAL.

The attached image is the visual inspiration.

IMPORTANT:
Use the attached image only as VISUAL INSPIRATION.
Do not copy the artwork, logo, text, or exact composition.

The visual direction should be:
- soft
- cute
- relaxed
- premium
- editorial
- planner/journal-like
- slightly scrapbook-like
- tourist/travel themed
- warm
- family-friendly
- very readable
- mobile-first

==================================================
1. SOURCE OF TRUTH — ITINERARY PDF
==================================================

There is an attached PDF itinerary.

Treat the PDF as the primary source of truth for the actual booked/tour itinerary.

Do NOT invent the core itinerary.

The PDF contains this overall route:

Hong Kong (2 nights)
→ Shenzhen (2 nights)
→ Macau (2 nights)
→ Hong Kong (1 night)

The PDF itinerary includes:

DAY 1
Arrive Hong Kong Airport
→ Victoria Peak
→ one-way Peak Tram ride
→ Madame Tussauds
→ dinner
→ hotel

DAY 2
Full-day Hong Kong Disneyland
→ dinner
→ hotel

DAY 3
Depart Hong Kong for Shenzhen
→ China immigration
→ 2 government shops
→ Window of the World
→ dinner
→ hotel

DAY 4
Free day in Shenzhen
→ dinner
→ hotel

DAY 5
Check out from Shenzhen
→ ferry to Macau
→ immigration
→ lunch
→ Macau city tour
→ Ruins of St. Paul's
→ Macau Tower
→ dinner
→ hotel

DAY 6
Free day in Macau
→ dinner
→ hotel

DAY 7
Check out from Macau
→ ferry to Hong Kong
→ Ocean Park
→ dinner
→ overnight in Hong Kong

DAY 8
Departure from Hong Kong

The PDF specifically identifies these major sightseeing attractions:
- Victoria Peak
- Peak Tram
- Madame Tussauds
- Hong Kong Disneyland
- Window of the World
- Ruins of St. Paul's
- Macau Tower
- Ocean Park

The PDF also states that the itinerary is tentative and the final itinerary can be slightly changed depending on ticket availability and sightseeing time slots.

Therefore the website must display an appropriate note such as:

"Your tour operator's final itinerary may change slightly. Always check the final itinerary, ticket timing and tour-manager instructions."

Do not present our website's timings as guaranteed tour timings.

==================================================
2. HOTELS — VERY IMPORTANT LOGIC
==================================================

There must be TWO hotel options for every city.

HONG KONG:

Hotel 1:
Courtyard by Marriott Hong Kong Sha Tin
(or Similar)

Hotel 2:
Four Points by Sheraton Hong Kong, Tung Chung
(or Similar)

SHENZHEN:

Hotel 1:
Holiday Inn Express Shenzhen Dongmen
(or Similar)

Hotel 2:
Century Kingdom Hotel
(or Similar)

MACAU:

Hotel 1:
The Venetian Macao Resort Hotel
(or Similar)

Hotel 2:
The Parisian Macao
(or Similar / alternative hotel option)

IMPORTANT:
The PDF officially lists The Venetian Macao Resort Hotel as the Macau hotel.
The second Macau hotel is an alternative planning option for this website because the user wants two selectable hotel bases.

Make it VERY clear that the second hotel is an alternative planning base and is NOT necessarily the hotel confirmed by the tour operator.

For example:

"Hotel option 2 is provided as an alternate planning base. Your final confirmed hotel should be checked against the tour operator's final hotel voucher."

==================================================
3. HOTEL-DEPENDENT EXPERIENCE
==================================================

This is one of the MOST IMPORTANT features.

The website must dynamically change recommendations depending on the selected hotel.

Example:

HONG KONG

[ Hotel 1 ]
Courtyard by Marriott Hong Kong Sha Tin

[ Hotel 2 ]
Four Points by Sheraton Hong Kong, Tung Chung

If the user selects Hotel 1:

Show:
"Your Hong Kong base"
Courtyard by Marriott Hong Kong Sha Tin

Then calculate/display:

Hotel → Victoria Peak
Hotel → Disneyland
Hotel → Ocean Park
Hotel → nearby restaurants
Hotel → optional nearby places

If the user selects Hotel 2:

Change everything to:

"Your Hong Kong base"
Four Points by Sheraton Hong Kong, Tung Chung

Then calculate/display:

Hotel → Victoria Peak
Hotel → Disneyland
Hotel → Ocean Park
Hotel → nearby restaurants
Hotel → optional nearby places

The exact same system must work for Shenzhen and Macau.

DO NOT create separate websites.

Use one data structure and dynamically switch the active hotel.

For example:

city:
  hotels:
    hotel1:
    hotel2:

and:

places:
  each place should have coordinates
  each place should have Google Maps query
  each place should have approximate distance/time from each hotel

==================================================
4. CORE USER FLOW
==================================================

The website should feel like a personal travel planner.

HOME SCREEN:

Show:

guideMeTraveller

"OUR HONG KONG • SHENZHEN • MACAU JOURNEY"

7/8 day journey

Then a beautiful travel-journal style hero.

Example visual:

┌─────────────────────────────┐
│        guideMeTraveller     │
│                             │
│  HONG KONG                  │
│       ↓                     │
│  SHENZHEN                   │
│       ↓                     │
│  MACAU                      │
│       ↓                     │
│  HONG KONG                  │
│                             │
│  7 NOV — 14 NOV 2026        │
└─────────────────────────────┘

Then quick navigation:

[ Hong Kong ]
[ Shenzhen ]
[ Macau ]

Then:

"Your Journey"

Day 1
Day 2
Day 3
...
Day 8

==================================================
5. DAY-BY-DAY PLANNER
==================================================

Create a beautiful vertical travel timeline.

Example:

DAY 01
7 NOV
HONG KONG

✈ Arrive Hong Kong
↓
🏙 Victoria Peak
↓
🚋 Peak Tram
↓
📸 Madame Tussauds
↓
🍽 Dinner
↓
🏨 Hotel

Each day should be visually like a planner page.

Use:
- numbered circles
- hand-drawn arrows
- soft blobs
- small travel icons
- dotted lines
- tiny notes
- location chips
- time/travel chips

But do not make it childish.

It should look premium and tasteful.

==================================================
6. CITY PAGES
==================================================

Each city gets its own page.

Example:

HONG KONG
"Hello, Hong Kong!"

Then:

[ Choose your hotel ]

○ Hotel 1
Courtyard by Marriott Hong Kong Sha Tin

○ Hotel 2
Four Points by Sheraton Hong Kong, Tung Chung

When the user selects a hotel, show:

"Your base"

Hotel name

Approximate location

"Everything below is planned from this hotel."

Then:

CORE ITINERARY

1. Victoria Peak
2. Peak Tram
3. Madame Tussauds
4. Hong Kong Disneyland
5. Ocean Park

Then:

NEARBY IDEAS

Additional places that are close to the selected hotel.

Then:

FOOD

Vegetarian / Jain-friendly / Indian / casual food suggestions where available.

==================================================
7. MAP
==================================================

Use a REAL ROAD MAP.

Do NOT use satellite imagery.

Use:
Leaflet
+
OpenStreetMap road tiles

The map should show:

HOTEL
as a special dark/navy marker

DESTINATIONS
as numbered coral markers:

1
2
3
4
5

Example:

       ③
        \
         \
 HOTEL ★ —— ①
          \
           ②

When a user taps a marker:

Show a small card:

01
Victoria Peak

~X km
~X min

Suggested:
🚕 Taxi
🚇 MTR
🚶 Walk

[ Open in Google Maps ]

The map must update whenever the selected hotel changes.

==================================================
8. DISTANCE + TRAVEL TIME
==================================================

Every destination card should contain:

Distance:
e.g.
~3.2 km

Travel time:
e.g.
~10–15 min

Suggested transport:
🚕 Taxi
🚇 MTR
🚌 Bus
🚶 Walk

IMPORTANT:

Do not pretend approximate travel times are live traffic information.

Label them:

"Approximate travel time"

or

"Typical travel time"

Add:

"Travel time may vary with traffic, queues and transport conditions."

For live navigation, provide:

[ Open Google Maps ]

Google Maps should be used for:
- live navigation
- current traffic
- current public transport
- exact routing

==================================================
9. GOOGLE MAPS
==================================================

Every place should have:

[ Open in Google Maps ]

and optionally:

[ Directions from my hotel ]

The destination query should be generated dynamically from the selected hotel and place.

Do not hard-code only one hotel's Google Maps link.

For example:

Directions from:
Courtyard by Marriott Hong Kong Sha Tin

to:
Victoria Peak

If the user changes hotel:

Directions from:
Four Points by Sheraton Hong Kong, Tung Chung

to:
Victoria Peak

==================================================
10. HONG KONG — CORE PDF LOCATIONS
==================================================

These are the core locations that must be represented because they are explicitly part of the itinerary:

1. Victoria Peak

2. Peak Tram

3. Madame Tussauds Hong Kong

4. Hong Kong Disneyland

5. Ocean Park Hong Kong

Do not replace these with unrelated attractions.

==================================================
11. HONG KONG — OPTIONAL DISCOVERY LOCATIONS
==================================================

For free time or nearby recommendations, the planner may include:

- New Town Plaza
- Snoopy's World
- Shing Mun River Riverside
- Hong Kong Heritage Museum
- Sha Tin Che Kung Temple
- Ten Thousand Buddhas Monastery
- Sha Tin Park

Around Tung Chung:

- Citygate Outlets
- Tung Chung Fort
- Tung Chung Promenade
- Ngong Ping 360
- Tian Tan Buddha
- Tai O Fishing Village
- Airport South / plane spotting area

IMPORTANT:

These are OPTIONAL DISCOVERY recommendations.

Clearly distinguish:

"Official itinerary"

from:

"Optional nearby ideas"

Do not make optional places appear as though the tour operator has included them.

Snoopy's World is at New Town Plaza and currently has listed hours of 11:00–19:00; its official page also notes that the Pets Park area is undergoing upgrades. Because the trip is in November 2026, verify the latest status before displaying time-sensitive information.

Official source:
New Town Plaza / Snoopy's World.

==================================================
12. SHENZHEN — CORE PDF LOCATIONS
==================================================

Core itinerary:

1. Shenzhen Government Shops
2. Window of the World

IMPORTANT:

The PDF says that two government shops are visited.

Do NOT invent their exact names or locations.

Instead display:

"Government Shop Visit"

"Two government-shop visits are included in the tour itinerary. Exact shop locations should be confirmed with the tour manager on the day."

This is better than inventing a location.

==================================================
13. SHENZHEN — OPTIONAL DISCOVERY
==================================================

For Shenzhen free day:

Possible optional places:

- Dongmen Old Street
- People’s Park
- Lizhi Park
- Huaqiangbei Electronics Street
- SEG Electronics Market / SEG Plaza
- Shenzhen Library / Book City
- Shenzhen Museum
- Buji Old Street
- Dafen Oil Painting Village
- Buji Park
- Wenbo Palace / cultural area

These are optional.

The planner should show them under:

"FREE DAY IDEAS"

not under official tour itinerary.

==================================================
14. MACAU — CORE PDF LOCATIONS
==================================================

Core itinerary:

1. Ruins of St. Paul's
2. Macau Tower

These MUST appear prominently.

The PDF specifically describes Macau as a mix of Portuguese and Chinese culture.

The Ruins of St. Paul's are part of the official itinerary.

The Macau Tower observation deck is also part of the itinerary.

==================================================
15. MACAU — OPTIONAL DISCOVERY
==================================================

For Macau free day, include optional recommendations such as:

- The Venetian Macao
- Shoppes at Venetian
- Grand Canal
- teamLab SuperNature Macao
- The Parisian Macao
- Eiffel Tower / Eiffel Tower viewing area
- The Londoner Macao
- Taipa Village
- Rua do Cunha
- Taipa Houses
- Coloane Village
- Hac Sa Beach

These should be clearly labelled:

"FREE DAY IDEAS"

not official tour inclusions.

teamLab SuperNature Macao is located at Cotai Expo, The Venetian Macao. Its official site currently lists daily hours of 11:00–19:00 with last entry at 18:15, but this must be rechecked closer to November 2026.

==================================================
16. RESTAURANT / FOOD SECTION
==================================================

Create a dedicated:

"FOOD NEAR YOUR HOTEL"

section.

This should change based on hotel selection.

The user's family is interested in vegetarian-friendly food.

Include categories:

🥬 Vegetarian
🇮🇳 Indian
🌱 Vegan
🍜 Asian
☕ Cafe
🏨 Hotel dining

Do not claim that every restaurant is fully vegetarian.

Clearly indicate:

Vegetarian
Vegan
Vegetarian-friendly
Indian
Jain-friendly if verified

Never invent Jain certification.

==================================================
17. RESTAURANTS / FOOD DISCOVERED
==================================================

HONG KONG — SHA TIN AREA:

- Wo Che Estate Vegetarian Restaurant
- Home Veggie
- MoMo Cafe – Courtyard

HONG KONG — TUNG CHUNG AREA:

- Oolaa Tung Chung
- Tung Chung Kitchen – Four Points
- Handi Indian Restaurant
- Paradise Dynasty – Citygate

SHENZHEN — DONGMEN / LUOHU:

- Pinchaju Vegetarian Restaurant
- Bollywood Indian Restaurant – Luohu
- Holiday Inn Express Great Room

SHENZHEN — BUJI:

- Century Kingdom Hotel restaurants / cafe
- Bollywood Indian Restaurant – Luohu
- Yiye Yishijie Tibetan Tea Vegetarian Hotpot

MACAU:

- The Coffee Academics – Venetian
- The Blissful Carrot
- Portugalia
- Puffin Cafe
- Veggie Macau

IMPORTANT:

These are recommendations discovered during research, NOT official tour inclusions.

Restaurant information can change.

The coding agent must structure restaurant data so that:
- opening hours can be updated
- address can be updated
- Google Maps link can be updated
- cuisine tags can be updated
- vegetarian status can be updated

If current information is unavailable, say:

"Check current opening hours before visiting."

Do not invent opening hours.

==================================================
18. RESTAURANT CARD
==================================================

Each restaurant should look like a little planner card.

Example:

┌───────────────────────────┐
│ 🍃 VEGETARIAN             │
│                           │
│ Home Veggie               │
│                           │
│ ★ Vegetarian-friendly     │
│                           │
│ ~1.4 km from your hotel  │
│ ~5–10 min                 │
│                           │
│ Good for: Lunch / Dinner │
│                           │
│ [ Google Maps ]           │
└───────────────────────────┘

Add:

"Why we picked it"

Example:

"Easy option when you want something casual and vegetarian without making a long trip."

==================================================
19. TIPS FOR EVERY PLACE
==================================================

THIS IS VERY IMPORTANT.

Every attraction and restaurant should have:

"Traveller Tip"

For example:

Victoria Peak:
"Try to visit around sunset if your schedule allows. Visibility depends heavily on weather."

Hong Kong Disneyland:
"Keep the whole day free. Wear comfortable shoes and check attraction schedules before entering."

Ocean Park:
"Expect substantial walking. Carry water and wear comfortable shoes."

Window of the World:
"Allow enough time to explore beyond the main photo spots."

Ruins of St. Paul's:
"Go earlier or later in the day if you want a less crowded photo."

Macau Tower:
"Check observation/weather conditions before heading up."

Taipa Village:
"Good option for a relaxed walking afternoon rather than rushing through multiple attractions."

Tung Chung:
"Useful area for combining Citygate, promenade and Lantau activities."

Tai O:
"Plan transport time carefully because it is farther from Tung Chung."

Dafen:
"Good optional free-day idea if the family enjoys art and browsing."

Huaqiangbei:
"Useful if the family is interested in electronics, gadgets and Shenzhen's electronics district."

The tips must be:
- practical
- short
- family-friendly
- not exaggerated
- clearly labelled as suggestions

==================================================
20. PLACE DETAIL PAGE
==================================================

Clicking a place should open a beautiful detail page.

Structure:

← Back

[ large photo ]

VICTORIA PEAK

Hong Kong

★★★★★ / optional rating only if sourced
DO NOT invent ratings.

SHORT DESCRIPTION

Why go:
...

Traveller tip:
...

From your hotel:

🏨 Courtyard by Marriott Hong Kong Sha Tin

~X km
~X min

Suggested transport:
🚕 Taxi
🚇 MTR
🚶 Walk

[ Open Google Maps ]

[ Add to My Plan ]

[ Add to Map ]

Photos:
Show multiple online photos when legally/technically appropriate.

If reliable image sources cannot be embedded:

Use one main image and:

[ View more photos ]

which opens an image search / official page.

Do not hotlink copyrighted images blindly.

Prefer:
- official tourism websites
- official attraction websites
- Wikimedia Commons
- openly licensed images

==================================================
21. MAP EXPERIENCE
==================================================

Create a dedicated MAP screen.

Header:

YOUR MAP

"Starting from:
Courtyard by Marriott Hong Kong Sha Tin"

Then:

[ Hotel marker ]

1 Victoria Peak
2 Disneyland
3 Ocean Park
...

Use a clean real-road map.

Do NOT use a decorative fake map.

Use:
Leaflet + OpenStreetMap.

If routing API is available and appropriate:
use real route geometry.

If not:
show approximate distance/time and use Google Maps for live directions.

Never draw a fake "route" and claim that it is the real road route.

==================================================
22. "BUILD MY DAY" FEATURE
==================================================

Create a planner feature:

BUILD MY DAY

Example:

START:
🏨 Hotel

THEN:

☑ Victoria Peak
☑ Madame Tussauds
☐ Disneyland
☐ Ocean Park

FOOD:
☑ Vegetarian
☐ Indian
☐ Cafe

Then:

[ BUILD MY DAY ]

The website generates a simple suggested sequence.

Example:

09:00
🏨 Leave hotel

10:00
🏙 Victoria Peak

12:30
🍽 Lunch

14:00
📸 Madame Tussauds

17:30
☕ Cafe

19:00
🏨 Return

IMPORTANT:
This is a suggested planning tool, NOT the official tour schedule.

Do not conflict with the official itinerary.

==================================================
23. FREE DAY MODE
==================================================

Days 4 and 6 are FREE DAYS in the PDF.

Make this visually obvious.

For example:

FREE DAY 🌿

"No fixed sightseeing today."

Then show:

NEAR YOUR HOTEL

FOOD

SHOPPING

FAMILY ACTIVITIES

EASY WALK

OPTIONAL DAY TRIP

This is where the optional discoveries should be most useful.

For Shenzhen:
- Dongmen
- Huaqiangbei
- SEG
- parks
- museums
- Dafen

For Macau:
- Taipa Village
- Venetian
- teamLab
- Parisian
- Londoner
- Coloane
- Hac Sa Beach

==================================================
24. HOTEL COMPARISON
==================================================

When choosing hotels, show a simple comparison.

Example:

HONG KONG

HOTEL 1
Courtyard by Marriott
Sha Tin

Best base for:
- Sha Tin
- New Territories
- Heritage
- family exploring

HOTEL 2
Four Points
Tung Chung

Best base for:
- Airport area
- Lantau
- Disneyland access planning
- Ngong Ping
- Tai O
- Citygate

Do NOT rank the hotels as "best" unless there is a factual reason.

Use:
"Good for..."
rather than:
"Best hotel."

==================================================
25. HOTEL SWITCHER UI
==================================================

Make this visually beautiful.

Example:

YOUR HONG KONG BASE

┌────────────────────────────┐
│ ① COURTYARD                │
│    Sha Tin                 │
│                            │
│    [ SELECTED ✓ ]          │
└────────────────────────────┘

or

┌────────────────────────────┐
│ ② FOUR POINTS             │
│    Tung Chung              │
│                            │
│    [ SELECT ]              │
└────────────────────────────┘

When switched:

Animate the map and cards smoothly.

Do NOT reload the page.

==================================================
26. DESIGN LANGUAGE
==================================================

The attached image is the main visual inspiration.

Use a palette approximately around:

Warm Cream
#FFF8F1

Soft Coral
#EFA7A0

Muted Blush
#F4C6C1

Sage Green
#91AAA2

Deep Teal
#557B76

Dark Navy
#1F3436

Soft Beige
#E9DED2

Do not use all colours everywhere.

Keep the UI mostly:
cream + dark text

with coral and sage as accents.

==================================================
27. BACKGROUND STYLE
==================================================

Use subtle decorative backgrounds.

Ideas:

- abstract organic blobs
- hand-drawn strokes
- tiny dots
- curved lines
- soft paper texture
- subtle grid
- faint travel stamps
- tiny airplane doodles
- small compass illustrations
- hand-drawn arrows

Do NOT make it visually noisy.

The background should remain behind the content.

Cards should remain extremely readable.

==================================================
28. HERO SECTION
==================================================

The homepage hero should feel like a planner cover.

Example:

guideMeTraveller

OUR LITTLE
ASIA ADVENTURE

HONG KONG
×
SHENZHEN
×
MACAU

07 — 14 NOV 2026

Then perhaps:

"8 days • family trip • food • city lights • memories"

Use decorative organic shapes inspired by the attached image.

==================================================
29. TYPOGRAPHY
==================================================

Use a combination of:

Display font:
DM Serif Display
or
Playfair Display

Body:
Manrope
Inter
or
DM Sans

Do not use too many fonts.

The heading should feel editorial.

Body should be extremely readable on mobile.

==================================================
30. MOBILE-FIRST DESIGN
==================================================

THIS WEBSITE WILL MOSTLY BE USED ON PHONES.

Design for:

iPhone
Android
small Android phones
large phones

Minimum target:
360px width.

The website must NOT require desktop.

Mobile navigation should use:

bottom navigation

for example:

🏠 Home
📅 Days
📍 Explore
🗺 Map
☰ More

Keep the navigation thumb-friendly.

Buttons must have comfortable tap targets.

Do not use tiny links.

==================================================
31. DESKTOP RESPONSIVENESS
==================================================

It should also work on:

tablet
laptop
desktop

But desktop is secondary.

On desktop:
- max content width
- centered planner
- two-column sections where appropriate
- larger map
- side-by-side cards

On mobile:
- single-column
- sticky bottom navigation
- full-width cards
- horizontal scrolling chips where appropriate

==================================================
32. PHOTO STYLE
==================================================

Use large rounded image cards.

Image ratio:
4:3 or 16:10.

Use:
border-radius
18px–28px

Do not make every image perfectly rectangular if a scrapbook effect looks better.

Some cards can use:
- tilted photo
- tape effect
- photo frame
- small handwritten caption

But keep it tasteful.

==================================================
33. REAL MAP
==================================================

Use:

Leaflet

OpenStreetMap

Do not use satellite imagery.

Map styling should be simple and light.

The map should visually match the planner:
- clean
- soft
- not overloaded

Hotel marker:
dark navy / deep teal

Destination marker:
coral

Selected marker:
larger coral circle

Numbered markers:
1
2
3
4
...

==================================================
34. DATA ARCHITECTURE
==================================================

Keep all trip data in one structured JavaScript object.

Example:

const tripData = {

  cities: {

    hongKong: {

      hotels: {

        hotel1: {
          name: "...",
          lat: ...,
          lng: ...,
          mapQuery: "..."
        },

        hotel2: {
          name: "...",
          lat: ...,
          lng: ...,
          mapQuery: "..."
        }

      },

      officialPlaces: [...],

      optionalPlaces: [...],

      restaurants: [...]

    }

  }

};

Every place should contain:

{
  id,
  name,
  city,
  category,
  description,
  tip,
  lat,
  lng,
  image,
  imageSources,
  googleMapsQuery,
  transport,
  approximateTimes,
  hotelDistances
}

==================================================
35. DO NOT HARD-CODE HOTEL-SPECIFIC HTML
==================================================

Do not create:

hong-kong-hotel-1.html
hong-kong-hotel-2.html

Instead:

ONE data model
+
ONE reusable component
+
selectedHotel state.

When selected hotel changes:

update:
- map
- distances
- travel times
- directions
- restaurant distance
- nearby places
- hotel header
- suggested itinerary

==================================================
36. HOTEL DISTANCE DATA
==================================================

For each hotel → place combination, store either:

real calculated route distance/time

OR

clearly labelled approximate values.

Do not fabricate precision.

Prefer:

"~3 km"

rather than:

"3.17 km"

unless using actual routing data.

Prefer:

"~10–15 min"

rather than:

"11 min"

unless actual routing data supports it.

==================================================
37. LIVE DATA
==================================================

Because this trip is in NOVEMBER 2026:

Time-sensitive information should not be treated as permanent.

For:
- attraction hours
- restaurant hours
- temporary closures
- events
- ticket rules
- transport schedules

show:

"Check before visiting"

where appropriate.

If a source provides current information, store:

lastVerified

and:

source

==================================================
38. SOURCES
==================================================

Where appropriate, include:

"Source"

links.

Useful sources include:

Hong Kong Tourism Board
Shenzhen tourism/government sources
Macao Government Tourism Office
official attraction websites
official hotel websites
New Town Plaza
Sands Resorts / Venetian
Wikimedia Commons for openly licensed photos

Do not use random SEO travel websites as the primary authority when an official source exists.

==================================================
39. IMPORTANT CURRENT RESEARCH FINDINGS
==================================================

Use these as research leads, but verify current information before final implementation.

Snoopy's World:
Located at New Town Plaza, Sha Tin.
Official page currently lists:
Outdoor Platform, L3, Phase 1
Mon–Sun 11:00–19:00
The official page currently says the Pets Park is undergoing upgrades and is expected to reopen in October.

teamLab SuperNature Macao:
Located at Cotai Expo, The Venetian Macao.
Official source currently lists:
Daily 11:00–19:00
Last entry 18:15.

Ruins of St. Paul's:
Official Macao tourism information identifies the site at Company of Jesus Square.
Current official information lists the Ruins of St. Paul's as accessible 09:00–18:00, with last admission 17:30, while the Sacred Art Museum/Crypt has different access details.

IMPORTANT:
These hours can change before November 2026.

==================================================
40. PLACE RECOMMENDATION LOGIC
==================================================

Every recommendation should have a reason.

Example:

"Why this place?"

"Good for families"

"Good for a free afternoon"

"Good for photos"

"Good for food"

"Good if you're already nearby"

"Easy from your hotel"

"Good rainy-day backup"

This makes the website feel like a real human travel planner.

==================================================
41. WEATHER / RAIN BACKUP
==================================================

Add:

RAINY DAY BACKUP ☔

This is particularly useful for Hong Kong/Macau.

Examples:

Hong Kong:
- malls
- museums
- Disneyland indoor attractions
- cafes
- Citygate

Macau:
- Venetian
- teamLab
- indoor attractions
- Taipa restaurants

Shenzhen:
- SEG / Huaqiangbei
- museums
- malls
- indoor attractions

Do not overcomplicate it.

==================================================
42. FAMILY-FRIENDLY INFORMATION
==================================================

Every place can optionally show:

👨‍👩‍👧 Family friendly
🚶 Walking level
☔ Rain backup
📸 Photo spot
🍽 Food nearby
🕐 Suggested duration

Example:

WALKING:
Moderate

TIME:
2–3 hours

GOOD FOR:
Family • Photos • Views

==================================================
43. PLANNER CHECKLIST
==================================================

Add a small checklist section.

Example:

BEFORE YOU GO

☐ Passport
☐ Hotel confirmation
☐ Flight tickets
☐ Travel insurance
☐ Phone / eSIM
☐ Power bank
☐ Comfortable shoes
☐ Umbrella
☐ Google Maps access
☐ Important booking screenshots

Do not turn this into a giant checklist.

==================================================
44. TRIP NOTES
==================================================

Allow users to write notes locally.

Example:

"My Notes"

[ textarea ]

Save using localStorage.

No backend.

Notes should remain on the user's phone/browser.

==================================================
45. FAVORITES
==================================================

Allow:

♡ Save

on:
- attractions
- restaurants
- places

Saved places should appear under:

MY PICKS

Use localStorage.

==================================================
46. NO BACKEND
==================================================

This must be a STATIC WEBSITE.

No backend.

No database.

No login.

No server required.

Use:
HTML
CSS
JavaScript

You may use:
Leaflet
OpenStreetMap
Google Maps links
localStorage

CDN dependencies are acceptable.

The final site must work by simply opening index.html.

==================================================
47. PWA
==================================================

Make it installable as a basic PWA.

Include:

manifest.webmanifest

service worker

app icon

theme color

This is useful because the family can add:

guideMeTraveller

to their phone home screen.

==================================================
48. OFFLINE BEHAVIOUR
==================================================

The core planner should still work if internet is unavailable:

- itinerary
- hotel selection
- notes
- favorites
- basic place information

Maps and external photos may require internet.

Show:

"Map requires internet"

when appropriate.

==================================================
49. ERROR HANDLING
==================================================

If an image fails:

show a beautiful placeholder.

If map tiles fail:

show:

"Map unavailable — open Google Maps instead."

If a restaurant cannot be verified:

show:

"Details should be checked before visiting."

Never show broken UI.

==================================================
50. ACCESSIBILITY
==================================================

Use:

semantic HTML

good contrast

keyboard navigation

alt text

aria-labels where needed

large touch targets

Do not rely only on colour to communicate state.

==================================================
51. ANIMATION
==================================================

Use subtle animation.

Examples:

- card fade-in
- hotel switch transition
- marker selection
- bottom-sheet opening
- page transitions

Do NOT use excessive animations.

The website should feel calm.

==================================================
52. SCRAPBOOK DETAILS
==================================================

Use subtle decorative details:

✈ tiny airplane
📍 location pin
☀ sun doodle
☁ cloud
✦ stars
→ hand-drawn arrows
~ curved lines
small dots

Use them sparingly.

The reference image has organic hand-drawn shapes.

Recreate the FEELING, not the exact artwork.

==================================================
53. HOME PAGE STRUCTURE
==================================================

Recommended structure:

1. Planner cover
2. Trip route
3. Quick city buttons
4. Today's / next day card
5. Full itinerary
6. Hotel bases
7. Explore
8. Food
9. Map
10. My Picks
11. Notes
12. Trip checklist

==================================================
54. BOTTOM NAVIGATION
==================================================

Mobile:

HOME
DAYS
EXPLORE
MAP
MORE

Explore should open:

Places
Food
Free Day
Rainy Day
My Picks

==================================================
55. DAY DETAIL PAGE
==================================================

Example:

DAY 01

7 NOVEMBER

HONG KONG

ARRIVAL DAY

Timeline:

✈ Arrival
↓
🏙 Victoria Peak
↓
🚋 Peak Tram
↓
📸 Madame Tussauds
↓
🍽 Dinner
↓
🏨 Hotel

Then:

"Your hotel"

and:

"Nearby ideas if you have extra time"

==================================================
56. OFFICIAL VS OPTIONAL LABELS
==================================================

This distinction must be visually obvious.

Use badges:

TOUR ITINERARY

for places explicitly listed in the PDF.

Use:

OPTIONAL

for places researched separately.

Use:

FREE DAY IDEA

for free-day suggestions.

Use:

FOOD PICK

for restaurant recommendations.

Never mix them.

==================================================
57. TRANSPORT
==================================================

Transport should be displayed as suggestions.

Examples:

🚇 MTR
🚕 Taxi
🚌 Bus
🚶 Walk
⛴ Ferry
🚡 Cable Car

For the PDF route:

Hong Kong → Shenzhen
show the tour's road/transfer concept as described.

Shenzhen → Macau
show ferry.

Macau → Hong Kong
show ferry.

Do not claim exact ferry departure times unless verified from current official schedules.

==================================================
58. HOTEL MAP BASE
==================================================

Each hotel needs:
- name
- city
- approximate coordinates
- address if verified
- Google Maps query
- nearby places
- nearby restaurants

The map's central starting point should ALWAYS be the currently selected hotel.

==================================================
59. HOTEL-BASED OPTIONAL DISCOVERY
==================================================

This is where the site becomes really useful.

If Hotel 1 is selected:

rank/display optional locations by proximity to Hotel 1.

If Hotel 2 is selected:

rank/display optional locations by proximity to Hotel 2.

Do not use subjective ranking.

Use factual labels like:

"Closer to your hotel"

"~X km away"

"Easy taxi ride"

"Walkable"

"Longer trip"

==================================================
60. DO NOT OVERLOAD THE USER
==================================================

The family should be able to open the site and immediately understand:

Where am I?

Which hotel am I staying at?

What am I doing today?

Where should I go?

How far is it?

How do I get there?

Where can I eat?

What should I know?

That is the entire product philosophy.

==================================================
61. VISUAL HIERARCHY
==================================================

Important:
Do NOT put everything on the screen.

Use:

large heading
small description
one main action
cards
sections
whitespace

The website should breathe.

==================================================
62. MICROCOPY
==================================================

Use friendly language.

Instead of:

"Destination Database"

use:

"Places to Wander"

Instead of:

"Restaurants"

use:

"Where Should We Eat?"

Instead of:

"Transportation"

use:

"How Do We Get There?"

Instead of:

"Favorites"

use:

"Our Picks"

Instead of:

"Notes"

use:

"Little Notes"

Instead of:

"Free Day"

use:

"Slow Day 🌿"

==================================================
63. BRAND PERSONALITY
==================================================

guideMeTraveller should feel like:

"a little digital travel notebook made specially for our family."

Not:

"a tourism company's website."

==================================================
64. TECHNICAL QUALITY
==================================================

Write clean maintainable code.

Avoid one gigantic unreadable JavaScript function.

Use reusable functions/components.

Keep data separate from rendering logic.

Use CSS variables for theme colours.

Use responsive breakpoints.

Do not use inline styles everywhere.

No console errors.

No broken links.

No missing assets.

==================================================
65. FINAL TESTING
==================================================

Before finishing, test:

360px mobile
390px mobile
430px mobile
768px tablet
1024px desktop
1440px desktop

Test:

hotel switcher
city switcher
day navigation
map
Google Maps links
restaurant tabs
place detail pages
favorites
notes
localStorage
PWA installation
offline shell
image fallback
back navigation

Also test:

Hong Kong Hotel 1
Hong Kong Hotel 2

Shenzhen Hotel 1
Shenzhen Hotel 2

Macau Hotel 1
Macau Hotel 2

Make sure the distances/recommendations/maps update correctly.

==================================================
66. FINAL OUTPUT
==================================================

Create:

/guideMeTraveller/

index.html
manifest.webmanifest
sw.js
icon.svg
README.md

If additional assets are needed, place them inside:

assets/

The website must be deployable on:

GitHub Pages
Netlify
Vercel
Cloudflare Pages

with no backend.

==================================================
67. IMPORTANT FINAL RULE
==================================================

DO NOT just create a functional website.

Create a WEBSITE THAT LOOKS LIKE A REAL TRAVEL PLANNER.

It should make someone say:

"Whoa, this actually feels like our personal travel notebook."

The attached reference image is the visual mood:

soft pastel
organic
hand-drawn
minimal
cute
calm
editorial
travel journal

but the functionality should feel modern:

interactive
mobile-first
map-based
hotel-aware
dynamic
fast
responsive

The final result should combine:

SCRAPBOOK / PLANNER AESTHETIC

+

MODERN TRAVEL APP FUNCTIONALITY

+

REAL MAP

+

HOTEL-BASED RECOMMENDATIONS

+

DAY-BY-DAY ITINERARY

+

FOOD

+

TRAVELLER TIPS

+

GOOGLE MAPS

+

MOBILE-FIRST UX

==================================================
68. MOST IMPORTANT PRODUCT RULE
==================================================

The website should always answer:

"Where am I staying?"

"What's planned today?"

"What's nearby?"

"How far is it?"

"How do I get there?"

"Where can we eat?"

"What should I know before going?"

And if I change my hotel:

EVERYTHING SHOULD CHANGE AROUND THAT HOTEL.

That hotel-aware behaviour is one of the main features of guideMeTraveller.


























































>>>>>>>>>>


==================================================
NON-NEGOTIABLE VISUAL DESIGN DIRECTION
==================================================

The attached reference image defines the visual MOOD and DESIGN LANGUAGE
of this website.

The website must feel like:

PINTEREST TRAVEL JOURNAL
×
CUTE SCRAPBOOK PLANNER
×
MODERN MOBILE TRAVEL APP

This visual direction is NOT optional.

The important visual characteristics are:

- cream / off-white canvas
- dusty pink / soft coral accents
- muted sage green
- muted teal
- deep muted navy/green for text
- organic abstract blobs
- hand-drawn lines
- hand-drawn brush strokes
- little dots
- imperfect organic shapes
- lots of whitespace
- editorial serif display typography
- clean modern sans-serif body typography
- small handwritten-style labels
- paper / stationery feeling
- planner-card feeling
- subtle shadows
- rounded cards
- slightly imperfect scrapbook elements
- little travel doodles
- tiny arrows
- tiny location pins
- tiny airplanes
- stars / dots / decorative marks
- soft photographic cards
- subtle paper texture
- calm, warm, relaxed visual rhythm

DO NOT create a generic modern SaaS dashboard.

DO NOT make it look like:
- an admin panel
- a corporate travel agency
- a Bootstrap template
- a generic Google Maps clone
- a plain white React website
- a dark-mode tech dashboard

The UI should feel as if someone designed a beautiful physical
travel journal and then turned it into a modern mobile application.

Think:

"Someone opened a cute travel planner notebook on their phone."

The interface should have personality.

However, DO NOT sacrifice usability for decoration.

The decorative elements must remain subtle and stay behind the
actual travel information.

The user must still be able to immediately understand:

1. Where am I?
2. Which hotel am I staying at?
3. What am I doing today?
4. What places are nearby?
5. How far are they?
6. How long will it take?
7. How should I get there?
8. Where can we eat?
9. What is the traveller tip?
10. How do I open the place in Google Maps?

VISUAL PRIORITY:

1. Readability
2. Mobile usability
3. Travel-planner feeling
4. Beautiful visual composition
5. Decorative details

Never let decoration interfere with navigation or information.

==================================================
REFERENCE IMAGE INTERPRETATION
==================================================

Use the uploaded reference image as visual inspiration.

DO NOT copy the image itself.

DO NOT copy its logo, text, exact shapes, or exact composition.

Instead, extract its design language:

- soft pastel palette
- organic composition
- hand-made feeling
- imperfect shapes
- paper/art-journal feeling
- relaxed spacing
- soft contrast
- editorial typography
- playful but sophisticated composition

The final website should feel INSPIRED BY THE SAME DESIGN WORLD,
not like a copy of the reference image.

==================================================
MOBILE VISUAL EXPERIENCE
==================================================

Remember that this website will primarily be opened on FAMILY
PHONES during the trip.

Therefore the visual design must work beautifully at approximately:

360px
375px
390px
414px
430px

The planner should feel like a beautiful mobile travel notebook.

Cards should have comfortable padding.

Buttons should be thumb-friendly.

Text should be easy to read while walking/travelling.

Decorative elements must scale or disappear gracefully on smaller
screens.

Never allow decorative backgrounds to make text difficult to read.

On mobile, the experience should feel like:

"opening my personal travel planner"

rather than:

"using a website."

























































































>>>>
==================================================
HOME PAGE — TRAVEL NOTEBOOK COVER EXPERIENCE
==================================================

IMPORTANT:

DO NOT design the homepage like a conventional travel website
or dashboard.

Do NOT make the first screen look like:

Hong Kong
Shenzhen
Macau
Map
Restaurants
Hotels

Instead, the homepage should feel like the user is OPENING
THEIR PERSONAL TRAVEL NOTEBOOK.

The first screen should feel like a beautiful planner cover.

The experience should communicate:

"Welcome to our little Asia adventure."

Use a composition similar in spirit to:

--------------------------------------------------

                 guideMeTraveller

              our little Asia adventure

        HONG KONG → SHENZHEN → MACAU

                 07 — 14 NOV 2026

           8 days • 3 cities • lots of memories

                 ✦ ✈︎ ✦

--------------------------------------------------

Then introduce the current day:

                    TODAY

                   DAY 01

              HELLO, HONG KONG! 🇭🇰

                 ✈ Airport
                     ↓
              🏙 Victoria Peak
                     ↓
                🚋 Peak Tram
                     ↓
             📸 Madame Tussauds
                     ↓
                 🍽 Dinner
                     ↓
                  🏨 Hotel

--------------------------------------------------

                    YOUR BASE

             🏨 Courtyard by Marriott
                    Sha Tin

              [ Change Hotel ]

--------------------------------------------------

                EXPLORE TODAY'S PLAN →

--------------------------------------------------

This should NOT look like a plain vertical list.

Use the visual language of a physical travel planner:

- large editorial heading
- handwritten-style small labels
- decorative arrows
- tiny travel doodles
- organic background shapes
- subtle paper texture
- soft pastel colours
- little dots
- imperfect hand-drawn separators
- rounded paper/card sections
- lots of whitespace

The homepage should feel like:

"someone opened their travel journal"

rather than:

"someone opened a travel application."

==================================================
HOME PAGE INFORMATION HIERARCHY
==================================================

The homepage must immediately answer:

WHERE ARE WE GOING?

Hong Kong → Shenzhen → Macau → Hong Kong

WHEN?

07 — 14 NOV 2026

HOW LONG?

8 days • 3 cities

WHAT IS HAPPENING TODAY?

Show the current itinerary day.

WHERE ARE WE STAYING?

Show the currently selected hotel.

WHAT CAN WE DO?

Provide:

[ Explore Today's Plan ]

Then allow the user to continue into:

[ Full Itinerary ]
[ Explore Places ]
[ Food ]
[ Map ]

But these should NOT dominate the opening screen.

The opening screen is the TRAVEL NOTEBOOK COVER.

==================================================
THE HOTEL SHOULD FEEL PART OF THE JOURNEY
==================================================

The hotel must not feel like a separate boring hotel database.

It should appear naturally inside the planner:

YOUR BASE

🏨 Courtyard by Marriott
Sha Tin

"Your Hong Kong starting point"

Then:

[ Change Hotel ]

When the hotel changes, the homepage should update naturally.

For example:

YOUR BASE

🏨 Four Points by Sheraton
Hong Kong, Tung Chung

"Your Hong Kong starting point"

The nearby recommendations, distances, restaurants and map
must also change.

==================================================
THE CORE MAGIC OF THE WEBSITE
==================================================

The defining interaction of guideMeTraveller is:

CHANGE HOTEL
        ↓
THE ENTIRE NEARBY WORLD CHANGES

This must be obvious to the user.

For example:

SELECT:

Courtyard by Marriott Hong Kong Sha Tin

Then show:

- nearby places
- distances
- approximate travel times
- restaurants
- map starting point
- optional discoveries

based around Sha Tin.

If the user switches to:

Four Points by Sheraton Hong Kong, Tung Chung

the website should immediately change:

- nearby places
- distances
- approximate travel times
- restaurants
- map starting point
- optional discoveries

to the Tung Chung hotel.

The same behaviour must exist for:

Hong Kong
Shenzhen
Macau

This is NOT just a hotel selector.

It is a HOTEL-BASED TRAVEL PLANNER.

==================================================
HOMEPAGE EMOTIONAL FEEL
==================================================

The user should feel:

"Ahhh, this is OUR trip."

Not:

"Here is a list of tourist attractions."

The website should feel personal, warm and memorable.

Use phrases such as:

"Our little Asia adventure"

"Today's little plan"

"Your base"

"Places to wander"

"Where should we eat?"

"Little traveller tip"

"Slow day"

"Ready for today?"

But keep the language tasteful and not overly childish.

==================================================
DESKTOP VS MOBILE
==================================================

On desktop, the notebook cover can become a wider editorial
composition.

On mobile, preserve the feeling of opening a planner page.

Do NOT simply shrink the desktop homepage.

Create a deliberately designed mobile composition.

Mobile should prioritize:

1. Trip title
2. Today's day
3. Today's timeline
4. Hotel/base
5. Main action

Everything else can be reached through navigation.

==================================================
FINAL HOMEPAGE TEST
==================================================

Before considering the homepage complete, ask:

"If I opened this website on my phone at the airport,
would it feel like opening my family's personal travel notebook?"

If the answer is no, redesign the homepage.

The homepage should NOT feel like:

- a dashboard
- a hotel booking site
- a tourism directory
- a database
- an admin panel

It should feel like:

A BEAUTIFUL DIGITAL TRAVEL JOURNAL
WITH THE POWER OF A MODERN TRAVEL APP.

















































































>>>>

