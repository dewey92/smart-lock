import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('app');
export const initApp = actionCreator('INIT_APP');
