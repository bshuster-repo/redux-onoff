const hor = name => reducer => (state, action = {}) => {
  switch (action.type) {
    case `onOff/${name}/TOGGLE_STATE`:
      return Object.assign({}, state, { onOffState: !state.onOffState });
    case `onOff/${name}/SET_STATE`:
      return Object.assign({}, state, { onOffState: action.payload });
    default:
      return reducer(state, action);
  }
};

const actions = {
  toggle: name => () => ({
    type: `onOff/${name}/TOGGLE_STATE`
  }),
  setToggle: name => toggleState => ({
    type: `onOff/${name}/SET_STATE`,
    payload: toggleState
  })
};

module.exports = {
  actions: actions,
  hor: hor
};
