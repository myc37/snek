import { type NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Container from "~/components/Container";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [username, setUsername] = useState("tanAhBee1");
  const [password, setPassword] = useState("password123");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <img src="nv-logo.png" alt="ninjavan logo" />
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary px-8 pt-8 pb-12">
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray-1">Username</label>
            <input
              value={username}
              onChange={handleUsernameChange}
              className="rounded-md px-3 py-1"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray-1">Password</label>
            <input
              value={password}
              onChange={handlePasswordChange}
              className="rounded-md px-3 py-1"
              type="password"
            />
          </div>
        </div>
        <button className="mt-4 w-full cursor-pointer rounded-md bg-secondary px-4 py-2 text-lg font-bold text-gray-1">
          Sign In
        </button>
        <a className="mt-4 text-sm text-primary underline">
          Forgot your password?
        </a>
      </div>
    </Container>
  );
};

export default Home;
