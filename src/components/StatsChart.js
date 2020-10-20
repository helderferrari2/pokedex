import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export default class StatsChart extends PureComponent {

    state = {
        data: [],
    }

    componentDidMount() {
        const { stats } = this.props;
        this.prepareDataChart(stats);
    }

    prepareDataChart = (stats) => {
        let filtered = stats.map(item => {
            let name = item.stat.name
            let value = parseInt(item.base_stat)

            //Split special name
            if (/^special/.test(name)) {
                let tmp = name.split('-')
                name = `s-${tmp[1]}`
            }

            return { name, value }
        })
        this.setState({ data: filtered })
    }

    render() {

        let { data } = this.state

        return (
            <ResponsiveContainer >
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="value" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#F16058" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}