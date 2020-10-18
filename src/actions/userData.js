
//CHOOSE_EVENT
export const chooseEvent = (event) => ({
  type: 'CHOOSE_EVENT',
  selectedEvent: event
});

// CHOOSE_SECTOR
export const chooseSector = (sectorName) => ({
  type: 'CHOOSE_SECTOR',
  sector: sectorName
});

// ADD_SELECTED_PLACES
export const addSelectedPlaces = (places) => ({
  type: 'ADD_SELECTED_PLACES',
  selectedPlaces: places
});

// ADD_PERSONAL_DATA
export const addPersonalData = (personalData) => ({
  type: 'ADD_PERSONAL_DATA',
  personalData: personalData
});

// ADD_FINAL_MESSAGE
export const addFinalMessage = (finalMessage) => ({
  type: 'ADD_FINAL_MESSAGE',
  messageAfterReservation: finalMessage
});
