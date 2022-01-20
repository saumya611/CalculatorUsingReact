import * as ActionTypes from './ActionTypes';

export const EasterLists = (state = {
    errorMessage: null,
    easterList: []
}, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_EASTERLIST :
            return {...state, errorMessage: null, easterList: action.payload};

        case ActionTypes.LISTS_FAILED :
            return {...state, errorMessage: action.payload, easterList: []};

        default:
            return state;
    }
}