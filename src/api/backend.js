import axios from 'axios';


const backend = axios.create({
    baseURL : window.location.port === "300" ? 'http://192.168.0.104:8000/' : 'https://pickinghub.pythonanywhere.com/',
    timeout : 20000,
});

export default backend;