const mockItineraries = {
  "hyderabad_gokarna_relaxed": {
    destinations: [
      {
        name: "Gokarna, Karnataka",
        whyFits: "It offers serene, relatively uncrowded beaches and scenic cliff walks, paired with a rich temple culture that ensures abundant, high-quality vegetarian food.",
        downside: "Strong monsoon currents make entering the sea or swimming highly unsafe, and all water sports are suspended.",
        costTier: "Mid-range"
      },
      {
        name: "Araku Valley, Andhra Pradesh",
        whyFits: "A tranquil, budget-friendly hill station with lush green valleys and coffee plantations that look spectacular during the rains.",
        downside: "Mist and heavy downpours can severely restrict visibility at viewpoint locations, and local transport options inside the valley are sparse.",
        costTier: "Budget"
      },
      {
        name: "Chikmagalur, Karnataka",
        whyFits: "A premium coffee-country hill station featuring cozy homestays, misty peaks, and a highly relaxed, slow-paced atmosphere.",
        downside: "The journey from Hyderabad takes 11–12 hours by road or train, which eats into a short 4-day itinerary.",
        costTier: "Mid-range"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Coastal Air",
        morning: "Arrive in Gokarna via overnight KSRTC sleeper bus. Check into a clifftop homestay overlooking Kudle Beach. Freshen up and unpack.",
        afternoon: "Take a slow walk down to Kudle Beach. Have a relaxed lunch featuring local vegetarian wood-fired pizza at one of the beachside cafes.",
        evening: "Enjoy a peaceful walk along the Kudle cliffside as the sun sets. Dinner at the homestay.",
        weatherFlag: false,
        bookingFlag: false,
        stops: [
          { name: "Gokarna Bus Stand / Homestay Check-in", coords: [14.5412, 74.3182] },
          { name: "Kudle Beach Cafe", coords: [14.5204, 74.3148] },
          { name: "Kudle Beach Cliff Sunset", coords: [14.5240, 74.3160] }
        ]
      },
      {
        day: 2,
        title: "Heritage & The Sacred Om",
        morning: "Visit the historic Mahabaleshwar Temple (early morning recommended to beat local queues ⚠). Walk around the old town's traditional lanes.",
        afternoon: "Have a traditional South Indian vegetarian thali at Prema Restaurant in the town center.",
        evening: "Visit Om Beach. Sit by the shoreline and listen to the waves. (Contingency: If waves are too rough due to monsoon, hike the clifftop trail to Kudle Beach instead).",
        weatherFlag: true,
        bookingFlag: true,
        stops: [
          { name: "Mahabaleshwar Temple", coords: [14.5412, 74.3182] },
          { name: "Prema Restaurant", coords: [14.5422, 74.3175] },
          { name: "Om Beach", coords: [14.5168, 74.3225] }
        ]
      },
      {
        day: 3,
        title: "Fort Ruins & Secluded Sands",
        morning: "Hire a local auto-rickshaw to Mirjan Fort (22 km away), a beautiful 16th-century structure that becomes completely blanketed in bright green moss during the monsoon.",
        afternoon: "Stop by Nirvana Beach (a secluded, long stretch of sand south of the estuary) for a peaceful walk completely away from tourist crowds.",
        evening: "Return to Gokarna town. Spend a quiet evening at the sunset point near Jatayu Teertha. Have dinner at a clifftop cafe. (Contingency: In case of heavy rains, visit the indoor Gokarna museum and library instead).",
        weatherFlag: true,
        bookingFlag: false,
        stops: [
          { name: "Mirjan Fort", coords: [14.4851, 74.4184] },
          { name: "Nirvana Beach", coords: [14.4754, 74.3312] },
          { name: "Jatayu Teertha Sunset Point", coords: [14.5195, 74.3294] }
        ]
      },
      {
        day: 4,
        title: "Slow Morning & Departure",
        morning: "Participate in a gentle morning yoga session at your resort/homestay, followed by a leisurely breakfast.",
        afternoon: "Do some casual souvenir shopping (local spices, brass lamps) in the Gokarna temple market. Check out of your accommodation by 12:00 PM.",
        evening: "Relax at a cafe with ocean views until it is time to board the evening overnight sleeper bus back to Hyderabad.",
        weatherFlag: false,
        bookingFlag: false,
        stops: [
          { name: "Homestay Yoga", coords: [14.5222, 74.3168] },
          { name: "Gokarna Temple Market", coords: [14.5430, 74.3210] },
          { name: "Gokarna Bus Stand Departure", coords: [14.5412, 74.3182] }
        ]
      }
    ],
    budget: {
      currency: "INR",
      categories: [
        { name: "Transport to Gokarna (Overnight Sleeper Bus from Hyd)", low: 3500, high: 5500 },
        { name: "Local Transport (Auto-rickshaws / Scooter Rental)", low: 1500, high: 2500 },
        { name: "Accommodation (3 nights in a mid-range clifftop cottage)", low: 7500, high: 10500 },
        { name: "Food (Vegetarian meals & cafe visits)", low: 4500, high: 6500 },
        { name: "Activities & Entry fees (Temple/Fort/Guides)", low: 500, high: 1000 },
        { name: "Misc Buffer (10-15%)", low: 2000, high: 3000 }
      ],
      trims: [
        { description: "Opt for a comfortable homestay slightly away from the beach front or cliffs", savings: 2500 },
        { description: "Rent a single gearless scooter for the duration of the trip instead of taking auto-rickshaws for every point-to-point travel", savings: 1000 }
      ]
    },
    packing: {
      documents: ["Aadhar Card / Gov IDs (printed and digital)", "Cash (essential for local autos, small shops, and temple offerings in Gokarna due to spotty network coverage)"],
      clothing: ["Light, quick-dry clothes (linen, cotton, synthetic blends)", "Rainwear (sturdy umbrellas, lightweight rain jackets, or windbreakers)", "Slip-resistant footwear (sandals/flip-flops with good grip for muddy paths and wet temple floors)"],
      health: ["Mosquito/bug repellent (essential for coastal areas and forts in the monsoon)", "Personal first-aid kit containing rehydration salts, band-aids, and motion sickness medication"],
      tech: ["Power bank (essential as monsoon power cuts are frequent in beach towns)", "Waterproof pouch/sleeves for mobile phones and cameras"],
      specific: [
        "Modest clothing: Sarongs or long pants/maxi skirts (required to enter the Mahabaleshwar Temple premises; shorts/sleeveless shirts are banned).",
        "Quick-dry microfiber travel towel for unexpected downpours during outdoor walks.",
        "Small plastic bag to carry your footwear when leaving them outside the temples."
      ]
    },
    alternateActivities: {
      morning: [
        { title: "Clifftop Yoga Studio Session", desc: "Start the day with a guided yoga session on the beach cliff.", coords: [14.5225, 74.3162], name: "Clifftop Yoga Studio" },
        { title: "Gokarna Main Beach Stroll", desc: "Take a quiet, early morning stroll on Gokarna Main Beach.", coords: [14.5480, 74.3150], name: "Gokarna Main Beach" }
      ],
      afternoon: [
        { title: "Eco Art Cafe Salad Lunch", desc: "Visit a local artistic eco-cafe for healthy organic salads and juices.", coords: [14.5215, 74.3155], name: "Eco Art Cafe" },
        { title: "Koti Teertha View Lunch", desc: "Have lunch near the holy Koti Teertha temple tank.", coords: [14.5395, 74.3215], name: "Koti Teertha Tank" }
      ],
      evening: [
        { title: "Half Moon Beach Trek", desc: "Trek along the scenic cliff edge to the secluded Half Moon Beach.", coords: [14.5120, 74.3280], name: "Half Moon Beach" },
        { title: "Gokarna Sunset Bay Cruise", desc: "Relax on a short boat cruise watching dolphins at sunset (weather permitting).", coords: [14.5190, 74.3130], name: "Gokarna Sunset Bay" }
      ]
    }
  },
  "bangalore_munnar_relaxed": {
    destinations: [
      {
        name: "Munnar, Kerala",
        whyFits: "A breathtaking hill station with sprawling tea estates, cool misty weather, and a peaceful ambiance that perfectly aligns with a relaxed retreat.",
        downside: "July rain can trigger localized landslides, occasionally blocking winding roads and delaying travel.",
        costTier: "Mid-range"
      },
      {
        name: "Ooty, Tamil Nadu",
        whyFits: "Classic hill station featuring heritage rose gardens, colonial architecture, and a charming toy train, easily reached from Bangalore.",
        downside: "Highly commercialized around the town center, meaning crowds can still disrupt the quiet feel even in off-season.",
        costTier: "Mid-range"
      },
      {
        name: "Coorg, Karnataka",
        whyFits: "Lush coffee plantations, misty valleys, and waterfall hikes, ideal for a quiet homestay experience.",
        downside: "Very high rainfall in July can restrict outdoor trekking and activities.",
        costTier: "Mid-range"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Into the Mist & Tea Fields",
        morning: "Arrive in Munnar from Bangalore (overnight bus or train to Aluva, then cab). Check into a scenic tea estate resort.",
        afternoon: "Enjoy a warm cardamom tea and lunch at the resort. Take a gentle stroll through the surrounding tea gardens.",
        evening: "Visit the Munnar Tea Museum to learn about processing, followed by dinner at a local vegetarian restaurant.",
        weatherFlag: false,
        bookingFlag: false,
        stops: [
          { name: "Munnar Tea Estate Resort", coords: [10.0820, 77.0620] },
          { name: "Tea Gardens Walk", coords: [10.0860, 77.0650] },
          { name: "Munnar Tea Museum", coords: [10.0934, 77.0505] }
        ]
      },
      {
        day: 2,
        title: "Dams & Echoing Hills",
        morning: "Take a scenic drive to Mattupetty Dam. Spend some time watching the mist float over the water reservoir.",
        afternoon: "Stop by Echo Point (shout out across the lake). Have local sweet corn and steamed vegetarian momos at a local stall.",
        evening: "Drive up to Kundala Lake for a quiet rowboat or pedal boat ride. (Contingency: If heavy rain halts boating, explore the aromatic spice plantations nearby instead).",
        weatherFlag: true,
        bookingFlag: false,
        stops: [
          { name: "Mattupetty Dam", coords: [10.1062, 77.1235] },
          { name: "Echo Point Lake", coords: [10.1265, 77.1610] },
          { name: "Kundala Lake", coords: [10.1415, 77.1950] }
        ]
      },
      {
        day: 3,
        title: "Eravikulam & High Peaks",
        morning: "Visit Eravikulam National Park to spot the rare Nilgiri Tahr mountain goat (early morning ticket booking required ⚠).",
        afternoon: "Enjoy a traditional Kerala Sadya lunch (vegetarian feast served on banana leaf) in Munnar town.",
        evening: "Visit Lakkam Waterfalls (local, less crowded spot). Sit by the refreshing mountain stream. (Contingency: Avoid waterfalls if rains are heavy; visit Punarjani Traditional Village for a Kathakali performance instead).",
        weatherFlag: true,
        bookingFlag: true,
        stops: [
          { name: "Eravikulam National Park", coords: [10.1472, 77.0790] },
          { name: "Munnar Town Sadya", coords: [10.0889, 77.0595] },
          { name: "Lakkam Waterfalls", coords: [10.1830, 77.1120] }
        ]
      },
      {
        day: 4,
        title: "Marayoor Sandalwood & Return",
        morning: "Drive to Marayoor (non-touristy forest zone) to see sandalwood forests and natural dolmens (stone monuments).",
        afternoon: "Have lunch and pick up pure Munnar tea leaves and locally made handmade chocolates.",
        evening: "Head back to Cochin/Aluva to catch your overnight bus/train back to Bangalore.",
        weatherFlag: false,
        bookingFlag: false,
        stops: [
          { name: "Marayoor Sandalwood Forest", coords: [10.2835, 77.1590] },
          { name: "Munnar Spice Bazaar", coords: [10.0895, 77.0605] },
          { name: "Aluva Station Departure", coords: [10.1090, 76.3530] }
        ]
      }
    ],
    budget: {
      currency: "INR",
      categories: [
        { name: "Transport (Overnight Bus + Local Cab/Auto from Aluva)", low: 4000, high: 6000 },
        { name: "Local Transport (Tuk-tuk or local cab for sightseeing)", low: 2500, high: 4000 },
        { name: "Accommodation (3 nights in a scenic homestay/resort)", low: 8000, high: 12000 },
        { name: "Food (Traditional vegetarian meals & local cafes)", low: 3500, high: 5500 },
        { name: "Activities & National Park Entry Fees", low: 800, high: 1500 },
        { name: "Misc Buffer (10-15%)", low: 2000, high: 3000 }
      ],
      trims: [
        { description: "Opt for a standard room instead of a valley-view balcony cottage", savings: 2000 },
        { description: "Use the local public KSRTC buses for travel between Munnar town and Mattupetty/Kundala instead of a private cab", savings: 1500 }
      ]
    },
    packing: {
      documents: ["ID proofs, digital ticket copies for Eravikulam Park", "Cash (for entry tickets, local tea stalls, and parking fees)"],
      clothing: ["Light sweaters/cardigans (temperatures drop in evenings)", "Rainproof gear (solid umbrella, waterproof shoes or sandals)", "Quick-dry tracks/trousers for plantation walks"],
      health: ["Leech repellent or salt packets (plantation walks during monsoons attract leeches)", "Motion sickness pills (essential for the winding ghat roads with 40+ hairpin bends)"],
      tech: ["Extra batteries/power banks", "Ziploc bags to protect electronics from mountain moisture"],
      specific: [
        "Comfortable shoes with rubber soles to avoid slipping on wet paths.",
        "A light shawl or scarf for chilly, misty afternoons.",
        "Eco-friendly cloth bags for shopping local spices and tea leaves (Munnar is a plastic-free zone)."
      ]
    },
    alternateActivities: {
      morning: [
        { title: "Attukad Waterfall Morning Hike", desc: "Take a scenic morning walk along the tea hills to Attukad Waterfalls.", coords: [10.0630, 77.0370], name: "Attukad Waterfalls" },
        { title: "Floriculture Flower Garden Walk", desc: "Explore the species at Munnar Floriculture Centre.", coords: [10.0760, 77.0850], name: "Munnar Floriculture Centre" }
      ],
      afternoon: [
        { title: "Munnar Tea Leaves Tasting", desc: "Visit the local cooperative cafe and try local tea infusions.", coords: [10.0895, 77.0605], name: "Munnar Cooperative Cafe" },
        { title: "Pothamedu Coffee Viewpoint Lunch", desc: "Enjoy lunch with coffee plantation views at Pothamedu.", coords: [10.0710, 77.0490], name: "Pothamedu Viewpoint Cafe" }
      ],
      evening: [
        { title: "Punarjani Village Kathakali Show", desc: "Watch a classical Kathakali dance show at Punarjani Village.", coords: [10.0610, 77.0320], name: "Punarjani Village" },
        { title: "Lockhart Gap Sunset View", desc: "Drive to Lockhart Gap for mountain views at sunset.", coords: [10.0460, 77.1020], name: "Lockhart Gap Viewpoint" }
      ]
    }
  }
};

