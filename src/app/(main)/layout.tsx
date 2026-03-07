import Header from '@/components/Header';

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <RootStoreProvider> */}
      <Header />
      <main>{children}</main>
      {/* </RootStoreProvider> */}
    </>
  );
}

export default App;
