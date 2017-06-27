import { createReducer } from '../utils';
import { FEEDBACKS_FETCH_DATA_REQUEST, FEEDBACKS_RECEIVE_DATA, COMMENTS_FETCH_DATA_REQUEST, COMMENTS_RECEIVE_DATA } from '../constants';

const initialState = {
    feedbacks: [],
    isFetching: false,
    comments: []
};

export default createReducer(initialState, {
    [FEEDBACKS_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [FEEDBACKS_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            feedbacks: payload.data
        });
    },
    [COMMENTS_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [COMMENTS_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            comments: payload.data
        });
    }
});
