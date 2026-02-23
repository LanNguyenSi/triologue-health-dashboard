import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const client = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});
export async function getHealth() {
    const { data } = await client.get('/api/health');
    return data;
}
export async function getMetrics() {
    const { data } = await client.get('/api/metrics');
    return data;
}
export async function getSystemMetrics() {
    const { data } = await client.get('/api/metrics/system');
    return data;
}
export default client;
