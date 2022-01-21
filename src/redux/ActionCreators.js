import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addLists = (easterList) => ({
    type: ActionTypes.FETCH_EASTERLIST,
    payload: easterList
});

export const listsFailed = (errorMessage) => ({
    type: ActionTypes.LISTS_FAILED,
    payload: errorMessage
})

export const fetchLists = () => (dispatch) => {
    
    // Below in return I used REST Api get HTTP Request 
    // using fetch built-in React Package
    
    return fetch(baseUrl+'lists')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMessage = new Error(error.message);
            throw errorMessage;
        })
        .then(response => response.json())
        .then(easterList => dispatch(addLists(easterList)))
        .catch(error => dispatch(listsFailed(error.message)));
};
