const statList = require('./statList.js');
module.exports = (index, state) => {
  let player = state.characters[index].startingStats;
  if (!(state.enemies && state.enemies[0] && state.enemies[0].startingStats)) {
    return state;
  }
  let enemy = state.enemies[0].startingStats;

  if (enemy.Def > player.Att && enemy.Res > player.Mag) {
    return;
  } else {
    let Att = checkDifference(player.Att, enemy.Def);
    let Mag = checkDifference(player.Mag, enemy.Res);
    if (player.spd >= enemy.spd + 5) {
      enemy.HP -= 2 * (Att + Mag);
    } else {
      enemy.HP -= Att + Mag;
    }
  }
  if (enemy.HP <= 0) {
    state.enemies.splice(0, 1);
    player.Exp += 100;
    if (player.Exp >= 100) {
      let x = [];
      for (let i = 0; i < statList.length - 1; i++) {
        let stat = Math.round(Math.random());
        x.push(stat);
        player[`${statList[i]}`] += stat;
        if (i === 0 && stat === 1) {
          state.characters[index].maxHP++;
        }
      }
      let lvlUpStr = `${state.characters[index].name} Leveled Up!\n`;
      for (let i = 0; i < statList.length; i++) {
        if (x[i] === 1) {
          lvlUpStr += `${statList[i]} + 1\n`;
        }
      }
      alert(lvlUpStr, (player.Exp -= 100));
    }
    return state;
  }

  if (player.Def > enemy.Att && player.Res > enemy.Mag) {
    return;
  } else {
    let Att = checkDifference(enemy.Att, player.Def);
    let Mag = checkDifference(enemy.Mag, player.Res);
    if (enemy.spd >= player.spd + 5) {
      player.HP -= 2 * (Att + Mag);
    } else {
      player.HP -= Att + Mag;
    }
  }
  if (player.HP <= 0) {
    state.characters.splice(index, 1);
  } else {
    player.Exp += 20;
    if (player.Exp >= 100) {
      let x = [];
      for (let i = 0; i < statList.length - 1; i++) {
        let stat = Math.round(Math.random());
        x.push(stat);
        player[`${statList[i]}`] += stat;
        if (i === 0 && stat === 1) {
          state.characters[index].maxHP++;
        }
      }
      let lvlUpStr = `${state.characters[index].name} Leveled Up!\n`;
      for (let i = 0; i < statList.length; i++) {
        if (x[i] === 1) {
          lvlUpStr += `${statList[i]} + 1\n`;
        }
      }
      alert(lvlUpStr, (player.Exp -= 100));
    }
  }

  return state;
};

let checkDifference = (stat1, stat2) => {
  if (stat1 > stat2) {
    return stat1 - stat2;
  }
  return 0;
};
