import { Text } from "@radix-ui/themes";
import React, { FC, PropsWithChildren, ReactNode } from "react";

const ErrorPage: FC<PropsWithChildren> = ({ children }) => {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorPage;
