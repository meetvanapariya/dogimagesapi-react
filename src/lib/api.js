import axios from "axios";

const API_URL = 'https://api.thedogapi.com/v1/';
const API_KEY = '613d8e64-7437-49ee-b55e-6d33aa4c9499';

const callAPI = async (url, params = null ) =>{
    const requestConfig = {
        baseURL : API_URL,
        headers :{
            'x-api-key' : API_KEY
        },
        url
    }
    if(params){
        requestConfig.params = params;
    }
    try{
        return await axios(requestConfig);
    }catch (err){
        console.log("Error",err);
    }
}

export const fetchBreeds = async(page,count=10) =>{
    const breeds = await callAPI('breeds',{
        limit:count,
        page
    });
    return {
        breeds : breeds.data,
        totalBreeds : breeds.headers['pagination-count'],
    }
}
export const fetchPictures = async (breed = '', count = 20 ) =>{
    if(!breed){
        return [];
    }
    const pictures = await callAPI('images/search',{
        breed_id:breed,
        limit:count
    });
    return pictures.data
}