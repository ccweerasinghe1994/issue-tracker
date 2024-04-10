import {Button, Flex} from "@radix-ui/themes";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import Link from "next/link";

const IssueAction = () => {
    return <Flex justify={"between"}>
        <IssueStatusFilter/>
        <Button>
            <Link href={"/issues/new"}>New Issue</Link>
        </Button>
    </Flex>;
}

export default IssueAction;