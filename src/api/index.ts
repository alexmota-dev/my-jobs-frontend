import axios from 'axios';

export const api = axios.create({
  baseURL: "https://final-web-server-production.up.railway.app",
  headers: {
    'Content-Type': 'application/json',
  }
});
