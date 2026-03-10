import Header from '@/components/Header';
import { RootStoreProvider } from '@/store';

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootStoreProvider>
        <Header />
        <main>{children}</main>
      </RootStoreProvider>
    </>
  );
}

export default App;
