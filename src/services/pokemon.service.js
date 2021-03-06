
import kanto_pokemons from '../assets/data/kanto_pokemons.json'
import evolution_tree from '../assets/data/kanto_evolution_tree.json'
import { filter } from 'lodash';


export const searchKantoPokemon = () => {
    return new Promise((resolve, reject) => {
        let pokemons = kanto_pokemons.map(item => item);
        if (Object.keys(pokemons).length > 0) {
            return resolve(pokemons)
        } else {
            reject();
        }
    });
}


export const getPokemonsByName = (name) => {
    return new Promise((resolve, reject) => {
        let pokemons = kanto_pokemons.map(item => item);
        let filtered = filter(pokemons, function (obj) {
            return obj.name.indexOf(name.toLowerCase()) !== -1;
        });
        if (Object.keys(filtered).length > 0) {
            return resolve(filtered)
        } else {
            reject();
        }
    });
}

export const getPokemonsByType = (type) => {
    return new Promise((resolve, reject) => {
        let pokemons = kanto_pokemons.map(item => item);
        let filtered = pokemons.filter(a => a.types.includes(type))
        if (Object.keys(filtered).length > 0) {
            return resolve(filtered)
        } else {
            reject();
        }
    });
}

export const fetchEvolutionTree = (id) => {
    return new Promise((resolve, reject) => {
        let pokemons = evolution_tree.map(item => item);
        pokemons.forEach(item => {
            item.id.forEach(tmp => {
                if (tmp === parseInt(id)) {
                    return resolve(item.evolution_tree);
                }
            })
        })
        reject();
    });
}