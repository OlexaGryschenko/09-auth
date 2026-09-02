// import axios from 'axios';

/* const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
}); */

// lib/api/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // Змінюємо зовнішній URL на локальний роут
  withCredentials: true, 
});