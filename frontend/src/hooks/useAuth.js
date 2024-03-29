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

  // register function
  const register = async data => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success('Registered Successfully');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

//logout function to remove the user from the local storage
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

  // gets the user from the component and calls the user update profile and updates user
  const updateProfile = async user => {
    const updatedUser = await userService.updateProfile(user);
    toast.success('Profile Update Was Successful');
    if (updatedUser) setUser(updatedUser);
  };

  // gets the new password as input and updates it
  const changePassword = async passwords => {
    await userService.changePassword(passwords);
    logout();
    toast.success('Password Changed Successfully, Please Login Again!');
  };
// returning the authcontect provider by parsing the values and the children
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, changePassword }}
>
      {children}
    </AuthContext.Provider>
  );
};

// gives the user, login and logout values whenever the useAuth is applied
export const useAuth = () => useContext(AuthContext);