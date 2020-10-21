import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class StatsChart extends Component {
  render() {
    let { stats } = this.props;

    return (
      <Table borderless className="table-sm">
        <tbody>
          {stats.map((item) => (
            <tr key={item.name}>
              <th scope="row">{item.name}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
