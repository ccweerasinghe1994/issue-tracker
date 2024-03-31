import { Button, Skeleton, Table } from "@radix-ui/themes";

const LoadingIssuePage = () => {
  return (
    <div>
      <div className="mb-5">
        <Button disabled>New Issue</Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>my first issue</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>
                  this is a test issue design to test the functionality
                </Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton> OPEN</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton> Sat Mar 30 2024</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaccaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Description aaaaaaaaaaa</Skeleton>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          {/* <Table.Body>{issues && issues.map((issue) => row(issue))}</Table.Body> */}
        </Table.Header>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuePage;
