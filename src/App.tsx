import Header from 'components/Header';
import { Outlet } from 'react-router';
import { RootStoreProvider } from 'store/root';

function App() {
  return (
    <RootStoreProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </RootStoreProvider>
  );
}

export default App;
