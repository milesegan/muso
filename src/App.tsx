import { Component, createSignal } from "solid-js";

// With the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";

const App: Component = () => {
  const [value, setValue] = createSignal<string[]>([]);

  // Invoke the command
  const invokeMe = () =>
    invoke<string[]>("list_files").then((message) => setValue(message));

  return (
    <p class="text-4xl text-green-700 text-center py-20">
      Hello muso {value()}
      <button onClick={invokeMe}>Invoke!</button>
    </p>
  );
};

export default App;
