import axios from 'axios';

export const api = axios.create({
  baseURL: "https://myjobs.up.railway.app/api",
  headers: {
    'Content-Type': 'application/json',
  }
});
