import csrfFetch from "./csrf.js";

const SET_LISTINGS = 'listings/setListings';
const ADD_LISTING = 'listing/addListing';

const setListings = listings => ({
    type: SET_LISTINGS,
    payload: listings
});

export const fetchListings = () => async (dispatch) => {
    const res = await fetch('/api/listings');
    const data = await res.json();
    return dispatch(setListings(data));
}

export const getListings = (state) => {
    return state.listings ? Object.values(state.listings) : []
}

const listingsReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_LISTINGS:
            return action.payload
        
        default:
            return state;
    }
}

export default listingsReducer;

