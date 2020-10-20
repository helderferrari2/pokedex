import React, { Component } from "react";
import {
  apiFetchPokemonDetails,
  apiFetchPokemonCharacteristic,
} from "../services/http.service";
import { fetchEvolutionTree } from "../services/pokemon.service";
import Badge from "../components/Badge";
import StatsChart from "../components/StatsChart";

export default class Details extends Component {
  state = {
    item: {
      profile: {},
      types: [],
      abilities: [],
      characteristic: [],
      stats: [],
      evolutionTree: [],
    },
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    apiFetchPokemonDetails(id)
      .then((response) => {
        let { data } = response;
        let profile = this.prepareProfile(data);
        let types = this.prepareTypes(data);
        let abilities = this.prepareAbilities(data);
        let stats = data.stats;
        this.setState({
          item: { ...this.state.item, profile, types, abilities, stats },
        });
      })
      .catch((error) => console.log(error));

    apiFetchPokemonCharacteristic(id)
      .then((response) => {
        let { data } = response;
        let characteristic = this.prepareCharacteristic(data);
        this.setState({ item: { ...this.state.item, characteristic } });
      })
      .catch((error) => console.log(error));

    fetchEvolutionTree(id)
      .then((response) => {
        let evolutionTree = response;
        this.setState({ item: { ...this.state.item, evolutionTree } });
      })
      .catch((error) => console.log(error));
  }

  prepareProfile = (data) => {
    let { id, name, weight, height, base_experience, image } = data;
    return { id, name, weight, height, base_experience, image };
  };

  prepareTypes = (data) => {
    return data.types.map((item) => item.type).map((type) => type.name);
  };

  prepareAbilities = (data) => {
    return data.abilities
      .map((item) => item.ability)
      .map((ability) => ability.name);
  };

  prepareCharacteristic = (data) => {
    let r = data.descriptions.filter((item) => item.language.name === "en");
    return r[0].description;
  };

  render() {
    let {
      profile,
      types,
      abilities,
      characteristic,
      evolutionTree,
      stats,
    } = this.state.item;

    return (
      <div className="container">
        {/* Pokemon Details */}
        <div className="pokemon-wrapper">
          <div className="pokemon-image">
            <img src={profile.image} alt={profile.name} />
          </div>
          <div className="pokemon-details">
            <h1 className="toUpper">
              #{profile.id} {profile.name}
            </h1>

            <ul>
              <li>
                <strong>Types: </strong>
                {types.map((item) => (
                  <Badge key={item} text={item}></Badge>
                ))}
              </li>
              <li>
                <strong>Characteristic: </strong>
                {characteristic}
              </li>
              <li>
                <strong>Abilities: </strong>
                {abilities.join(', ')}
              </li>

              <li>
                <strong>Weight: </strong>
                {profile.weight}
              </li>
              <li>
                <strong>Height: </strong>
                {profile.height}
              </li>
              <li>
                <strong>Base Experiencie: </strong>
                {profile.base_experience}
              </li>
            </ul>
          </div>

          {/* Stats */}
          {Object.values(stats).length > 0 && (
            <div className="pokemon-stats">
              <StatsChart stats={stats} />
            </div>
          )}

          {/* Evolutions */}
          {evolutionTree.length > 0 && (
            <div className="pokemon-evolution">
              {evolutionTree.map((item) => (
                <div className="pokemon-evolution-details" key={item.id}>
                  <img src={item.image} alt={item.id}></img>
                  <p>#{item.id}</p>
                  <p>
                    {" "}
                    <strong>{item.name}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
