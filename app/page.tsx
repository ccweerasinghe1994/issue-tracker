import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      currentPage={parseInt(searchParams.page) || 1}
      itemCount={101}
      pageSize={10}
    />
  );
}
