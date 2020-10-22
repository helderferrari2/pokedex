import React, { Component } from "react";
import {
  apiFetchPokemonDetails,
  apiFetchPokemonCharacteristic,
} from "../services/http.service";
import { fetchEvolutionTree } from "../services/pokemon.service";
import Badge from "../components/Badge";
import { Col, Row, Container } from "react-bootstrap";
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
    return data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    }));
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
                    {abilities.join(", ")}
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
            <Col>
              <div className="nes-container with-title">
                <p className="title">Stats</p>
                <StatsChart stats={stats} />
              </div>
            </Col>
          )}

          <Col>
            <div className="nes-container with-title pokemon-evolution-tree">
              <p className="title">Evolutions</p>
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
