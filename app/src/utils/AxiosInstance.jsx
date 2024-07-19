import axios from 'axios';

// Crée une instance d'Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Récupérer le token du sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans l'en-tête Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
