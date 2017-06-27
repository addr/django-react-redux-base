import { createReducer } from '../utils';
import { FEEDBACKS_FETCH_DATA_REQUEST, FEEDBACKS_RECEIVE_DATA, COMMENTS_FETCH_DATA_REQUEST, COMMENTS_RECEIVE_DATA, COMMENTS_POST_REQUEST, FEEDBACK_FORM_REQUEST, FEEDBACK_FORM_RECEIVE, FEEDBACK_FORM_POST_REQUEST } from '../constants';

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
            feedbacks: payload.data,
            isFetching: false
        });
    },
    [COMMENTS_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [COMMENTS_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            comments: payload.data,
            isFetching: false
        });
    },
    [COMMENTS_POST_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [FEEDBACK_FORM_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [FEEDBACK_FORM_RECEIVE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false
        });
    },
    [FEEDBACK_FORM_POST_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
});
