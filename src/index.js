import { createAction } from 'redux-actions';

function* actionTypesGen() {
  let i = 0;
  for (; ;) {
    yield `ACT_${ (i++).toString(36).toUpperCase() }`;
  }
}
const actionTypesIterableGenMemo = { current: null };
const actionTypesIterableGen = () => actionTypesIterableGenMemo.current || (actionTypesIterableGenMemo.current = actionTypesGen());

const DESCRIPTION_SYM = Symbol('description');

export const makeNextActionType = () => actionTypesIterableGen().next().value;

export const actionType = (description, ...args) => {
  const actionCreator = createAction(makeNextActionType(), ...args);
  return Object.assign((...args1) => Object.assign(actionCreator(...args1), {
    [ DESCRIPTION_SYM ]: description
  }), actionCreator, {
    [ DESCRIPTION_SYM ]: description
  });
};

export function prepareActionTypes(fn, count, description) {
  if (!Number.isFinite(count) && (description == null)) {
    description = count;
    count = 1;
  }
  const types = Array(count).fill(true).map(makeNextActionType);
  return Object.assign((...args) => Object.assign({
    types,
  }, fn(...args), {
    [ DESCRIPTION_SYM ]: description
  }), {
    [ DESCRIPTION_SYM ]: description,
    [ Symbol.iterator ]: function* () {
      yield* types[ Symbol.iterator ]();
    }
  });
}

export const getDescription = (action) => action[ DESCRIPTION_SYM ] || action.type || String(action);
