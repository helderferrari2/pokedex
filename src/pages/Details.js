import React, { Component } from "react";
import {
  apiFetchPokemonDetails,
  apiFetchPokemonCharacteristic,
} from "../services/http.service";
import { fetchEvolutionTree } from "../services/pokemon.service";
import Badge from "../components/Badge";
import { Col, Row, Container } from "react-bootstrap";
import StatsChart from "../components/StatsChart";
import { act } from "react-dom/test-utils";

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
        let stats = this.prepareStats(data);
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

  prepareStats = (data) => {
    return data.stats.map((item) => {
      let name = item.stat.name;
      let value = parseInt(item.base_stat);

      //Split special name
      if (/^special/.test(name)) {
        let tmp = name.split("-");
        name = `sp-${tmp[1]}`;
      }

      return { name, value };
    });
  };

  handlePreviousNext = (e, action) => {
    e.preventDefault();
    let { id } = this.props.match.params;

    let start = 1;
    let limit = 151;
    let goTo = 1;

    switch (action) {
      case "prev":
        if (id > start) goTo = --id;
        break;

      case "next":
        if (id < limit) goTo = ++id;
        break;
    }

    window.location.pathname = `/pokemons/${goTo}`;
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
      <Container>
        <Row>
          <Col className="d-flex justify-content-start">
            <button
              type="button"
              className="nes-btn"
              onClick={(e) => this.handlePreviousNext(e, "prev")}
            >
              {"<"} Prev
            </button>
          </Col>
          <Col className="d-flex justify-content-end">
            <button
              type="button"
              className="nes-btn"
              onClick={(e) => this.handlePreviousNext(e, "next")}
            >
              Next{">"}
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <div className="nes-container ">
              <div className="pokemon-image">
                <img src={profile.image} alt={profile.name} />
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="nes-container ">
              <h3 className="toUpper">
                #{profile.id} {profile.name}
              </h3>

              <div className="lists">
                <ul className="nes-list is-disc">
                  <li>
                    <strong>Type: </strong>
                    {types.map((item) => (
                      <Badge key={item} text={item}></Badge>
                    ))}
                  </li>
                  <li>
                    <strong>Abilities: </strong>
                    {abilities.join(", ").substring(0, 25) + "..."}
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
                    <strong>Characteristic: </strong>
                    {characteristic}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {stats.length > 0 && (
            <Col lg={4}>
              <div className="nes-container with-title">
                <p className="title">Stats</p>
                <StatsChart stats={stats} />
              </div>
            </Col>
          )}

          <Col lg={8}>
            <div className="nes-container with-title pokemon-evolution-tree">
              <p className="title">Evolution Tree</p>
              <Row>
                {evolutionTree.length > 0 ? (
                  evolutionTree.map((item) => (
                    <Col key={item.id}>
                      <div className="pokemon-evolution-image">
                        <img src={item.image} alt={item.id}></img>
                      </div>
                      <div className="pokemon-evolution-body">
                        <p>#{item.id}</p>
                        <p>{item.name}</p>
                      </div>
                    </Col>
                  ))
                ) : (
                  <h5>No Evolutions</h5>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
