'use strict';

module.exports = (index, state) => {
  if (state.healing === 0) {
    return state;
  }
  if (
    state.characters[index].startingStats.maxHP >
    state.characters[index].startingStats.hp + 10
  ) {
    state.characters[index].startingStats.hp += 10;
  } else {
    state.characters[index].startingStats.hp =
      state.characters[index].startingStats.maxHP;
  }
  state.healing -= 1;
  return state;
};
