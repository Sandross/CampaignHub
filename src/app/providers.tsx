'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '../redux';
import dynamic from 'next/dynamic';

const PersistGate = dynamic(() => import('redux-persist/integration/react').then((mod) => mod.PersistGate), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
