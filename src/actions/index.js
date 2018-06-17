import axios from 'axios';

const ROOT_URL = 'https://dog.ceo/api/';

export const FETCH_DOGS = 'FETCH_DOGS';
export const FETCH_BREEDS = 'FETCH_BREEDS';
export const FETCH_SUB_BREEDS = 'FETCH_SUB_BREEDS';
export const SAVE_DOG = 'SAVE_DOG';
export const DOGS_UPDATE = 'DOGS_UPDATE';

export function fetchDogs(name, font_family, color, breed, sub_breed){
  let url = '';
  if(sub_breed == 'all'){
    url = `${ROOT_URL}breed/${breed}/images`;
  }else{
    url = `${ROOT_URL}breed/${breed}/${sub_breed}/images`;
  }
  const request = axios.get(url).then((resp) => {
    let data = [];
    for(let i in resp.data.message){
      data.push({name: name, font_family: font_family, color:color, breed: breed, image_url: resp.data.message[i]});
    }
    return data;
  });

  return {
    type: FETCH_DOGS,
    payload: request
  };
}

export function fetchBreeds(){
  const url = `${ROOT_URL}breeds/list/all`;
  const request = axios.get(url).then((resp) => {
    let data = [];
    for(let i in resp.data.message){
      data.push(i);
    }
    return data;
  });

  return {
    type: FETCH_BREEDS,
    payload: request
  };
}

export function fetchSubBreeds(breed){
  const url = `${ROOT_URL}breed/${breed}/list`;
  const request = axios.get(url);

  return {
    type: FETCH_SUB_BREEDS,
    payload: request
  };
}


export function saveDog(data){
  return {
    type: SAVE_DOG,
    payload: data
  };
}

export function dogsUpdate(data){
  return {
    type: DOGS_UPDATE,
    payload: data
  };
}