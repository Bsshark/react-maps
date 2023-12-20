import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    params: {
        format: 'geojson',
        //access token??
    }
});

export default searchApi;