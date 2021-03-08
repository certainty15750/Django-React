// const serverHost='http://35.243.252.213/api/v1';
const serverHost='http://localhost:8000/api/v1';

export default {
  baseURL: serverHost,
  headers: {
    'X-Parse-Application-Id': 'AnnotationApp',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeOut: 30000,
};
