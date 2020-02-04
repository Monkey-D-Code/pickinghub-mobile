import axios from 'axios';


const backend = axios.create({
    baseURL : window.location.port === "3000" ? 'http://192.168.0.105:8000/' : 'https://pickinghub.pythonanywhere.com/',
    timeout : 20000,
});

export default backend;