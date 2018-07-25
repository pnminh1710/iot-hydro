import React, { Component } from 'react';
import { db } from '../../firebase/firebase';

import * as util from '../../constants/util';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
    };

    this.createFakeLog = this.createFakeLog.bind(this);
    this.getLogs = this.getLogs.bind(this);
  }
  componentDidMount() {
    this.getLogs()
  }

  createFakeLog() {
    const fakeTimeStamp = util.createArrayDate('2018-05-01', '2018-07-27', true).data;
    for (let i = 0; i < fakeTimeStamp.length; i++) {
      const element = {
        date: fakeTimeStamp[i],
        temperature: parseFloat(((Math.random() * (33 - 30)) + 30).toFixed(2)),
        humility: parseFloat(((Math.random() * (100 - 90)) + 90).toFixed(2)),
        moisture: parseFloat(((Math.random() * (90 - 70)) + 70).toFixed(2)),
      }
      db.ref(`timeLogs/${i}`).set(element);
    }
  }

  getLogs() {
    db.ref('timeLogs').once('value')
      .then(snapshot => {
        const data = snapshot.val().map(element => {
          return {
            ...element,
            date: util.normalizeDate(new Date(element.date)),
          };
        });
        this.setState({ data, loading: false });
      });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) return <h1 className="title is-1">Loading</h1>
    return (
      <div className="container">
        <h1 className="title is-3">Chart</h1>
        <div>
          <LineChart width={1024} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" allowDataOverflow={true} padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="humility" stroke="#82ca9d" />
            <Line type="monotone" dataKey="moisture" stroke="#111111" />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default Logs;