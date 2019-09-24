import React from 'react';
import ReactDOM from 'react-dom';
const fight = require('./fight.js');
const heal = require('./heal.js');
const superagent = require('superagent');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    superagent
      .get('http://localhost:4000/api/v1/StarterCharacters')
      .then(results => {
        this.setState({ characters: results.body });
        this.state.characters.forEach(character => {
          character.startingStats.maxHP = character.startingStats.hp;
        });
        this.setState({ characters: this.state.characters });
      })
      .catch(e => alert("Couldn't retrieve data"));
    superagent
      .get('http://localhost:4000/api/v1/enemies')
      .then(results => {
        this.setState({ enemies: results.body });
      })
      .catch(e => alert("Couldn't retrieve data"));
    this.setState({ healing: 10 });
  }

  render() {
    let statList = [
      'Health',
      'Attack',
      'Magic',
      'Speed',
      'Luck',
      'Defence',
      'Resistance',
      'Experience'
    ];

    return (
      <div className="container">
        <div className="heroes">
          {this.state.characters &&
            this.state.characters.map((char, index) => {
              return (
                <div className="character">
                  <h3>{char.name}</h3>{' '}
                  <div className="row">
                    <div className="col-sm-9">
                      {Object.values(char.startingStats).map((stat, key) => {
                        return (
                          <>
                            <span key={key}>
                              {statList[key]}: {stat},{' '}
                            </span>
                          </>
                        );
                      })}
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={() => {
                          let newState = fight(index, this.state);
                          this.setState(newState);
                        }}
                        className="btn btn-dark"
                      >
                        Fight
                      </button>
                      <button
                        onClick={() => {
                          let newState = heal(index, this.state);
                          this.setState(newState);
                        }}
                        className="btn btn-dark"
                      >
                        Heal
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="character">
            <h3>Herbs: {this.state.healing}</h3>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-8">Heal 10hp</div>
              <div className="col-sm-3">Future Image</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="enemies">
          {this.state.enemies &&
            this.state.enemies.map((char, index) => {
              return (
                <div className="character">
                  <h3>{char.name}</h3>{' '}
                  <div className="row">
                    <div className="col-sm-9">
                      {Object.values(char.startingStats).map((stat, key) => {
                        return (
                          <>
                            <span key={key}>
                              {statList[key]}: {stat},{' '}
                            </span>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
