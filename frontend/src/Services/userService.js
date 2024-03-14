import axios from 'axios';

// checks user in the local storage, if available the data is parsed as a js object otherwise returns a null
export const getUser = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

    // login function, with a post since the method ot the caller and of the api is the same
export const login = async (email, password) => {
  const { data } = await axios.post('api/users/login', { email, password });
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

// logout function
export const logout = () => {
  localStorage.removeItem('user');
};