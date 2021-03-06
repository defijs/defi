import { useContext } from 'react';
import Context from './Context';

export interface StoreSelector {
  (store: { [key: string]: unknown }): { [key: string]: unknown };
}

export default (
  storeSlice: { [key: string]: unknown } | StoreSelector,
): { [key: string]: unknown } => {
  const contextValue = useContext(Context);
  let slice;

  if (!storeSlice) {
    throw new Error('storeSlice argument is required');
  }

  if (typeof storeSlice === 'function') {
    slice = storeSlice(contextValue);
    if (slice === null || typeof slice !== 'object') {
      throw new Error('storeSlice selector returned non-object value');
    }
  } else {
    slice = storeSlice;
  }

  return slice;
};
