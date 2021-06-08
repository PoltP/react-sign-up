import { config } from '../config';
import type { User } from '../types/form-fields';

const POST_HEADER = {
  Accept: 'application/json',
  'Content-type': 'application/json; charset=UTF-8',
};

export const check = (username: string): Promise<Response> =>
  fetch(`${config.serverAPI}/check`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: POST_HEADER,
  });

export const signUp = (user: User): Promise<Response> =>
  fetch(`${config.serverAPI}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
    headers: POST_HEADER,
  });