// Fallback coordinate search
function getCoordsForDestination(destName, stopIndex) {
  const nameLower = destName.toLowerCase();
  let base = [14.5412, 74.3182]; // Default Gokarna
  
  if (nameLower.includes('munnar')) {
    base = [10.0889, 77.0595];
  } else if (nameLower.includes('araku')) {
    base = [18.3273, 82.8775];
  } else if (nameLower.includes('goa')) {
    base = [15.4909, 73.8278];
  } else if (nameLower.includes('ooty')) {
    base = [11.4102, 76.6950];
  } else if (nameLower.includes('coorg') || nameLower.includes('madikeri')) {
    base = [12.4244, 75.7382];
  } else if (nameLower.includes('pondicherry') || nameLower.includes('puducherry')) {
    base = [11.9416, 79.8083];
  } else if (nameLower.includes('varkala')) {
    base = [8.7302, 76.7088];
  } else if (nameLower.includes('yercaud')) {
    base = [11.7753, 78.2093];
  } else if (nameLower.includes('wayanad')) {
    base = [11.6854, 76.1320];
  } else if (nameLower.includes('manali')) {
    base = [32.2396, 77.1887];
  }

  // Generate plausible deterministic coordinates based on stopIndex
  const latOffset = (stopIndex * 0.006) - 0.009;
  const lngOffset = (Math.sin(stopIndex) * 0.008);
  return [base[0] + latOffset, base[1] + lngOffset];
}

