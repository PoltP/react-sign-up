import express from 'express';

export const apiRouter = express.Router();

// Emulates server side database
const namesCollection = {};

const keys = ['username', 'email', 'password'];

const OK_RESPONSE = {ok: true};

const ERRORS = {
    blank: {
        code: "blank",
        message: "This field may not be blank."
    },
    alreadyTaken: {
        code: "already_taken",
        message: "This name is already taken."
    }
};

const convertUsername = username => {
    return username?.trim().toLowerCase();
}

const checkIsAlreadyTakenError = (username) => {
    if (username && namesCollection[convertUsername(username)]) {
        return {
            username: ERRORS.alreadyTaken
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
            error = ERRORS.alreadyTaken
        }
        if(error) {
            if (!acc) acc = {};
            acc[key] =error;
        }
        return acc;
    }, undefined);
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

apiRouter.post('/signup', (req, res) => {
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
});
