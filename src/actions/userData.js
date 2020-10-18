
//CHOOSE_EVENT
export const chooseEvent = (event) => ({
  type: 'CHOOSE_EVENT',
  choosedEvent: event
});

// CHOOSE_SECTOR
export const chooseSector = (sectorName) => ({
  type: 'CHOOSE_SECTOR',
  sector: sectorName
});

// ADD_CHOOSED_PLACES
export const addChoosedPlaces = (places) => ({
  type: 'ADD_CHOOSED_PLACES',
  choosedPlaces: places
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
