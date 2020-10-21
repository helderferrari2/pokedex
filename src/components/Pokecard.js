import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Pokecard extends Component {
  render() {
    const { item } = this.props;

    return (
      <Link to={`/pokemons/${item.id}`}>
        <div className="pokecard">
          <span className="pokecard-id">#{item.id}</span>
          <div className="pokecard-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="pokecard-body">
            <h6>{item.name}</h6>
          </div>
        </div>
      </Link>
    );
  }
}
