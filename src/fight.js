const statList = require('./statList.js');
module.exports = (index, state) => {
  state.actionDialog = '';
  state.levelUpDialog = '';
  let player = state.characters[index].startingStats;
  if (!(state.enemies && state.enemies[0] && state.enemies[0].startingStats)) {
    return state;
  }
  let enemy = state.enemies[0].startingStats;

  if (enemy.Def > player.Att && enemy.Res > player.Mag) {
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
    state.actionDialog += `${state.enemies[0].name} killed`;
    player.Exp += 100 - player.Lvl + 1;
    if (player.Exp >= 100) {
      let x = [];
      for (let i = 0; i < statList.length - 1; i++) {
        let stat = Math.round(Math.random());
        x.push(stat);
        if (i === 0) {
          state.characters[index].startingStats.Lvl++;
        } else if (i === 1 && stat === 1) {
          state.characters[index].maxHP++;
        } else {
          player[`${statList[i]}`] += stat;
        }
      }
      let lvlUpStr = `${state.characters[index].name} Leveled Up!\n`;
      for (let i = 1; i < statList.length; i++) {
        if (x[i] === 1) {
          lvlUpStr += `${statList[i]} + 1\n`;
        }
      }
      state.levelUpDialog += lvlUpStr;
      player.Exp -= 100;
    }
    return state;
  }

  if (player.Def > enemy.Att && player.Res > enemy.Mag) {
    return state;
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
    player.Exp += 20 - Math.ceil((player.Lvl - 1) / 3);
    console.log(Math.ceil((player.Lvl - 1) / 3));
    if (player.Exp >= 100) {
      let x = [];
      for (let i = 0; i < statList.length - 1; i++) {
        let stat = Math.round(Math.random());
        x.push(stat);
        if (i === 0) {
          state.characters[index].startingStats.Lvl++;
        } else if (i === 1 && stat === 1) {
          state.characters[index].maxHP++;
        } else {
          player[`${statList[i]}`] += stat;
        }
      }
      let lvlUpStr = `${state.characters[index].name} Leveled Up!\n`;
      for (let i = 1; i < statList.length; i++) {
        if (x[i] === 1) {
          lvlUpStr += `${statList[i]} + 1\n`;
        }
      }
      state.levelUpDialog += lvlUpStr;
      player.Exp -= 100;
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
