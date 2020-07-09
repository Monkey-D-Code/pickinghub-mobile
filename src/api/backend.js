import axios from 'axios';


const backend = axios.create({
    baseURL : window.location.port === "3000" ? 'https://pickinghub.pythonanywhere.com/' : 'https://pickinghub.pythonanywhere.com/',
    timeout : 25000,
});

export default backend;