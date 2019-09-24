import React from 'react';
import ReactDOM from 'react-dom';
const fight = require('./fight.js');
const heal = require('./heal.js');
const superagent = require('superagent');
let statList = require('./statList.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let url = process.env.PORT
      ? 'https://fe-api.herokuapp.com/api/v1/StarterCharacters'
      : 'http://localhost:4000/api/v1/StarterCharacters';
    superagent
      .get(url)
      .then(results => {
        this.setState({ characters: results.body });
        this.state.characters.forEach(character => {
          character.maxHP = character.startingStats.HP;
        });
        this.setState({ characters: this.state.characters });
      })
      .catch(e => alert("Couldn't retrieve data"));
    url = process.env.PORT
      ? 'https://fe-api.herokuapp.com/api/v1/enemies'
      : 'http://localhost:4000/api/v1/enemies';
    superagent
      .get(url)
      .then(results => {
        for (var i = 1; i < 4; i++) {
          let level = i <= 1 ? 5 : i === 2 ? 30 : i === 3 ? 50 : 60;
          results.body.forEach(enemy => {
            let buffedEnemy = JSON.parse(JSON.stringify(enemy));
            for (let y = 0; y < statList.length - 1; y++) {
              if (y === 0) {
                buffedEnemy.startingStats[`${statList[y]}`] = level;
              } else {
                if (i < 1) {
                  buffedEnemy.startingStats[`${statList[y]}`] *= 1;
                } else {
                  buffedEnemy.startingStats[`${statList[y]}`] *= i;
                }
              }
            }
            results.body.push(buffedEnemy);
          });
        }
        this.setState({
          enemies: results.body
        });
      })
      .catch(e => alert("Couldn't retrieve data"));
    this.setState({ healing: 10 });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="heroes">
              {this.state.characters &&
                this.state.characters.map((char, index) => {
                  return (
                    <div className="character" id={char.name}>
                      <h3>{char.name}</h3>{' '}
                      <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6">
                          {Object.values(char.startingStats).map(
                            (stat, key) => {
                              return (
                                <>
                                  <span key={key}>
                                    {statList[key]}: {stat},{' '}
                                  </span>
                                </>
                              );
                            }
                          )}
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-3">
                          <div className="row">
                            <div className="col-sm-12">
                              {' '}
                              <button
                                onClick={() => {
                                  let newState = fight(index, this.state);
                                  this.setState(newState);
                                }}
                                className="btn btn-dark"
                              >
                                Fight
                              </button>
                            </div>
                            <div className="col-sm-12">
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
                      </div>
                    </div>
                  );
                })}
              <div className="character">
                <div className="row">
                  <div className="col-sm-7">
                    <h4>Herbs: {this.state.healing}</h4>
                    Heal 10hp
                  </div>
                  <div className="col-sm-3">
                    <img src="./assets/herb.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="enemies">
              {this.state.enemies &&
                this.state.enemies.map((char, index) => {
                  return (
                    <div className="character">
                      <h3>{char.name}</h3>{' '}
                      <div className="row">
                        <div className="col-sm-9">
                          {Object.values(char.startingStats).map(
                            (stat, key) => {
                              return (
                                <>
                                  <span key={key}>
                                    {statList[key]}: {stat},{' '}
                                  </span>
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
