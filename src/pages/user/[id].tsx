import { useRouter } from "next/dist/client/router";
import React from "react";

interface Props {}

const User = (props: Props) => {
  const router = useRouter();
  // page for the profile of a user
  // maybe include name/profile pic/contact info?
  const { id } = router.query;
  return <div>{id}</div>;
};

export default User;
