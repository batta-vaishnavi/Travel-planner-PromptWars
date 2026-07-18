# Walkthrough - Wayfarer Travel Planner

Wayfarer is a travel planning web application built using HTML, Vanilla CSS, and Javascript. It supports a Local Mock Mode (default) and a Live Gemini API mode (configured via the settings panel).

This document outlines all the implemented features and explains how to manually verify each one since the automated browser runner encountered installation issues with the Playwright driver.

## Features & Verification Steps

### Preparation
1. Ensure the local Python server is running (started in the background on port `8000`).
2. Open your web browser and navigate to `http://localhost:8000/index.html`.

---

### 1. Advanced Input Intake & Configuration
- **Steps Indicator & Navigation**: The questionnaire is divided into three logical steps. Try clicking "Next" and "Back" to navigate. If required fields are empty, the form will prevent you from moving forward.
- **Optional Destination Input**: In Step 1, type a specific destination (e.g., `"Munnar"`), or leave it empty to receive destination suggestions.
- **Flexible Budget Option**: In Step 1, check the "Flexible Budget" checkbox. Note that the numeric budget input box disables, opacity drops, and the required attribute is cleared.
- **Business + Leisure Traveler Type**: In Step 2, click the travelers dropdown and verify the `"Business + Leisure"` option is present.
- **New Travel Styles**: In Step 2, under Travel Pace & Style, select `"Luxury"` or `"Budget-Backpacker"`.

---

### 2. Destination Suggestions & Trade-offs
- **How to verify**: Leave the destination blank, select beaches or hill stations, and submit.
- **Expected result**: The results will show 2-3 destination cards (e.g. Gokarna, Araku, Chikmagalur). Each contains a "Why this fits" line, an honest downside (such as monsoon tide conditions or long transit times), and a cost tier (Budget, Mid-range, Splurge).

---

### 3. Interactive Itinerary Map (Feature 1)
- **How to verify**: View the map at the top of the "2. Curated Day-Wise Itinerary" section.
- **Expected result**: An interactive dark-themed Leaflet map displays pins representing the stops for the active day.
  - The pins are numbered sequentially (1, 2, 3) to show the path.
  - A dashed route line connects the pins in sequence.
  - Clicking any pin displays a popup showing the stop name and activities.
  - Clicking on a different Day Card in the timeline updates the map automatically for that day's coordinates.

---

### 4. Proximity Routing & Distance/Travel Time (Feature 2)
- **How to verify**: Look at the timeline between consecutive blocks (e.g. between Morning and Afternoon, and Afternoon and Evening).
- **Expected result**: An inline, dashed-border tag shows the travel distance in km and duration (e.g., `→ 5.4 km · ~13 min by auto/scooter` or `→ 22.0 km · ~55 min by cab`), calculated dynamically via the haversine formula.

---

### 5. Weather-Aware Packing Adjustments (Feature 3)
- **How to verify**: Scroll down to Section 4 "Personalized Packing Checklist".
- **Expected result**: Under the **Clothing & Footwear** checklist, you will see weather-aware packing suggestions dynamically inserted (e.g., `Rainproof gear (Umbrella/Poncho) — Day 2 weather warning`), which pulls from warnings marked in the day-wise itinerary.

---

### 6. Interactive Budget Trims & Recalculation
- **How to verify**: In Section 3 "Realistic Budget Estimate", look for the interactive trims checkbox panel.
- **Expected result**: 
  - If the high-end total exceeds your target budget, a red warning panel is shown with checkboxes for budget-trim suggestions.
  - Toggle a trim checkbox (e.g., opting for a scooter rental instead of a cab).
  - The high estimate in the table, the total cost, and the warning card status immediately update and recalculate on screen.
  - If the new total drops below your cap, the banner turns green to indicate the target budget is met.

---

### 7. Interactive Packing Tracker
- **How to verify**: Check off items in the Documents, Clothing, Health, or Tech lists in Section 4.
- **Expected result**: Checking items updates the linear progress bar (moving towards 100%) and updates the progress label text (e.g., `25% Packed (3/12)`). Checked items are crossed out.

---

### 8. Single Day Regeneration (Feature 4)
- **How to verify**: Hover over any Day card and click the `"Regenerate Day"` button in the header.
- **Expected result**: The loading spinner turns, a new title and activities are chosen dynamically from alternate activities, and coordinates are re-plotted on the map without altering other days, the budget table, or the rest of the packing list.

---

### 9. Markdown Exporter (Feature 5)
- **How to verify**: Click the `"Export MD"` button in the top right of the Results View.
- **Expected result**: A `.md` file downloads immediately to your local system containing the full trip (suggestions, day-wise itinerary, warnings, budget tables, trims, and weather-aware packing checklist) formatted in clean markdown.

---

### 10. Expert Pushback Mechanic (Core Behavior)
- **How to verify**: In the questionnaire, enter an unrealistic request. For example:
  - Destination: `"Delhi, Mumbai, Goa"` (multi-city) with Duration: `3` days.
  - Travel style: `"Luxury"` with Budget: `5000` INR.
- **Expected result**: 
  - Submitting will show a prominent, yellow-bordered **Expert Planner Advice** banner at the top of the Results page.
  - It explains that multi-city transit or luxury pricing is unrealistic for those numbers, outlines the trade-offs, and details the alternative plan proposed (such as focusing on the first destination or adjusting the budget styling to Mid-range).
