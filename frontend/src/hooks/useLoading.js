import { useState, createContext, useContext } from 'react';
// creating the context
const LoadingContext = createContext({});
// creating the loading provider 
export const LoadingProvider = ({ children }) => {
    // by default it shows the loading
  const [isLoading, setIsLoading] = useState(true);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);
// the loading context provider is the parent hence the children will be enclosed
  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
// uses the loading context inside the components
export const useLoading = () => useContext(LoadingContext);