// Fallback/Dynamic Generator based on user input
function generateDynamicItinerary(inputs) {
  const origin = inputs.origin || "your city";
  let destination = inputs.destination || (inputs.theme === "beaches" ? "Karwar, Karnataka" : "Coonoor, Tamil Nadu");
  let duration = parseInt(inputs.duration) || 4;
  const budgetVal = parseInt(inputs.budget) || 25000;
  const travelers = inputs.travelers || "2, Couple";
  let style = inputs.style || "Relaxed";
  const diet = inputs.diet || "Vegetarian";
  const interests = inputs.interests || "nature, peace";

  // Pushback analysis
  let pushback = null;
  const destinationsList = destination.split(/,|and|&/).map(s => s.trim()).filter(Boolean);

  if (destinationsList.length > 1 && duration < 5) {
    pushback = {
      originalRequest: `${destinationsList.length} cities (${destination}) in ${duration} days`,
      reason: `Attempting to cover ${destinationsList.length} different destinations in just ${duration} days will result in excessive transit fatigue, leaving zero time to actually experience each place.`,
      alternative: `We have focused this plan entirely on ${destinationsList[0]} (the first destination) for a relaxed, high-quality itinerary, rather than rushing through transit. We recommend adding at least ${destinationsList.length * 2 - duration} more days to safely cover all of ${destination}.`
    };
    destination = destinationsList[0]; // Restrict to first destination
  } else if (style.toLowerCase().includes('luxury') && inputs.budget !== 'flexible' && budgetVal < duration * 6000) {
    const recommendedBudget = duration * 6000;
    pushback = {
      originalRequest: `Luxury trip style with a budget of ₹${budgetVal.toLocaleString('en-IN')}`,
      reason: `A budget of ₹${budgetVal.toLocaleString('en-IN')} is insufficient to support a Luxury-paced trip for ${duration} days. Premium resorts, private cabs, and fine dining require higher spending.`,
      alternative: `We have adjusted your travel plan to a refined 'Mid-range' styling, optimizing for comfortable boutique homestays instead of 5-star luxury resorts. To achieve true luxury, we recommend increasing your budget to at least ₹${recommendedBudget.toLocaleString('en-IN')}.`
    };
    style = "Mid-range"; // Downgrade style internally for budget safety
  } else if (duration <= 2 && ((origin.toLowerCase().includes('delhi') && destination.toLowerCase().includes('munnar')) || (origin.toLowerCase().includes('hyderabad') && destination.toLowerCase().includes('munnar')))) {
    pushback = {
      originalRequest: `Travel from ${origin} to ${destination} for a ${duration}-day trip`,
      reason: `The transit time between ${origin} and ${destination} takes up nearly 36 hours of round-trip travel by land/rail, which leaves virtually no time for exploration.`,
      alternative: `We have adjusted this to a 4-day plan to accommodate travel, or suggest choosing a closer destination (e.g., Ananthagiri Hills for Hyderabad, or Mussoorie for Delhi) for a 2-day weekend getaway.`
    };
    duration = 4; // Extend duration internally to produce a viable plan
  }

  // Create suggestions
  const isBeach = inputs.theme === "beaches" || (destination && destination.toLowerCase().includes("beach")) || (inputs.destination && inputs.destination.toLowerCase().includes("beach"));
  
  let suggestions = [];
  if (isBeach) {
    suggestions = [
      {
        name: destination,
        whyFits: `A perfect coastal spot matching your preference for ${interests} and a ${style} pace of travel.`,
        downside: "Monsoon season brings heavy tide conditions, which limits beach swimming and boating activities.",
        costTier: budgetVal < 20000 ? "Budget" : budgetVal < 40000 ? "Mid-range" : "Splurge"
      },
      {
        name: "Pondicherry",
        whyFits: "Charming French Quarter, serene beaches, and delicious vegetarian options at local ashram eateries.",
        downside: "The humidity can be quite high, and the main beaches can get crowded on weekends.",
        costTier: "Mid-range"
      },
      {
        name: "Varkala, Kerala",
        whyFits: "Stunning red cliffside beaches, a relaxed backpacker vibe, and extensive vegetarian-friendly cafes.",
        downside: "The cliffs require climbing steep steps, which might be taxing in high humidity.",
        costTier: "Mid-range"
      }
    ];
  } else {
    // Hill station
    suggestions = [
      {
        name: destination,
        whyFits: `A lush, green mountain retreat that satisfies your desire for ${interests} with a peaceful backdrop.`,
        downside: "Winding mountain roads can experience slow traffic and mist blockages during heavy showers.",
        costTier: budgetVal < 20000 ? "Budget" : budgetVal < 40000 ? "Mid-range" : "Splurge"
      },
      {
        name: "Yercaud, Tamil Nadu",
        whyFits: "A quieter, less commercial alternative to Ooty, featuring orange groves, botanical gardens, and scenic lake walks.",
        downside: "Sightseeing points are relatively close together, which can feel repetitive for longer stays.",
        costTier: "Budget"
      },
      {
        name: "Wayanad, Kerala",
        whyFits: "Deep green forests, spice estates, and unique cave formations that offer a tranquil connection to nature.",
        downside: "Attractions are spread far apart, requiring significant local driving time.",
        costTier: "Mid-range"
      }
    ];
  }

  // Create itinerary days
  const itinerary = [];
  const activities = {
    beach: {
      morning: ["Explore the scenic shoreline path", "Visit a quiet local temple or historic landmark", "Enjoy a gentle sunrise walk"],
      afternoon: ["Relax in a beachfront cafe with local drinks", "Stroll through the town's local markets", "Rest and escape the midday humidity"],
      evening: ["Watch the sunset from a high clifftop viewpoint", "Visit a nearby scenic estuary or backwater canal", "Indulge in a beach-side dinner"]
    },
    localPicks: {
      beach: ["Visit an isolated lagoon where locals catch crabs", "Join a traditional fishing net casting session with a local", "Walk around a nearby quiet lighthouse at twilight"],
      hill: ["Hike up a secret route to an old colonial viewpoint", "Visit a hidden organic honey-gathering farm in the valley", "Walk down to a quiet mountain stream loved by locals"]
    },
    hill: {
      morning: ["Take a refreshing walk through local plantations", "Visit a scenic mist-laden valley view point", "Explore local botanical gardens"],
      afternoon: ["Taste local tea/coffee at a hillside cafe", "Walk around a tranquil mountain lake", "Visit a traditional heritage village or museum"],
      evening: ["Relax by a fireplace or bonfire at your stay", "Enjoy a scenic drive through pine forests", "Have dinner overlooking the valley light view"]
    }
  };

  const pool = isBeach ? activities.beach : activities.hill;
  const dayTitles = [
    "Arrival & Scenic Overview",
    "Local Gems & Quiet Paths",
    "Hidden Tracks & Cultural Sights",
    "Slow Living & Departure",
    "Scenic Wandering",
    "Local Artistry & Nature",
    "Final Discoveries"
  ];

  for (let i = 1; i <= duration; i++) {
    const titleIdx = (i - 1) % dayTitles.length;
    const morningAct = pool.morning[(i - 1) % pool.morning.length];
    const afternoonAct = pool.afternoon[(i - 1) % pool.afternoon.length];
    const eveningAct = pool.evening[(i - 1) % pool.evening.length];

    // local non-touristy pick on Day 2 or 3
    let localPick = "";
    if (i === 2 || i === 3) {
      const picks = isBeach ? activities.localPicks.beach : activities.localPicks.hill;
      localPick = ` (Local Pick: ${picks[(i - 1) % picks.length]})`;
    }

    const mText = i === 1 
      ? `Arrive in ${destination} from ${origin}. Check into your local accommodation and relax after the journey.` 
      : `${morningAct}. Focus on soaking in the fresh air.`;
    const aText = `${afternoonAct}. Enjoy a ${diet.toLowerCase()} lunch in a peaceful setting.`;
    const eText = i === duration 
      ? `Pack bags, do last-minute shopping for local specialties, and catch your return transport back to ${origin}.`
      : `${eveningAct}${localPick}. (Contingency: If it rains heavily, replace with cozy reading at a local cafe ⚠).`;

    const stopCoords = [
      getCoordsForDestination(destination, (i - 1) * 3),
      getCoordsForDestination(destination, (i - 1) * 3 + 1),
      getCoordsForDestination(destination, (i - 1) * 3 + 2)
    ];

    itinerary.push({
      day: i,
      title: dayTitles[titleIdx],
      morning: mText,
      afternoon: aText,
      evening: eText,
      weatherFlag: i === 2 || i === 3,
      bookingFlag: i === 1 || i === duration,
      stops: [
        { name: i === 1 ? "Arrival Hotel / Homestay" : mText.split('.')[0].substring(0, 30), coords: stopCoords[0] },
        { name: aText.split('.')[0].substring(0, 30), coords: stopCoords[1] },
        { name: i === duration ? "Departure Terminal" : eText.split('(')[0].split('.')[0].substring(0, 30).trim(), coords: stopCoords[2] }
      ]
    });
  }

  // Create budget
  const categories = [
    { name: `Travel from ${origin} to ${destination}`, low: Math.round(budgetVal * 0.18), high: Math.round(budgetVal * 0.25) },
    { name: "Local Commute (scooter, rickshaws, or local cabs)", low: Math.round(budgetVal * 0.08), high: Math.round(budgetVal * 0.12) },
    { name: `Accommodation (${duration - 1} nights)`, low: Math.round(budgetVal * 0.35), high: Math.round(budgetVal * 0.45) },
    { name: `Food & Snacks (${diet})`, low: Math.round(budgetVal * 0.18), high: Math.round(budgetVal * 0.24) },
    { name: "Activity passes, sightseeing fees & local guides", low: Math.round(budgetVal * 0.04), high: Math.round(budgetVal * 0.08) },
    { name: "Emergency / Misc Buffer (12%)", low: Math.round(budgetVal * 0.1), high: Math.round(budgetVal * 0.12) }
  ];

  const trims = [
    { description: "Choose a cozy homestay or hostel private room instead of a full-scale hotel", savings: Math.round(budgetVal * 0.12) },
    { description: "Opt for public buses or shared auto rentals instead of calling private point-to-point cabs", savings: Math.round(budgetVal * 0.06) }
  ];

  // Create packing checklist
  const packing = {
    documents: ["National ID proof / Passport copy", "Printed tickets & reservation vouchers", "Emergency contact card & cash"],
    clothing: isBeach 
      ? ["Lightweight, breathable linen clothing", "Quick-dry shorts and swimsuits", "Waterproof sandals or slippers"]
      : ["Warm layers (sweaters or light jackets)", "Sturdy trekking or walking shoes with grip", "Quick-dry athletic tracks"],
    health: ["Personal medicines & motion sickness tablets", "High-protection sunscreen & moisturizer", "Mosquito repellent lotion"],
    tech: ["High capacity power bank", "Universal travel adapter", "Phone waterproof zip covers"],
    specific: isBeach
      ? [
          "Modest temple-wear (a sarong or full length skirt/pants) in case of temple visits.",
          "An extra dry-bag to keep sand and salt water off your mobile phone.",
          "A wide-brimmed sun hat."
        ]
      : [
          "A compact, windproof travel umbrella.",
          "Comfortable walking socks to prevent blisters on slopes.",
          "A small pouch of table salt or lime powder in case of forest leeches."
        ]
  };

  return {
    pushback,
    destinations: suggestions,
    itinerary,
    budget: {
      currency: "INR",
      categories,
      trims
    },
    packing,
    alternateActivities: {
      morning: [
        { title: "Sunrise Viewpoint Stroll", desc: "Take a refreshing early walk to capture local views.", coords: getCoordsForDestination(destination, 99), name: "Sunrise Point" },
        { title: "Local Market Exploration", desc: "Stroll around local shops and interact with residents.", coords: getCoordsForDestination(destination, 100), name: "Town Market" }
      ],
      afternoon: [
        { title: "Artisan Cafe Visit", desc: "Enjoy light snacks and coffee in a modern organic diner.", coords: getCoordsForDestination(destination, 101), name: "Artisan Cafe" },
        { title: "Quiet Library Lounge", desc: "Relax and browse local historical books.", coords: getCoordsForDestination(destination, 102), name: "Town Library" }
      ],
      evening: [
        { title: "Cultural Performance", desc: "Watch local folk dance or play in the town hall.", coords: getCoordsForDestination(destination, 103), name: "Cultural Centre" },
        { title: "Sunset Scenic Spot", desc: "Relax with local snacks near a beautiful scenic spot.", coords: getCoordsForDestination(destination, 104), name: "Sunset Viewpoint" }
      ]
    }
  };
}

if (typeof window !== "undefined") {
  window.mockItineraries = mockItineraries;
  window.generateDynamicItinerary = generateDynamicItinerary;
  window.getCoordsForDestination = getCoordsForDestination;
}
