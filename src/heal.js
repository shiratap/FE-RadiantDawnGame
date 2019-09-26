'use strict';

module.exports = (index, state) => {
  state.levelUpDialog = '';
  if (state.healing === 0) {
    state.actionDialog = 'No healing left';
    return state;
  }
  if (
    state.characters[index].startingStats.HP === state.characters[index].maxHP
  ) {
    state.actionDialog = `${state.characters[index].name} is already full Health`;
    return state;
  }
  if (
    state.characters[index].maxHP >
    state.characters[index].startingStats.HP + 10
  ) {
    state.characters[index].startingStats.HP += 10;
    state.actionDialog = `Healed ${
      state.characters[index].name
    } 10 HP. You have ${state.healing - 1} herbs left`;
  } else {
    state.characters[index].startingStats.HP = state.characters[index].maxHP;
    state.actionDialog = `Healed ${
      state.characters[index].name
    } to Max HP. You have ${state.healing - 1} herbs left`;
  }
  state.healing -= 1;
  return state;
};
