module.exports = (index, state) => {
  // alert(state.characters[index].name + ' is fighting the enemy');

  let player = state.characters[index].startingStats;
  let enemy = state.enemies[0].startingStats;

  if (enemy.def > player.att && enemy.res > player.mag) {
    return;
  } else {
    let att = checkDifference(player.att, enemy.def);
    let mag = checkDifference(player.mag, enemy.res);
    console.log('Player net values ', att, mag);
    if (player.spd >= enemy.spd + 5) {
      enemy.hp -= 2 * (att + mag);
    } else {
      enemy.hp -= att + mag;
    }
  }
  if (enemy.hp <= 0) {
    state.enemies.splice(0, 1);
    player.exp += 20;
    return state;
  }

  if (player.def > enemy.att && player.res > enemy.mag) {
    return;
  } else {
    let att = checkDifference(enemy.att, player.def);
    let mag = checkDifference(enemy.mag, player.res);
    console.log('Enemy net values ', att, mag);
    if (enemy.spd >= player.spd + 5) {
      player.hp -= 2 * (att + mag);
    } else {
      player.hp -= att + mag;
    }
  }
  if (player.hp <= 0) {
    state.characters.splice(index, 1);
  }

  return state;
};

let checkDifference = (stat1, stat2) => {
  if (stat1 > stat2) {
    return stat1 - stat2;
  }
  return 0;
};
