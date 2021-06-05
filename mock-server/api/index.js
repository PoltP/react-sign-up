import express from 'express';
import {keys, ERRORS, OK_RESPONSE, DEFAULT_DELAY} from './constants';

export const apiRouter = express.Router();

// Emulates server side database
const namesCollection = {};

const convertUsername = username => {
    return username?.trim().toLowerCase();
}
const checkIsAlreadyTakenError = (username) => {
    if (username && namesCollection[convertUsername(username)]) {
        return {
            username: ERRORS.already_taken
        };
    }
    return undefined;
}
const checkErrors = (body) => {
    return keys.reduce((acc, key) => {
        let error = undefined;
        if (!body[key] || body[key].trim() === '') {
            error = ERRORS.blank;
        } else if (key === 'name' && checkIsAlreadyTaken(body['name'])) {
            error = ERRORS.already_taken
        }
        if(error) {
            if (!acc) acc = {};
            acc[key] =error;
        }
        return acc;
    }, undefined);
}

const signUp = (req, res) => {
    const errors = checkErrors(req.body);
    if (!errors) {
        // In real case password must be hashed
        namesCollection[convertUsername(req.body.username)] = req.body;
        res.json(OK_RESPONSE).status(200);
    } else {
        res.json({
            errors: errors
        }).status(400);
    }
}

apiRouter.post('/check', (req, res) => {
    const {username = ''} = req.body;
    const error = checkIsAlreadyTakenError(username);
    if (!error) {
        res.json(OK_RESPONSE).status(200);
    } else {
        res.json({
            errors: error
        }).status(400);
    }
});

apiRouter.post('/signup', signUp);

apiRouter.post('/signup-delay/:interval', (req, res) => {
    const {interval = DEFAULT_DELAY} = req.params;
    setTimeout(() => signUp(req, res), interval);
});

apiRouter.post('/signup-throttle', (req, res) => {
    res.json({
        errors: {
            non_field_errors: ERRORS.non_field_errors
        }
    }).status(429);
});

apiRouter.post('/signup-error', () => {
    throw new Error('Unknown server error');
});

apiRouter.post('/signup-error-random', (req, res) => {
    res.status(500 + Math.floor(26.0 * Math.random())).send();
});