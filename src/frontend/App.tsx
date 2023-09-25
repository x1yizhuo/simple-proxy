import * as React from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";

const App: React.FC<AppProps> = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex text-center flex-col gap-8">
        <h1 className="text-4xl font-bold">Simple Proxy</h1>
        <div className="flex items-center gap-2">
          <Input type="email" placeholder="Enter a URL to proxy" />
          <Button type="submit">Proxy</Button>
        </div>
      </div>
    </div>
  );
};

interface AppProps {}

export default App;
