const onOff = require("./onoff");
const assert = require("assert");

test("onOff end to end", () => {
  const toggleAction = onOff.actions.toggle("test");
  const setAction = onOff.actions.setToggle("test");
  const func = onOff.hor("test")((state = { counter: 0 }, action = {}) => {
    switch (action.type) {
      case "COUNTER_INC":
        return { ...state, counter: state.counter + 1 };
      case "COUNTER_RESET":
        return { ...state, counter: 0 };
      default:
        return state;
    }
  });

  assert.deepEqual(func({}, { type: "UNMATCHED_ACTION" }), {});
  assert.deepEqual(func({ onOffState: true }, { type: "UNMATCHED_ACTION" }), {
    onOffState: true
  });
  assert.deepEqual(func({}, toggleAction()), {
    onOffState: true
  });
  assert.deepEqual(func({ onOffState: true }, toggleAction()), {
    onOffState: false
  });

  assert.deepEqual(func({ onOffState: true }, setAction(false)), {
    onOffState: false
  });
  assert.deepEqual(func({ onOffState: true }, setAction(true)), {
    onOffState: true
  });
  assert.deepEqual(func(undefined, { type: "COUNTER_INC" }), { counter: 1 });
  assert.deepEqual(func({ counter: 3 }, toggleAction()), {
    counter: 3,
    onOffState: true
  });
  assert.deepEqual(
    func({ counter: 3, onOffState: true }, { type: "COUNTER_RESET" }),
    { counter: 0, onOffState: true }
  );
  assert.deepEqual(func({ counter: 3, onOffState: true }, setAction(false)), {
    counter: 3,
    onOffState: false
  });
});

test("edge case: empty action and state", () => {
  const toggleAction = onOff.actions.toggle("test");
  const setAction = onOff.actions.setToggle("test");
  const func = onOff.hor("test")((state = {}) => state);
  assert.deepEqual(func(undefined, undefined), {});
});
