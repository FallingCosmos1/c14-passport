# C14 Passport (Expo React Native)

A digital customer "passport" for Cervecería 14 locations in Guatemala.

## Features
- Splash page styled like a national passport (tap to continue)
- Holder info page with:
  - Photo
  - Place of issue: Ciudad Vieja, Guatemala
  - Date of issue: today
  - Expiration: "hasta la penúltima"
  - Random 8-digit passport number
- "mis viajes" button styled with an antique DC-3 that opens the stamps page
- Stamps page lists locations and lets you add/remove a dated stamp

> Note: Stamps are in-memory. We can add persistence with AsyncStorage.

## Run locally
1. Install Node (LTS) and Expo CLI: `npm i -g expo`
2. Clone this repo and install deps:  
   `npm install`
3. Start: `npm run start`
4. Open with Expo Go (QR) or press `w` for web.
