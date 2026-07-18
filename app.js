document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // App State
  let currentStep = 1;
  const totalSteps = 3;
  let activeTheme = 'beaches';
  let activeStyle = 'relaxed';
  let isApiMode = false;
  let activeItineraryData = null;
  let selectedTrims = new Set();
  let leafletMap = null;
  let leafletMarkerGroup = null;
  let leafletPolyline = null;
  let activeDayIndex = 0;

  // DOM Elements - Navigation & Modal
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const modeMockBtn = document.getElementById('modeMockBtn');
  const modeApiBtn = document.getElementById('modeApiBtn');
  const apiKeyFormGroup = document.getElementById('apiKeyFormGroup');
  const apiKeyInput = document.getElementById('apiKeyInput');

  // DOM Elements - Views
  const questionnaireView = document.getElementById('questionnaireView');
  const loaderView = document.getElementById('loaderView');
  const resultsView = document.getElementById('resultsView');
  const terminalBody = document.getElementById('terminalBody');
  const mainCard = document.getElementById('mainCard');

  // DOM Elements - Outputs
  const destinationsGrid = document.getElementById('destinationsGrid');
  const itineraryTimeline = document.getElementById('itineraryTimeline');
  const budgetTableBody = document.getElementById('budgetTableBody');
  const budgetFooterContainer = document.getElementById('budgetFooterContainer');
  const packingWrapper = document.getElementById('packingWrapper');
  const packingProgressBar = document.getElementById('packingProgressBar');
  const packingProgressText = document.getElementById('packingProgressText');
  const resultsMeta = document.getElementById('resultsMeta');
  const pushbackBannerContainer = document.getElementById('pushbackBannerContainer');

  // DOM Elements - Inputs
  const originInput = document.getElementById('originInput');
  const destinationInput = document.getElementById('destinationInput');
  const durationInput = document.getElementById('durationInput');
  const budgetInput = document.getElementById('budgetInput');
  const budgetFlexibleCheckbox = document.getElementById('budgetFlexibleCheckbox');
  const travelersInput = document.getElementById('travelersInput');
  const dietInput = document.getElementById('dietInput');
  const notesInput = document.getElementById('notesInput');

  // Actions
  const modifyPlanBtn = document.getElementById('modifyPlanBtn');
  const exportMdBtn = document.getElementById('exportMdBtn');

  // Load Saved Configurations
  const loadConfig = () => {
    const savedMode = localStorage.getItem('wayfarer_mode');
    const savedKey = localStorage.getItem('wayfarer_api_key');
    if (savedMode === 'api') {
      isApiMode = true;
      modeApiBtn.classList.add('active');
      modeMockBtn.classList.remove('active');
      apiKeyFormGroup.style.display = 'block';
    }
    if (savedKey) {
      apiKeyInput.value = savedKey;
    }
  };
  loadConfig();

  // Flexible budget toggle logic
  budgetFlexibleCheckbox.addEventListener('change', () => {
    if (budgetFlexibleCheckbox.checked) {
      budgetInput.disabled = true;
      budgetInput.required = false;
      budgetInput.style.opacity = '0.5';
      budgetInput.value = '';
    } else {
      budgetInput.disabled = false;
      budgetInput.required = true;
      budgetInput.style.opacity = '1';
      budgetInput.value = '25000';
    }
  });

  // Settings Modal Toggle
  openSettingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
  closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove('active');
  });

  modeMockBtn.addEventListener('click', () => {
    isApiMode = false;
    modeMockBtn.classList.add('active');
    modeApiBtn.classList.remove('active');
    apiKeyFormGroup.style.display = 'none';
  });

  modeApiBtn.addEventListener('click', () => {
    isApiMode = true;
    modeApiBtn.classList.add('active');
    modeMockBtn.classList.remove('active');
    apiKeyFormGroup.style.display = 'block';
  });

  saveSettingsBtn.addEventListener('click', () => {
    localStorage.setItem('wayfarer_mode', isApiMode ? 'api' : 'mock');
    localStorage.setItem('wayfarer_api_key', apiKeyInput.value.trim());
    settingsModal.classList.remove('active');
  });

  // Questionnaire Grid Selection
  const setupSelectionGrid = (gridId, callback) => {
    const grid = document.getElementById(gridId);
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.option-card');
      if (!card) return;
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      callback(card.dataset.value);
    });
  };

  setupSelectionGrid('themeGrid', (val) => { activeTheme = val; });
  setupSelectionGrid('styleGrid', (val) => { activeStyle = val; });

  // Questionnaire Navigation
  const updateStepper = () => {
    // Update step view
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step) === currentStep) {
        step.classList.add('active');
      }
    });

    // Update Dots
    document.querySelectorAll('.step-dot').forEach(dot => {
      const stepVal = parseInt(dot.dataset.step);
      dot.classList.remove('active', 'completed');
      if (stepVal === currentStep) {
        dot.classList.add('active');
      } else if (stepVal < currentStep) {
        dot.classList.add('completed');
        dot.innerHTML = '<i data-lucide="check" style="width: 14px; height: 14px;"></i>';
      } else {
        dot.textContent = stepVal;
      }
    });
    lucide.createIcons();

    // Button states
    if (currentStep === 1) {
      prevBtn.classList.add('btn-disabled');
    } else {
      prevBtn.classList.remove('btn-disabled');
    }

    if (currentStep === totalSteps) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }
  };

  nextBtn.addEventListener('click', () => {
    // Validate current step fields
    if (currentStep === 1) {
      const isBudgetValid = budgetFlexibleCheckbox.checked || budgetInput.value;
      if (!originInput.value || !durationInput.value || !isBudgetValid) {
        alert("Please fill in all details before continuing.");
        return;
      }
    }
    if (currentStep < totalSteps) {
      currentStep++;
      updateStepper();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepper();
    }
  });

  // Export to Markdown
  exportMdBtn.addEventListener('click', () => {
    if (!activeItineraryData) return;
    const data = activeItineraryData;
    const inputs = getFormInputs();

    let md = `# Wayfarer Travel Plan: ${data.destinations[0].name}\n\n`;
    md += `**Origin:** ${inputs.origin} | **Duration:** ${inputs.duration} Days | **Budget Cap:** ${inputs.budget === 'flexible' ? 'Flexible' : '₹' + inputs.budget} | **Pace/Style:** ${inputs.style}\n\n`;
    
    if (data.pushback) {
      md += `> ⚠️ **EXPERT PLANNER ADVICE (PUSHBACK)**\n`;
      md += `> **Original Request:** ${data.pushback.originalRequest}\n`;
      md += `> **Analysis:** ${data.pushback.reason}\n`;
      md += `> **Proposed Alternative:** ${data.pushback.alternative}\n\n`;
    }

    md += `## 1. DESTINATION SUGGESTIONS\n\n`;
    data.destinations.forEach((d, idx) => {
      md += `### ${idx === 0 ? '★ Recommended: ' : ''}${d.name} (${d.costTier})\n`;
      md += `- *Why it fits:* ${d.whyFits}\n`;
      md += `- *Trade-off:* ${d.downside}\n\n`;
    });

    md += `## 2. DAY-WISE ITINERARY\n\n`;
    data.itinerary.forEach(d => {
      md += `### Day ${d.day}: ${d.title}\n`;
      if (d.weatherFlag) md += `> **Monsoon weather alert:** Out-of-door sights subject to visibility/showers.\n`;
      if (d.bookingFlag) md += `> **Booking warning:** Reserve passes/activities ahead.\n`;
      md += `- **Morning:** ${d.morning}\n`;
      md += `- **Afternoon:** ${d.afternoon}\n`;
      md += `- **Evening:** ${d.evening}\n\n`;
    });

    md += `## 3. BUDGET ESTIMATE\n\n`;
    md += `| Category | Low Range (INR) | High Range (INR) |\n`;
    md += `| :--- | :---: | :---: |\n`;
    
    let lowTotal = 0;
    let highTotal = 0;
    data.budget.categories.forEach(c => {
      md += `| ${c.name} | ₹${c.low} | ₹${c.high} |\n`;
      lowTotal += c.low;
      highTotal += c.high;
    });
    md += `| **Total** | **₹${lowTotal}** | **₹${highTotal}** |\n\n`;

    if (highTotal > inputs.budget) {
      md += `> **Note:** The high estimate exceeds your cap of ₹${inputs.budget} by ₹${highTotal - inputs.budget}.\n\n`;
      md += `### Recommended Budget Trims:\n`;
      data.budget.trims.forEach((t, i) => {
        md += `${i + 1}. ${t.description} (Saves ~₹${t.savings})\n`;
      });
      md += `\n`;
    }

    md += `## 4. PACKING CHECKLIST\n\n`;
    
    // Collect weather hazard items
    const weatherItems = [];
    if (data && data.itinerary) {
      data.itinerary.forEach(d => {
        if (d.weatherFlag) {
          weatherItems.push(`Rainproof gear (Umbrella/Poncho) — Day ${d.day} weather warning`);
        }
      });
    }

    md += `### Documents & Money\n`;
    data.packing.documents.forEach(i => md += `- [ ] ${i}\n`);
    
    md += `\n### Clothing\n`;
    const clothingItems = [...(data.packing.clothing || []), ...weatherItems];
    clothingItems.forEach(i => md += `- [ ] ${i}\n`);
    md += `\n### Health & Toiletries\n`;
    data.packing.health.forEach(i => md += `- [ ] ${i}\n`);
    md += `\n### Tech\n`;
    data.packing.tech.forEach(i => md += `- [ ] ${i}\n`);
    md += `\n### Destination-Specific Items\n`;
    data.packing.specific.forEach(i => md += `- [ ] ${i}\n`);

    // Download blob
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wayfarer-itinerary-${data.destinations[0].name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Get current inputs
  const getFormInputs = () => {
    return {
      origin: originInput.value.trim(),
      destination: destinationInput.value.trim(),
      duration: durationInput.value,
      budget: budgetFlexibleCheckbox.checked ? 'flexible' : budgetInput.value,
      theme: activeTheme,
      style: activeStyle,
      travelers: travelersInput.value,
      diet: dietInput.value,
      notes: notesInput.value.trim()
    };
  };

  // Switch views
  const showView = (viewId) => {
    questionnaireView.style.display = 'none';
    loaderView.style.display = 'none';
    resultsView.style.display = 'none';

    if (viewId === 'questionnaire') questionnaireView.style.display = 'block';
    if (viewId === 'loader') loaderView.style.display = 'flex';
    if (viewId === 'results') {
      resultsView.style.display = 'flex';
      setTimeout(() => {
        initMap();
        if (leafletMap) {
          leafletMap.invalidateSize();
          updateMapForDay(activeDayIndex);
        }
      }, 100);
    }
  };

  modifyPlanBtn.addEventListener('click', () => {
    showView('questionnaire');
    currentStep = 3;
    updateStepper();
  });

  // Map and Distance Helpers
  const initMap = () => {
    if (leafletMap) return;
    leafletMap = L.map('itineraryMap', {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([14.5412, 74.3182], 13);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(leafletMap);
    
    leafletMarkerGroup = L.layerGroup().addTo(leafletMap);
  };

  const updateMapForDay = (dayIndex) => {
    if (!leafletMap || !activeItineraryData) return;
    
    const dayData = activeItineraryData.itinerary[dayIndex];
    if (!dayData || !dayData.stops || !dayData.stops.length) return;
    
    leafletMarkerGroup.clearLayers();
    if (leafletPolyline) {
      leafletMap.removeLayer(leafletPolyline);
      leafletPolyline = null;
    }
    
    const coordinates = [];
    
    dayData.stops.forEach((stop, index) => {
      if (!stop.coords || stop.coords.length < 2) return;
      
      const idx = index + 1;
      coordinates.push(stop.coords);
      
      let stopDesc = '';
      if (index === 0) stopDesc = dayData.morning;
      else if (index === 1) stopDesc = dayData.afternoon;
      else if (index === 2) stopDesc = dayData.evening;
      
      const customIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `<div class="map-marker-pin">${idx}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -10]
      });
      
      L.marker(stop.coords, { icon: customIcon })
        .bindPopup(`<strong>Stop ${idx}: ${stop.name}</strong><p>${stopDesc}</p>`)
        .addTo(leafletMarkerGroup);
    });
    
    if (coordinates.length > 1) {
      leafletPolyline = L.polyline(coordinates, {
        color: 'var(--accent-primary)',
        weight: 3,
        opacity: 0.8,
        dashArray: '5, 5'
      }).addTo(leafletMap);
      
      leafletMap.fitBounds(leafletPolyline.getBounds(), { padding: [40, 40] });
    } else if (coordinates.length === 1) {
      leafletMap.setView(coordinates[0], 14);
    }
  };

  const getHaversineDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return 0;
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getTravelTimeText = (distKm) => {
    if (distKm <= 0) return '';
    if (distKm < 0.8) {
      const walkTime = Math.max(3, Math.round(distKm * 12));
      return `${distKm.toFixed(1)} km · ~${walkTime} min walk`;
    } else {
      const driveTime = Math.max(5, Math.round(distKm * 2.5));
      const mode = distKm > 10 ? 'cab' : 'auto/scooter';
      return `${distKm.toFixed(1)} km · ~${driveTime} min by ${mode}`;
    }
  };

  const generateMockSingleDay = (inputs, dayNum) => {
    const dayIndex = dayNum - 1;
    
    // Get alternate activities pool from active itinerary or generate fallback
    let pool = null;
    if (activeItineraryData && activeItineraryData.alternateActivities) {
      pool = activeItineraryData.alternateActivities;
    } else {
      const orig = inputs.origin.toLowerCase();
      const theme = inputs.theme;
      const style = inputs.style;
      let activePreset = null;
      if (orig.includes('hyd') && theme === 'beaches' && style === 'relaxed') {
        activePreset = mockItineraries["hyderabad_gokarna_relaxed"];
      } else if (orig.includes('bang') && theme === 'hills' && style === 'relaxed') {
        activePreset = mockItineraries["bangalore_munnar_relaxed"];
      } else {
        activePreset = generateDynamicItinerary(inputs);
      }
      pool = activePreset.alternateActivities;
    }
    
    if (!pool) {
      pool = {
        morning: [{ title: "Scenic Sunrise Walk", desc: "Take a refreshing early walk to capture local views.", coords: getCoordsForDestination(inputs.theme, 99), name: "Sunrise Point" }],
        afternoon: [{ title: "Artisan Cafe Visit", desc: "Enjoy light snacks and coffee in a modern organic diner.", coords: getCoordsForDestination(inputs.theme, 101), name: "Artisan Cafe" }],
        evening: [{ title: "Cultural Performance", desc: "Watch local folk dance or play in the town hall.", coords: getCoordsForDestination(inputs.theme, 103), name: "Cultural Centre" }]
      };
    }

    const randomMorning = pool.morning[Math.floor(Math.random() * pool.morning.length)];
    const randomAfternoon = pool.afternoon[Math.floor(Math.random() * pool.afternoon.length)];
    const randomEvening = pool.evening[Math.floor(Math.random() * pool.evening.length)];

    return {
      day: dayNum,
      title: randomMorning.title.replace("Morning", "").trim() + " & " + randomEvening.title.replace("Sunset", "").replace("Evening", "").trim(),
      morning: randomMorning.desc,
      afternoon: randomAfternoon.desc,
      evening: randomEvening.desc,
      weatherFlag: Math.random() > 0.5,
      bookingFlag: Math.random() > 0.5,
      stops: [
        { name: randomMorning.name, coords: randomMorning.coords },
        { name: randomAfternoon.name, coords: randomAfternoon.coords },
        { name: randomEvening.name, coords: randomEvening.coords }
      ]
    };
  };

  const fetchSingleDayFromGemini = async (inputs, dayNum, apiKey) => {
    const mainDestName = activeItineraryData.destinations[0].name;
    const prompt = `
      You are Wayfarer. The user wants to regenerate only Day ${dayNum} of their ${inputs.duration}-day travel plan to ${mainDestName}. 
      Provide a new title, morning activity, afternoon activity, and evening activity for Day ${dayNum}.
      Make sure the activities are realistic, vegetarian-friendly if they requested it, and match the travel style of ${inputs.style}.
      Return a JSON object exactly matching this format:
      {
        "title": "New Day Title",
        "morning": "New morning activities description",
        "afternoon": "New afternoon activities description",
        "evening": "New evening activities description",
        "weatherFlag": true_or_false,
        "bookingFlag": true_or_false,
        "stops": [
          { "name": "Morning Stop Name", "coords": [latitude_float, longitude_float] },
          { "name": "Afternoon Stop Name", "coords": [latitude_float, longitude_float] },
          { "name": "Evening Stop Name", "coords": [latitude_float, longitude_float] }
        ]
      }

      Provide plausible coordinates within 15 km of ${mainDestName}.
      Strictly return ONLY raw JSON. Do not wrap in markdown code blocks.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const resJson = await response.json();
    const outputText = resJson.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(outputText);
    parsed.day = dayNum;
    return parsed;
  };

  const renderSingleDayCard = (dayNum) => {
    const dayIndex = dayNum - 1;
    const d = activeItineraryData.itinerary[dayIndex];
    const dayCard = document.querySelector(`.day-card[data-day-num="${dayNum}"]`);
    if (!dayCard) return;
    
    let flags = '';
    if (d.weatherFlag) {
      flags += `<span class="flag-pill flag-weather"><i data-lucide="cloud-rain" style="width:12px;height:12px;"></i> Weather-sensitive</span>`;
    }
    if (d.bookingFlag) {
      flags += `<span class="flag-pill flag-booking"><i data-lucide="alert-circle" style="width:12px;height:12px;"></i> Book Ahead ⚠</span>`;
    }

    let travel1 = '';
    let travel2 = '';
    if (d.stops && d.stops.length >= 3) {
      const dist1_2 = getHaversineDistance(d.stops[0].coords, d.stops[1].coords);
      const dist2_3 = getHaversineDistance(d.stops[1].coords, d.stops[2].coords);
      travel1 = getTravelTimeText(dist1_2);
      travel2 = getTravelTimeText(dist2_3);
    }

    dayCard.innerHTML = `
      <div class="day-header">
        <div class="day-title-block">
          <span class="day-number">Day ${d.day}</span>
          <h3 class="day-title">${d.title}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button class="btn-regenerate-day" data-day="${d.day}">
            <i data-lucide="refresh-cw"></i> Regenerate Day
          </button>
          <div class="day-flags">${flags}</div>
        </div>
      </div>
      <div class="day-content">
        <div class="time-block">
          <span class="time-label">Morning</span>
          <p class="time-description">${d.morning}</p>
        </div>
        
        ${travel1 ? `<div class="travel-time-tag"><i data-lucide="navigation"></i> <span>${travel1}</span></div>` : ''}

        <div class="time-block">
          <span class="time-label">Afternoon</span>
          <p class="time-description">${d.afternoon}</p>
        </div>

        ${travel2 ? `<div class="travel-time-tag"><i data-lucide="navigation"></i> <span>${travel2}</span></div>` : ''}

        <div class="time-block">
          <span class="time-label">Evening</span>
          <p class="time-description">${d.evening}</p>
        </div>
      </div>
    `;

    const newRegenBtn = dayCard.querySelector('.btn-regenerate-day');
    newRegenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      regenerateDay(dayNum);
    });

    lucide.createIcons();
  };

  const regenerateDay = async (dayNum) => {
    const dayIndex = dayNum - 1;
    const inputs = getFormInputs();
    const dayCard = document.querySelector(`.day-card[data-day-num="${dayNum}"]`);
    const regenBtn = dayCard.querySelector('.btn-regenerate-day');
    const originalBtnHtml = regenBtn.innerHTML;
    regenBtn.innerHTML = `<i data-lucide="refresh-cw" class="spin"></i> Regenerating...`;
    regenBtn.disabled = true;
    lucide.createIcons();

    try {
      let newDayData;
      if (isApiMode) {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
          throw new Error("Gemini API Key is missing. Check your settings.");
        }
        newDayData = await fetchSingleDayFromGemini(inputs, dayNum, apiKey);
      } else {
        newDayData = generateMockSingleDay(inputs, dayNum);
      }
      
      activeItineraryData.itinerary[dayIndex] = newDayData;
      renderSingleDayCard(dayNum);
      renderPackingSection(activeItineraryData);
      
      if (leafletMap && activeDayIndex === dayIndex) {
        updateMapForDay(dayIndex);
      }
    } catch (err) {
      alert("Error regenerating day: " + err.message);
    } finally {
      regenBtn.innerHTML = originalBtnHtml;
      regenBtn.disabled = false;
      lucide.createIcons();
    }
  };

  // Handle Form Submission
  document.getElementById('travelForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = getFormInputs();

    showView('loader');
    await runTerminalSimulation(inputs);

    try {
      if (isApiMode) {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
          throw new Error("Gemini API key is missing. Click Settings to enter one, or use Local Mock Mode.");
        }
        activeItineraryData = await generateWithGemini(inputs, apiKey);
      } else {
        activeItineraryData = getMockOrDynamicItinerary(inputs);
      }
      
      selectedTrims.clear();
      activeDayIndex = 0;
      renderResults(inputs, activeItineraryData);
      showView('results');
    } catch (err) {
      alert("Error: " + err.message);
      showView('questionnaire');
    }
  });

  // Simulated Terminal Typing
  const runTerminalSimulation = (inputs) => {
    return new Promise((resolve) => {
      terminalBody.innerHTML = '';
      
      const lines = [
        `> Booting Wayfarer core planner engine... OK`,
        `> Establishing origin coordinates: [${inputs.origin}]`,
        `> Synthesizing destination options matching filters [${inputs.theme}]...`,
        `> Cross-referencing monsoon weather models for July 2026...`,
        `> Designing ${inputs.duration}-day travel sequence under ${inputs.style} pacing...`,
        `> Mapping local culinary directories for [${inputs.diet}] food clusters...`,
        `> Enforcing budget cap of ₹${inputs.budget} INR...`,
        `> Injecting localized non-touristy points of interest...`,
        `> Assembling day-wise Morning/Afternoon/Evening matrix...`,
        `> Done. Compiling packing recommendations.`
      ];

      let lineIndex = 0;
      const typeNextLine = () => {
        if (lineIndex < lines.length) {
          const div = document.createElement('div');
          div.className = 'terminal-line';
          div.textContent = lines[lineIndex];
          terminalBody.appendChild(div);
          
          // Scroll terminal to bottom
          terminalBody.scrollTop = terminalBody.scrollHeight;
          
          lineIndex++;
          setTimeout(typeNextLine, 250);
        } else {
          setTimeout(resolve, 300); // completed
        }
      };
      
      typeNextLine();
    });
  };

  // Get matching mock preset or compute dynamically
  const getMockOrDynamicItinerary = (inputs) => {
    const orig = inputs.origin.toLowerCase();
    const theme = inputs.theme;
    const style = inputs.style;

    // Matching criteria
    if ((!inputs.destination || inputs.destination.toLowerCase().includes('gokarna')) && orig.includes('hyd') && theme === 'beaches' && style === 'relaxed') {
      return mockItineraries["hyderabad_gokarna_relaxed"];
    }
    if ((!inputs.destination || inputs.destination.toLowerCase().includes('munnar')) && orig.includes('bang') && theme === 'hills' && style === 'relaxed') {
      return mockItineraries["bangalore_munnar_relaxed"];
    }

    // Dynamic generation engine
    return generateDynamicItinerary(inputs);
  };

  // Live Gemini API Integration
  const generateWithGemini = async (inputs, apiKey) => {
    const prompt = `
      You are Wayfarer, an expert AI travel planning assistant. 
      Create a personalized travel plan based on these constraints:
      - Origin: ${inputs.origin}
      - Destination / Region interest (Optional): ${inputs.destination}
      - Destination type/Theme: ${inputs.theme}
      - Duration: ${inputs.duration} days
      - Budget Cap: ${inputs.budget} INR
      - Travelers: ${inputs.travelers}
      - Pacing/Style: ${inputs.style}
      - Dietary preferences: ${inputs.diet}
      - Extra Notes: ${inputs.notes}

      UNREALISTIC REQUEST PUSHBACK REQUIREMENT:
      Analyze if the request is unrealistic (e.g. asking to cover too many cities/destinations in too few days, or a budget that is far too low for a Luxury travel style, or a very distant destination for a 1-2 day trip).
      If the plan is unrealistic:
      1. Reason about the trade-offs (time vs money vs energy vs weather vs crowds) like a human expert.
      2. PUSH BACK on the request and propose a realistic alternative (e.g. focus on just 1 city, recommend a realistic higher budget, or suggest a closer weekend destination).
      3. Set the "pushback" key in the JSON response with the details of your pushback and the alternative.
      4. Adjust the generated itinerary and budget to match your proposed alternative rather than forcing the unrealistic request to fit.

      Return a JSON object exactly matching this format structure:
      {
        "pushback": null, // or { "originalRequest": "string", "reason": "string", "alternative": "string" } if you pushed back on an unrealistic request
        "destinations": [
          { "name": "Name, State", "whyFits": "One-line why this fits user preferences", "downside": "One honest downside/trade-off", "costTier": "Budget|Mid-range|Splurge" }
        ],
        "itinerary": [
          { 
            "day": 1, 
            "title": "Day Title", 
            "morning": "Activities in morning", 
            "afternoon": "Activities in afternoon", 
            "evening": "Activities in evening", 
            "weatherFlag": true_if_weather_dependent_else_false, 
            "bookingFlag": true_if_booking_ahead_critical_else_false,
            "stops": [
              { "name": "Morning Stop Name", "coords": [latitude_float, longitude_float] },
              { "name": "Afternoon Stop Name", "coords": [latitude_float, longitude_float] },
              { "name": "Evening Stop Name", "coords": [latitude_float, longitude_float] }
            ]
          }
        ],
        "budget": {
          "currency": "INR",
          "categories": [
            { "name": "Category name", "low": 1000, "high": 1500 }
          ],
          "trims": [
            { "description": "Specific budget trim action", "savings": 500 }
          ]
        },
        "packing": {
          "documents": ["doc1", "doc2"],
          "clothing": ["clothing1", "clothing2"],
          "health": ["health1"],
          "tech": ["tech1"],
          "specific": ["specific1", "specific2"]
        }
      }

      Strictly return ONLY raw JSON content. Do not wrap in markdown \`\`\`json blocks. Keep descriptions very realistic, localized, and specific to the season (July 2026). Give 2-3 destination options (if destination interest is blank, suggest options. If destination interest is filled, the first one must be the destination itself or your recommended alternative, and the other 2 should be alternative options). Construct the day-wise itinerary for the best recommended first option. Follow the original persona guidelines strictly (non-touristy picks, weather contingencies, buffer time, no placeholders). Ensure that every day has exactly 3 stops with coordinates near the destination for the map.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const resJson = await response.json();
    const outputText = resJson.candidates[0].content.parts[0].text;
    return JSON.parse(outputText);
  };

  // Rendering Results to the UI
  const renderResults = (inputs, data) => {
    // 0. Update Meta tags & Title
    const mainDestName = data.destinations[0].name;
    resultsTitle.innerHTML = `Plan: <span style="color: var(--accent-primary)">${mainDestName}</span>`;
    
    resultsMeta.innerHTML = `
      <div class="meta-badge"><i data-lucide="map-pin"></i> From ${inputs.origin}</div>
      <div class="meta-badge"><i data-lucide="calendar"></i> ${inputs.duration} Days</div>
      <div class="meta-badge"><i data-lucide="users"></i> ${inputs.travelers}</div>
      <div class="meta-badge"><i data-lucide="coffee"></i> ${inputs.style}</div>
      <div class="meta-badge"><i data-lucide="leaf"></i> ${inputs.diet}</div>
    `;

    // Render Pushback Banner if active
    pushbackBannerContainer.innerHTML = '';
    if (data.pushback) {
      const banner = document.createElement('div');
      banner.className = 'pushback-banner';
      banner.innerHTML = `
        <div class="pushback-header">
          <i data-lucide="alert-triangle"></i>
          <span>Expert Planner Advice</span>
        </div>
        <p class="pushback-desc">
          <strong>Original Request:</strong> ${data.pushback.originalRequest}<br>
          <strong>Analysis:</strong> ${data.pushback.reason}
        </p>
        <div class="pushback-alternative">
          <strong>Proposed Alternative:</strong> ${data.pushback.alternative}
        </div>
      `;
      pushbackBannerContainer.appendChild(banner);
    }

    // 1. Render Destination Suggestions
    destinationsGrid.innerHTML = '';
    data.destinations.forEach((dest, index) => {
      const card = document.createElement('div');
      card.className = `suggestion-card ${index === 0 ? 'recommended' : ''}`;
      
      const costBadgeClass = dest.costTier.toLowerCase() === 'budget' 
        ? 'tier-budget' 
        : dest.costTier.toLowerCase() === 'splurge' 
          ? 'tier-splurge' 
          : 'tier-mid-range';

      card.innerHTML = `
        ${index === 0 ? '<div class="rec-badge">Best Match</div>' : ''}
        <div class="card-header-row">
          <h3 class="dest-name">${dest.name}</h3>
          <span class="dest-tier ${costBadgeClass}">${dest.costTier}</span>
        </div>
        <p class="why-fits"><strong>Why this fits:</strong> ${dest.whyFits}</p>
        <div class="trade-off">
          <i data-lucide="alert-triangle"></i>
          <span><strong>Trade-off:</strong> ${dest.downside}</span>
        </div>
      `;
      destinationsGrid.appendChild(card);
    });

    // 2. Render Day-wise Itinerary
    itineraryTimeline.innerHTML = '';
    data.itinerary.forEach((d, index) => {
      // Ensure stops exist for map rendering (e.g. if API didn't return them)
      if (!d.stops || d.stops.length < 3) {
        const destName = data.destinations[0].name;
        d.stops = [
          { name: d.morning.split('.')[0].substring(0, 35), coords: getCoordsForDestination(destName, (d.day - 1) * 3) },
          { name: d.afternoon.split('.')[0].substring(0, 35), coords: getCoordsForDestination(destName, (d.day - 1) * 3 + 1) },
          { name: d.evening.split('(')[0].split('.')[0].substring(0, 35).trim(), coords: getCoordsForDestination(destName, (d.day - 1) * 3 + 2) }
        ];
      }

      const dayCard = document.createElement('div');
      dayCard.className = `day-card ${index === activeDayIndex ? 'active-day-card' : ''}`;
      dayCard.setAttribute('data-day-num', d.day);
      
      let flags = '';
      if (d.weatherFlag) {
        flags += `<span class="flag-pill flag-weather"><i data-lucide="cloud-rain" style="width:12px;height:12px;"></i> Weather-sensitive</span>`;
      }
      if (d.bookingFlag) {
        flags += `<span class="flag-pill flag-booking"><i data-lucide="alert-circle" style="width:12px;height:12px;"></i> Book Ahead ⚠</span>`;
      }

      let travel1 = '';
      let travel2 = '';
      if (d.stops && d.stops.length >= 3) {
        const dist1_2 = getHaversineDistance(d.stops[0].coords, d.stops[1].coords);
        const dist2_3 = getHaversineDistance(d.stops[1].coords, d.stops[2].coords);
        travel1 = getTravelTimeText(dist1_2);
        travel2 = getTravelTimeText(dist2_3);
      }

      dayCard.innerHTML = `
        <div class="day-header">
          <div class="day-title-block">
            <span class="day-number">Day ${d.day}</span>
            <h3 class="day-title">${d.title}</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn-regenerate-day" data-day="${d.day}">
              <i data-lucide="refresh-cw"></i> Regenerate Day
            </button>
            <div class="day-flags">${flags}</div>
          </div>
        </div>
        <div class="day-content">
          <div class="time-block">
            <span class="time-label">Morning</span>
            <p class="time-description">${d.morning}</p>
          </div>
          
          ${travel1 ? `<div class="travel-time-tag"><i data-lucide="navigation"></i> <span>${travel1}</span></div>` : ''}

          <div class="time-block">
            <span class="time-label">Afternoon</span>
            <p class="time-description">${d.afternoon}</p>
          </div>

          ${travel2 ? `<div class="travel-time-tag"><i data-lucide="navigation"></i> <span>${travel2}</span></div>` : ''}

          <div class="time-block">
            <span class="time-label">Evening</span>
            <p class="time-description">${d.evening}</p>
          </div>
        </div>
      `;

      dayCard.addEventListener('click', (e) => {
        if (e.target.closest('.btn-regenerate-day')) return;
        document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active-day-card'));
        dayCard.classList.add('active-day-card');
        activeDayIndex = d.day - 1;
        updateMapForDay(activeDayIndex);
      });

      const regenBtn = dayCard.querySelector('.btn-regenerate-day');
      regenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        regenerateDay(d.day);
      });

      itineraryTimeline.appendChild(dayCard);
    });

    // 3. Render Budget Table & Trims
    renderBudgetSection(inputs, data);

    // 4. Render Packing List Categories
    renderPackingSection(data);

    // Refresh icons
    lucide.createIcons();
  };

  const renderBudgetSection = (inputs, data) => {
    const categories = data.budget.categories;
    const trims = data.budget.trims;
    const maxBudget = parseInt(inputs.budget);
    
    let lowTotal = 0;
    let highTotal = 0;

    budgetTableBody.innerHTML = '';
    
    categories.forEach(c => {
      lowTotal += c.low;
      highTotal += c.high;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.name}</td>
        <td>₹${c.low.toLocaleString('en-IN')}</td>
        <td class="high-val" data-base-val="${c.high}">₹${c.high.toLocaleString('en-IN')}</td>
      `;
      budgetTableBody.appendChild(tr);
    });

    // Calculate applied savings
    let appliedSavings = 0;
    selectedTrims.forEach(idx => {
      appliedSavings += trims[idx].savings;
    });

    const activeHighTotal = highTotal - appliedSavings;

    // Total Row
    const totalTr = document.createElement('tr');
    totalTr.className = 'total-row';
    totalTr.innerHTML = `
      <td>Total Estimated Cost</td>
      <td>₹${lowTotal.toLocaleString('en-IN')}</td>
      <td id="budgetHighTotal">₹${activeHighTotal.toLocaleString('en-IN')}</td>
    `;
    budgetTableBody.appendChild(totalTr);

    // Warnings and Trims footer
    budgetFooterContainer.innerHTML = '';
    
    if (highTotal > maxBudget) {
      const isStillExceeded = activeHighTotal > maxBudget;
      const warningBg = isStillExceeded ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)';
      const warningBorder = isStillExceeded ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
      const warningColor = isStillExceeded ? '#f87171' : '#4ade80';
      const warningText = isStillExceeded 
        ? `The high-end estimate (₹${activeHighTotal.toLocaleString('en-IN')}) exceeds your hard cap of ₹${maxBudget.toLocaleString('en-IN')} by ₹${(activeHighTotal - maxBudget).toLocaleString('en-IN')}.`
        : `Applied trims successfully brought your budget estimate (₹${activeHighTotal.toLocaleString('en-IN')}) below your ₹${maxBudget.toLocaleString('en-IN')} cap!`;

      const warningCard = document.createElement('div');
      warningCard.className = 'budget-cap-warning';
      warningCard.style.background = warningBg;
      warningCard.style.borderColor = warningBorder;
      
      let trimItems = '';
      trims.forEach((t, i) => {
        const isChecked = selectedTrims.has(i) ? 'checked' : '';
        trimItems += `
          <div class="trim-item" data-idx="${i}">
            <input type="checkbox" class="trim-checkbox" ${isChecked}>
            <div class="trim-content">
              <span class="trim-text">${t.description}</span>
              <br>
              <span class="trim-savings">Saves ₹${t.savings.toLocaleString('en-IN')}</span>
            </div>
          </div>
        `;
      });

      warningCard.innerHTML = `
        <div class="warning-header" style="color: ${warningColor}">
          <i data-lucide="${isStillExceeded ? 'alert-triangle' : 'check-circle'}"></i>
          <span>Budget Target Warning</span>
        </div>
        <p class="warning-desc" style="color: var(--text-primary)">${warningText}</p>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; font-weight: 600;">Interactive Budget Trims (Toggle to adjust high estimate):</p>
        <div class="trims-list">
          ${trimItems}
        </div>
      `;
      budgetFooterContainer.appendChild(warningCard);

      // Add Trim Listeners
      warningCard.querySelectorAll('.trim-item').forEach(item => {
        item.addEventListener('click', (e) => {
          const idx = parseInt(item.dataset.idx);
          const checkbox = item.querySelector('.trim-checkbox');
          
          // Avoid double-toggle if they click precisely on the checkbox itself
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
          }

          if (checkbox.checked) {
            selectedTrims.add(idx);
          } else {
            selectedTrims.delete(idx);
          }
          
          // Re-render budget calculations
          renderBudgetSection(inputs, data);
          lucide.createIcons();
        });
      });
    } else {
      // Budget is safe
      const safeCard = document.createElement('div');
      safeCard.className = 'budget-cap-warning';
      safeCard.style.background = 'rgba(34, 197, 94, 0.08)';
      safeCard.style.borderColor = 'rgba(34, 197, 94, 0.2)';
      safeCard.innerHTML = `
        <div class="warning-header" style="color: #4ade80">
          <i data-lucide="check-circle"></i>
          <span>Budget Target Met</span>
        </div>
        <p class="warning-desc" style="color: var(--text-primary)">
          Excellent news! The estimated high-end cost of ₹${highTotal.toLocaleString('en-IN')} fits comfortably within your maximum cap of ₹${maxBudget.toLocaleString('en-IN')}.
        </p>
      `;
      budgetFooterContainer.appendChild(safeCard);
    }
  };

  const renderPackingSection = (data) => {
    packingWrapper.innerHTML = '';
    
    const categories = [
      { key: 'documents', title: 'Documents & Money', icon: 'file-text' },
      { key: 'clothing', title: 'Clothing & Footwear', icon: 'shirt' },
      { key: 'health', title: 'Health & Toiletries', icon: 'heart-pulse' },
      { key: 'tech', title: 'Tech & Gadgets', icon: 'smartphone' }
    ];

    // Collect weather hazard items
    const weatherItems = [];
    if (data && data.itinerary) {
      data.itinerary.forEach(d => {
        if (d.weatherFlag) {
          weatherItems.push(`Rainproof gear (Umbrella/Poncho) — Day ${d.day} weather warning`);
        }
      });
    }

    let totalItemsCount = 0;
    
    // Inject Categories
    categories.forEach(cat => {
      let items = [...(data.packing[cat.key] || [])];
      
      // Inject weather-aware adjustments into clothing
      if (cat.key === 'clothing' && weatherItems.length > 0) {
        items = [...items, ...weatherItems];
      }
      
      if (!items || !items.length) return;
      
      totalItemsCount += items.length;

      const card = document.createElement('div');
      card.className = 'packing-category';
      
      let listHtml = '';
      items.forEach((item, index) => {
        listHtml += `
          <label class="checklist-item">
            <input type="checkbox" data-cat="${cat.key}" data-index="${index}">
            <span>${item}</span>
          </label>
        `;
      });

      card.innerHTML = `
        <h3 class="category-title"><i data-lucide="${cat.icon}"></i> ${cat.title}</h3>
        <div class="checklist">
          ${listHtml}
        </div>
      `;
      packingWrapper.appendChild(card);
    });

    // Destination Specific
    const specificItems = data.packing.specific;
    if (specificItems && specificItems.length) {
      const forgetCard = document.createElement('div');
      forgetCard.className = 'easy-forget-card';
      
      let forgetGridHtml = '';
      specificItems.forEach((item, index) => {
        forgetGridHtml += `
          <div class="ef-item">
            <div class="ef-num">${index + 1}</div>
            <div class="ef-text">${item}</div>
          </div>
        `;
      });

      forgetCard.innerHTML = `
        <div class="ef-header">
          <i data-lucide="lightbulb"></i> Critical, Easy-to-Forget Recommendations for This Trip:
        </div>
        <div class="ef-grid">
          ${forgetGridHtml}
        </div>
      `;
      packingWrapper.appendChild(forgetCard);
    }

    // Set up checklist logic & progress bar
    const checkboxes = packingWrapper.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    const updateProgress = () => {
      const checkedCount = packingWrapper.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
      const totalCount = checkboxes.length;
      
      const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
      packingProgressBar.style.width = `${pct}%`;
      packingProgressText.textContent = `${pct}% Packed (${checkedCount}/${totalCount})`;
    };

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const itemLabel = cb.closest('.checklist-item');
        if (cb.checked) {
          itemLabel.classList.add('checked');
        } else {
          itemLabel.classList.remove('checked');
        }
        updateProgress();
      });
    });

    // Initial calculation
    updateProgress();
  };

  // Stepper Init
  updateStepper();
});
