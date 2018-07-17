import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          data: '01-01-2018',
          temperature: 33.2,
        },
        {
          data: '01-01-2018',
          temperature: 20.2,
        },
        {
          data: '01-01-2018',
          temperature: 35.2,
        },
      ],
    };

    this.drawChart = this.drawChart.bind(this);
  }
  componentDidMount() {

  }

  drawChart() {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const value = {
        name: i + 1,
        temperature: Math.floor((Math.random() * 33) + 30),
        humility: Math.floor((Math.random() * 90) + 100),
        moisture: Math.floor((Math.random() * 70) + 90),
      }
      data.push(value);
    }
    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1 className="title is-3">Chart</h1>
        <div>
          <LineChart width={1024} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="humility" stroke="#82ca9d" />
            <Line type="monotone" dataKey="moisture" stroke="#111111" />
          </LineChart>
        </div>
        <button className="button is-primary" onClick={this.drawChart}>Create Data</button>
      </div>
    );
  }
}

export default Logs;