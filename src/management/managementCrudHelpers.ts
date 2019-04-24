import { Action, AnyAction } from 'redux';
import { AsyncActionCreators } from 'typescript-fsa';

type Reducer<S, A extends Action = AnyAction> = (state: S, action: A) => S;

/**
 * Entity represents a data structure that has attribute `id`
 */
export type Entity<T = {}> = { id: string } & T;

export interface RemoteData<T> {
  data: T;
  status: 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

/**
 * Creates a polymorphic reducer with remote data being embedded into it by
 * lifting plain `initialState` into `RemoteData` data structure. Useful for
 * basic CRUD async operations. There's also `additionalReducer` option in case
 * you want to add some custom reducers.
 */
export const createManagementCRUD = <T extends {}, State = {}>({
  initialState,
  loadAction,
  addAction,
  editAction,
  deleteAction,
  additionalReducer,
}: {
  initialState: State;
  loadAction: AsyncActionCreators<void, State>;
  addAction: AsyncActionCreators<T, Entity<T>>;
  editAction: AsyncActionCreators<Entity, Entity>;
  deleteAction: AsyncActionCreators<string, void>;
  additionalReducer?: Reducer<RemoteData<State>>;
}): Reducer<RemoteData<State>> => {
  const defaultState: RemoteData<State> = {
    data: initialState,
    status: 'INITIAL',
  };

  return (state = defaultState, action) => {
    if (
      loadAction.started.match(action) ||
      addAction.started.match(action) ||
      editAction.started.match(action) ||
      deleteAction.started.match(action)
    ) {
      return {
        ...state,
        status: 'LOADING',
      };
    }

    if (
      loadAction.failed.match(action) ||
      addAction.failed.match(action) ||
      editAction.failed.match(action) ||
      deleteAction.failed.match(action)
    ) {
      return {
        ...state,
        status: 'ERROR',
      };
    }

    if (loadAction.done.match(action)) {
      const result = action.payload.result as State;
      return {
        data: result,
        status: 'SUCCESS',
      };
    }

    if (addAction.done.match(action)) {
      const result = action.payload.result as Entity<T>;
      return {
        data: {
          ...state.data,
          [result.id]: result,
        },
        status: 'SUCCESS',
      };
    }

    if (editAction.done.match(action)) {
      const { result } = action.payload;
      return {
        data: {
          ...state.data,
          [result.id]: result,
        },
        status: 'SUCCESS',
      };
    }

    if (deleteAction.done.match(action)) {
      const { params } = action.payload;
      return {
        data: Object.keys(state.data).reduce(
          (acc, curr) => {
            if (curr === params) return acc;
            return { ...acc, [curr]: state.data[curr] };
          },
          {} as State
        ),
        status: 'SUCCESS',
      };
    }

    if (additionalReducer) {
      return additionalReducer(state, action);
    }

    return state;
  };
};
