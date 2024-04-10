import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={11} itemCount={101} pageSize={10} />;
}
