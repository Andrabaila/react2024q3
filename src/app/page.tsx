import { FlyoutElement, Header, CardList, CardDetails } from '@/components';

export default function PageMain() {
  return (
    <>
      <Header />
      <main className="flex">
        <CardList />
        <CardDetails />
      </main>
      <FlyoutElement />
    </>
  );
}
