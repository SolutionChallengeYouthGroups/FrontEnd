import { useRouter } from "next/dist/client/router";
import React from "react";

interface Props {}

const User = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}</div>;
};

export default User;
