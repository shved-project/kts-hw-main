import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ScrollToTop />
    </>
  );
}

export default App;
