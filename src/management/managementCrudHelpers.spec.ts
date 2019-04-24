import actionCreatorFactory from 'typescript-fsa';
import { createManagementCRUD } from './managementCrudHelpers';

describe('management CRUD helpers', () => {
  type NewModel = { name: string };
  type Model = NewModel & { id: string };

  const actionCreator = actionCreatorFactory('test');
  const loadAction = actionCreator.async<void, Model>('LOAD');
  const addAction = actionCreator.async<NewModel, Model>('ADD');
  const editAction = actionCreator.async<Model, Model>('EDIT');
  const deleteAction = actionCreator.async<string, void>('DELETE');

  const crudReducer = createManagementCRUD({
    initialState: {},
    loadAction,
    addAction,
    editAction,
    deleteAction,
  });

  it('changes to LOADING when fetching some data', () => {
    const store = crudReducer({ data: {}, status: 'INITIAL' }, loadAction.started());
    expect(store.status).toBe('LOADING');
  });

  it('changes to ERROR when failed fetching some data', () => {
    const store = crudReducer({ data: {}, status: 'INITIAL' }, loadAction.failed({ error: {} }));
    expect(store.status).toBe('ERROR');
  });

  // Other tests such as adding, editing, and deleting model are instead tested
  // by the consumers. See `roomReducer.spec.ts` and `userReducer.spec.ts` for examples.
});
