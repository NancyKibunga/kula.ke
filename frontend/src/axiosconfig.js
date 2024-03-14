import axios from "axios";

// axios base url to guide the axios on which address to get data from
axios.defaults.baseURL = 
process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';