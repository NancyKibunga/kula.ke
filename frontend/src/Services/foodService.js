import { sample_foods, sample_tags } from "../data";

export const getAll = async () => sample_foods;
//searches for the searchterm in the sample food
//it converts the item name and search term to lower case making it case insensitive thus no missing out on words
export const search = async searchTerm =>
sample_foods.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

export const getAllTags = async () => sample_tags;

export const getAllByTag = async tag => {
    if(tag=== 'All') return getAll(); 
    return sample_foods.filter(item => item.tags?.includes(tag));
};
// code to find food items from the sample data using the item id as food id
export const getById = async foodId =>
sample_foods.find(item => item.id === foodId);