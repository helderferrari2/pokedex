import React, { Component } from "react"

export default class Badge extends Component {

    render() {

        let text = this.props.text

        return (
            <div className={`badge badge-sm badge-${text} `}>{text}</ div>
        );
    }

}