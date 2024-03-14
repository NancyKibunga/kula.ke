import { useState, createContext, useContext } from 'react';
import * as userService from '../Services/userService';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // define the user state
  const [user, setUser] = useState(userService.getUser());
// adding the login function  and defining it
  const login = async (email, password) => {
    // successful login
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success('Login Successful');
    } 
    // failed login 
    catch (err) {
      toast.error(err.response.data);
    }
  };

//logout function to remove the user from the local storage
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

// returning the authcontect provider by parsing the values and the children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// gives the user, login and logout values whenever the useAuth is applied
export const useAuth = () => useContext(AuthContext);