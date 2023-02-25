import { type NextPage } from "next";
import Container from "~/components/Container";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return <Container>Hello</Container>;
};

export default Home;
