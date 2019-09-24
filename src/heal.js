'use strict';

module.exports = (index, state) => {
  if (state.healing === 0) {
    return state;
  }
  if (
    state.characters[index].maxHP >
    state.characters[index].startingStats.HP + 10
  ) {
    state.characters[index].startingStats.HP += 10;
  } else {
    state.characters[index].startingStats.HP = state.characters[index].maxHP;
  }
  state.healing -= 1;
  return state;
};
