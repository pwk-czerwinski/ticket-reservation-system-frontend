
const defaultUserData = {
  choosedEvent: {},
  sector: '',
  choosedPlaces: [],
  personalData: {}
};

export default (state = defaultUserData, action) => {
  switch (action.type) {
    case 'CHOOSE_EVENT':
      return action.choosedEvent;
    case 'CHOOSE_SECTOR':
      return {
        ...state,
        sector: action.sector
      };
    case 'ADD_CHOOSED_PLACES':
      return {
        ...state,
        choosedPlaces: action.choosedPlaces
      };
    case 'ADD_PERSONAL_DATA':
      return {
        ...state,
        personalData: action.personalData
      };
    case 'ADD_FINAL_MESSAGE':
      return {
        ...state,
        messageAfterReservation: action.messageAfterReservation
      };
    case 'persist/REHYDRATE':
      return {
        ...state
      };
    default:
      return state;
  }
};
