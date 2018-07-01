import React, { Component } from 'react';
import { database } from '../../firebase';
import { db } from '../../firebase/firebase';
import * as routes from '../../constants/routes';
import './styles.css';

const INITIAL_STATE = {
  id: '',
  temperatureHigh: '',
  temperatureLow: '',
  humilityHigh: '',
  humilityLow: '',
  moistureHigh: '',
  moistureLow: '',
  waterLevelHigh: '',
  waterLevelLow: '',
  loading: true,
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class AutomationConfig extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    database.getIndexSettings()
      .then(snapshot => {
        this.setID(snapshot.val());
      })
  };

  setID(id) {
    this.setState({ id });
  }

  onSubmit = (event) => {
    const {
      id,
      temperatureHigh,
      temperatureLow,
      humilityHigh,
      humilityLow,
      moistureHigh,
      moistureLow,
      waterLevelHigh,
      waterLevelLow,
    } = this.state;

    const data = {
      temperatureHigh,
      temperatureLow,
      humilityHigh,
      humilityLow,
      moistureHigh,
      moistureLow,
      waterLevelHigh,
      waterLevelLow,
    };

    const {
      history,
    } = this.props;

    database.doCreateSettings(id, data)
      .then(() => {
        db.ref('currentProject/currentSettings').set(data);
        db.ref('settingsIndex').set(id + 1);
        this.setState(() => ({
          id: id + 1,
          ...INITIAL_STATE,
        }));
        this.props.changeStep();
        history.push(routes.CATEGORIES);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    database.setDefaultSettings(data);
    event.preventDefault();
  }

  render() {
    const {
      temperatureHigh,
      temperatureLow,
      humilityHigh,
      humilityLow,
      moistureHigh,
      moistureLow,
      waterLevelHigh,
      waterLevelLow,
      error
    } = this.state;
    const isInvalid =
    temperatureHigh === '' ||
    temperatureLow === '' ||
    humilityHigh === '' ||
    humilityLow === '' ||
    moistureHigh === '' ||
    moistureLow === '' ||
    waterLevelHigh === '' ||
    waterLevelLow === '';
    return (
      <div className="container">
        <div className="columns is-centered settings-wrapper">
          <div className="column is-4">
            <h1 className="title is-3 step-header">Add Settings</h1>
            <form onSubmit={this.onSubmit}>
              <div className="field config-settings">
                <label className="label">Temperature</label>
                <div className="control">
                  <input
                    className="input is-danger"
                    value={temperatureHigh}
                    onChange={event => this.setState(byPropKey('temperatureHigh', event.target.value))}
                    type="text"
                    placeholder="Temperature high"
                  />
                </div>
                <div className="control">
                  <input
                    className="input is-warning"
                    value={temperatureLow}
                    onChange={event => this.setState(byPropKey('temperatureLow', event.target.value))}
                    type="text"
                    placeholder="Temperature low"
                  />
                </div>
              </div>
              <div className="field config-settings">
                <label className="label">Humility</label>
                <div className="control">
                  <input
                    className="input is-danger"
                    value={humilityHigh}
                    onChange={event => this.setState(byPropKey('humilityHigh', event.target.value))}
                    type="text"
                    placeholder="Humility high"
                  />
                </div>
                <div className="control">
                  <input
                    className="input is-warning"
                    value={humilityLow}
                    onChange={event => this.setState(byPropKey('humilityLow', event.target.value))}
                    type="text"
                    placeholder="Humility low"
                  />
                </div>
              </div>
              <div className="field config-settings">
                <label className="label">Moisture</label>
                <div className="control">
                  <input
                    className="input is-danger"
                    value={moistureHigh}
                    onChange={event => this.setState(byPropKey('moistureHigh', event.target.value))}
                    type="text"
                    placeholder="Moisture high"
                  />
                </div>
                <div className="control">
                  <input
                    className="input is-warning"
                    value={moistureLow}
                    onChange={event => this.setState(byPropKey('moistureLow', event.target.value))}
                    type="text"
                    placeholder="Moisture low"
                  />
                </div>
              </div>
              <div className="field config-settings">
                <label className="label">Water Level</label>
                <div className="control">
                  <input
                    className="input is-danger"
                    value={waterLevelHigh}
                    onChange={event => this.setState(byPropKey('waterLevelHigh', event.target.value))}
                    type="text"
                    placeholder="Water Level high"
                  />
                </div>
                <div className="control">
                  <input
                    className="input is-warning"
                    value={waterLevelLow}
                    onChange={event => this.setState(byPropKey('waterLevelLow', event.target.value))}
                    type="text"
                    placeholder="Water Level low"
                  />
                </div>
              </div>
              <button className="button is-primary" disabled={isInvalid} type="submit">
                Config new Settings
            </button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AutomationConfig;
