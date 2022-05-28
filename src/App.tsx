import { Component, createSignal, For } from "solid-js";

// With the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";

const App: Component = () => {
  const [value, setValue] = createSignal<string[]>([]);

  // Invoke the command
  const invokeMe = () =>
    invoke<string[]>("list_files").then((message) => setValue(message));

  return (
    <div>
      <button onClick={invokeMe}>Invoke!</button>
      <For each={value()}>{(dir) => <div>{dir}</div>}</For>
    </div>
  );
};

export default App;
