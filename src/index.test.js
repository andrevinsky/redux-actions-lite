import { actionType, getDescription, makeNextActionType, prepareActionTypes } from './index';

describe(`redux-actions-lite: Set of utilities for lighter usage experience of redux-actions`, () => {

  describe(`makeNextActionType() - generates a next unique action type`, () => {

    it('Each call produces a different output', () => {
      const result1 = makeNextActionType();
      const result2 = makeNextActionType();
      

      expect(result1).toMatch(/^ACT_/);
      expect(result2).toMatch(/^ACT_/);

      expect(result1).not.toEqual(result2);
    });
  });

  describe(`getDescription(action)`, () => {

    it('reads description of an action stored in a symbol-prop', () => {
      const action = actionType('Simple description')();
      expect(getDescription(action)).toEqual('Simple description');
    });

    it('reads type of an action, if a description is missing', () => {
      const action = { type: 'SIMPLE_ACTION' };
      expect(getDescription(action)).toEqual('SIMPLE_ACTION');
    });

    it('reads type of action creator, if a type of description is missing from action creator', () => {
      const actionCreator = Object.assign(() => ({ type: 'SIMPLE_ACTION' }), {
        toString() {
          return 'SIMPLE_ACTION_CREATOR';
        }
      });
      expect(getDescription(actionCreator)).toEqual('SIMPLE_ACTION_CREATOR');
    });

  });

  describe(`prepareType(description, ...args) - generates an action creator using 'redux-actions' API, with the random type and a description in a tag`, () => {

    it('creates a new action creator, type autogenerated, with the provided description', () => {
      const description = 'Computing the answer to life the universe and everything';
      const actionCreator = actionType(description, () => 42, () => 'I checked');
      const createdAction = actionCreator();

      expect(createdAction).toHaveProperty('type');
      expect(createdAction.type).toMatch(/^ACT_/);

      expect(createdAction).toHaveProperty('payload');
      expect(createdAction.payload).toEqual(42);

      expect(createdAction).toHaveProperty('meta');
      expect(createdAction.meta).toEqual('I checked');

      expect(getDescription(actionCreator)).toEqual(description);
      expect(getDescription(createdAction)).toEqual(description);

    });

  });

  describe(`prepareTypes(fn, count, description) - generates an enumeration of 'count' consecutive actions with the common description`, () => {

    it('creates a new action(s) creator, type(s) autogenerated, description is the same across all types', () => {
      const description = 'Computing the answer to life the universe and everything, async way';
      const actionCreator = prepareActionTypes(() => ({ answer: 42 }), 3, description);

      expect(Array.from(actionCreator).length).toEqual(3);
      expect(getDescription(actionCreator)).toEqual(description);

      expect(actionCreator()).toHaveProperty('types');
      expect(Array.from(actionCreator)).toEqual(actionCreator().types);

    });

  });
});
