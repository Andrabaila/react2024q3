import CardList from '@/widgets/cardList/CardList';
import CardDetails from '@/widgets/cardDetails/CardDetails';
import { FlyoutElement, Header } from '@/widgets';

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
