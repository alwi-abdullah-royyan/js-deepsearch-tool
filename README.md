# 🔍 DeepSearch – Recursive JS Object Searcher

**DeepSearch** is a JavaScript utility class that recursively searches through deeply nested objects and arrays. It supports different string matching types, optional traversal flags, and automatic cleanup of empty or irrelevant matches.

---

## ⚙️ Features

- 🔁 Deep recursive search (with loop detection via `WeakMap`)
- 🧠 Supports `startsWith`, `includes`, and `endsWith` search types
- 🧼 Smart cleanup of empty `{}`/`[]` from results
- 📋 Optional filtering:
  - Include arrays
  - Include functions
  - Include nested objects
- 🛑 Emergency stop support (`stopSearch = true`)
- 🚫 Skips long strings or flags them as `"string too long"`

---

## 💡 Use Cases

- Inspect large nested data (e.g., JSON from APIs)
- Debug game state objects
- Build internal dev tools for search/inspection
- Web app inspectors
- CLI JSON utilities

---

## 📦 Example Usage

```js
const search = new Search();

const data = {
  name: "My App",
  settings: {
    theme: "dark-mode",
    language: "english"
  },
  logs: [
    { message: "User logged in", level: "info" },
    { message: "Error occurred", level: "error" }
  ]
};

// Search for anything that includes "log"
const result = search.search("log", data, "data", 1, {
  incArr: true,
  incFunc: false,
  incObj: true
});

console.log(JSON.stringify(result, null, 2));
````

---

## 🔧 Search Options

| Option    | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| `incArr`  | Boolean | Include array values in search  |
| `incFunc` | Boolean | Include function names/refs     |
| `incObj`  | Boolean | Include nested object traversal |

---

## 🧹 Cleanup Functions

* `cleanEmptyDeep(obj)` — Removes `{}` and `[]` recursively
* `cleanUntilStable(obj)` — Runs cleanup until output stabilizes

---

## 🚨 Emergency Stop

Call `searchInstance.stop()` in async or long-running environments to stop a search mid-execution.

---

## 📁 Project Structure

```
js-deepsearch-tool/
├── Search.js                # Main class
├── example/
│   └── search_demo.js       # Sample demo script
│   └── example_data.json    # Demo data
├── README.md
└── LICENSE
```

---

## 🛡 License

MIT — use it, fork it, improve it.

---

## 🙋‍♂️ Contributions

Issues and pull requests welcome!

```

---
