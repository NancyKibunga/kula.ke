import axios from "axios";

// get request using axios that gets the data and returns the data
export const getAll = async () => {
    const { data } = await axios.get('/api/foods');
    return data;

};

//searches for the searchterm in the api
export const search = async searchTerm =>
{
   const { data } = await axios.get('api/foods/search/'+ searchTerm);
   return data; 
};

// find foods using tag from the api in the backend
export const getAllTags = async () => {
    const { data } = await axios.get('/api/foods/tags');
    return data;
};

export const getAllByTag = async tag => {
    if(tag === 'All') return getAll(); 
   const { data } = await axios.get('/api/foods/tag/' +tag);
   return data;  
};

// code to find food items from the sample data using the item id as food id
export const getById = async foodId => {
    const { data } = await axios.get('/api/foods/' + foodId);
    return data;
};
