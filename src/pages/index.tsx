import { type NextPage } from "next";
import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import Container from "~/components/Container";

const DUMMY_USERNAME = "tanAhBee1";
const DUMMY_PASSWORD = "password123";

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState(DUMMY_USERNAME);
  const [password, setPassword] = useState(DUMMY_PASSWORD);
  const [error, setError] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickLogin = () => {
    if (username !== DUMMY_USERNAME && password !== DUMMY_PASSWORD) {
      setError("The username or password you have input is wrong");
      return;
    }
    void router.push("/orders");
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
        {Boolean(error) ? (
          <div className="text-red self-start text-sm">{error}</div>
        ) : null}
        <button
          className="mt-4 w-full cursor-pointer rounded-md bg-secondary px-4 py-2 text-lg font-bold text-gray-1"
          onClick={handleClickLogin}
        >
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
