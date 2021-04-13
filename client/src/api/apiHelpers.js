const BASE_URL = process.env.REACT_APP_API_URL;

const getRequestOptions = (method, data = {}, headers = {}) => {
  switch (method) {
    case 'POST':
      return {
        headers,
        method,
        body: data,
      };
    case 'GET':
      return {
        headers,
        method,
      };
    default:
      return {
        headers,
        method,
      };
  }
};

export const makeRequestToApi = (route, method, data, headers) => {
  const options = getRequestOptions(method, data, headers);

  return fetch(`${BASE_URL}/${route}`, options);
};
