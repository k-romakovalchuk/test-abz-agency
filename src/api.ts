const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if(!response.ok) {
        throw `${response.status} - ${response.statusText}`;
      }
      return response.json();
    })
}

export const getToken = () => {
  return fetch(`${BASE_URL}token`)
    .then(response => {
      if(!response.ok) {
        throw `${response.status} - ${response.statusText}`;
      }
      return response.json();
    })
    .then(result => result.token);
}

export const getPositions = () => {
  return fetch(`${BASE_URL}positions`)
    .then(response => {
      if (!response.ok) {
        throw `${response.status} - ${response.statusText}`;
      }
      return response.json();
    })
    .then(result => result.positions);
}

export const createUser = (
  formData: FormData,
  token: string
) => {
  return fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Token': token,
    },
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw `${response.status} - ${response.statusText}`;
    }
    return response.json();
  })
};