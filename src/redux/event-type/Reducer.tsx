import { EVENT_TYPE } from './Actions';

const initialState = {
  type: '',
};

export const eventTypeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EVENT_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};
