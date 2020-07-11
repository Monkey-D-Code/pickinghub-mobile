import axios from 'axios';


const backend = axios.create({
    baseURL : window.location.port === "3000" ? 'http://127.0.0.1:8000/' : 'https://pickinghub.pythonanywhere.com/',
    timeout : 25000,
});

export default backend;