import axios from "axios"

/**
 * Base Request
 */
const api = axios.create({
    headers: {
        accept: 'application/json',
    },
});

/**
 * Default Image Url
 */
const imageUrl = "https://pokeres.bastionbot.org/images/pokemon/";

/**
 * Search Pokemon Details By Id
 */
export const apiFetchPokemonDetails = (id) => {

    return new Promise((resolve, reject) => {
        return api.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                res.data.image = `${imageUrl}${id}.png`
                resolve(res);
            }).catch(error => reject(error));
    });
}

/**
 * Search Pokemon Characteristic 
 */
export const apiFetchPokemonCharacteristic = (id) => {

    return new Promise((resolve, reject) => {
        return api.get(`https://pokeapi.co/api/v2/characteristic/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

// https://pokeapi.co/api/v2/characteristic/2

export default api;