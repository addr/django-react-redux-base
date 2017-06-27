import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    FEEDBACKS_FETCH_DATA_REQUEST,
    FEEDBACKS_RECEIVE_DATA,
    COMMENTS_FETCH_DATA_REQUEST,
    COMMENTS_RECEIVE_DATA,
    COMMENTS_POST_REQUEST,
    FEEDBACK_FORM_POST_REQUEST
} from '../constants';

export function feedbackDataRequest() {
    return {
        type: FEEDBACKS_FETCH_DATA_REQUEST
    };
}

export function feedbacksReceiveData(data) {
    return {
        type: FEEDBACKS_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function commentsDataRequest() {
    return {
        type: COMMENTS_FETCH_DATA_REQUEST
    };
}

export function commentsReceiveData(data) {
    return {
        type: COMMENTS_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function commentPostRequest() {
    return {
        type: COMMENTS_POST_REQUEST,
    }
}

export function feedbackFormPostRequest() {
    return {
        type: FEEDBACK_FORM_POST_REQUEST
    }
}

export function getFeedbacks() {
    return (dispatch, state) => {
        dispatch(feedbackDataRequest());
        return fetch(`${SERVER_URL}/api/v1/feedback/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(feedbacksReceiveData(response));
            })
            .catch((error) => {
                console.log(`Error getting data: ${error}`)
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function postComment(comment) {
    return (dispatch) => {
        dispatch(commentPostRequest());
        return fetch(`${SERVER_URL}/api/v1/comments/`, {
            method: 'post',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(getComments(comment.feedback_id))
        })
        .catch((error) => {
            console.log(`Error fetching comments: ${JSON.stringify(error)}`);
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    };
}

export function getComments(feedbackID) {
    return (dispatch, state) => {
        dispatch(commentsDataRequest());
        return fetch(`${SERVER_URL}/api/v1/comments/${feedbackID}/`, {
            // headers: {
            //     Accept: 'application/json',
            //     Authorization: `Token ${token}`
            // }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(commentsReceiveData(response));
            })
            .catch((error) => {
                console.log(`Error getting data: ${error.response}`)
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function postFeedbackPrompt(rating) {
    return (dispatch) => {
        dispatch(feedbackFormPostRequest());
        return fetch(`${SERVER_URL}/api/v1/feedback/update/`, {
            method: 'post',
            body: JSON.stringify(rating),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(getComments(rating.search_feedback_id));
            dispatch(push(`/feedback/${rating.search_feedback_id}/thank-you`));
        })
        .catch((error) => {
            console.log(`Error fetching comments: ${JSON.stringify(error)}`);
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    };
}
