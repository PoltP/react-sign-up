export const keys = ['username', 'email', 'password'];

export const DEFAULT_DELAY = 5000;

export const OK_RESPONSE = {ok: true};

export const ERRORS = {
    blank: {
        code: "blank",
        message: "This field may not be blank."
    },
    already_taken: {
        code: "already_taken",
        message: "This name is already taken."
    },
    non_field_errors: {
        code: "throttle",
        message: "Your request was throttled. Please try again in 56 sec."
    }
};
