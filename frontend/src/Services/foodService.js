import { sample_foods } from "../data";

export const getAll = async () => sample_foods;
//searches for the searchterm in the sample food
//it converts the item name and search term to lower case making it case insensitive thus no missing out on words
export const search = async searchTerm =>
sample_foods.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
);