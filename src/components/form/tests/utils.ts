import { Errors } from '../../types/form-fields';

import { config } from '../../../config';

export interface IParams {
  status?: number;
  statusText?: string;
  errors?: Errors;
}

export const mockFetch = (checkParams?: IParams, signupParams?: IParams) => async (url: string) => {
  const getResponse = (params?: IParams) => ({
    ok: !params || (!params.status && !params.errors),
    status: params?.status || 200,
    statusText: params?.statusText,
    json: async () => ({
      errors: params?.errors,
    }),
  });
  switch (url) {
    case `${config.serverAPI}/check`:
      return getResponse(checkParams);
    case `${config.serverAPI}/signup`:
      return getResponse(signupParams);
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
};

export const getStyledComponent = (StyledComponent: any, name: string = '', index = 0) => {
  const componentClass = StyledComponent.styledComponentId;
  let components = document.getElementsByClassName(componentClass);
  if (name !== '') {
    const filteredByName = [];
    for (let i = 0; i < components.length; ++i) {
      const component: any = components[i];
      if (component.name === name) {
        filteredByName.push(component);
      }
    }
    return filteredByName[index];
  }
  return components && components[index];
};
