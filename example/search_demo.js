// search_demo.js
const Search = require("../Search.js");
const data = require("./example_data.js");

const searchInstance = new Search();

// 👇 You can change this search term
const searchTerm = "export";

// 👇 Choose match type: 0 = startsWith, 1 = includes, 2 = endsWith
const searchType = 1;

// 👇 Search options
const options = {
  incArr: true,
  incFunc: false,
  incObj: true
};

console.log(`🔍 Searching for "${searchTerm}" with type ${searchType}...`);

const result = searchInstance.search(searchTerm, data, "example_data.js", searchType, options);

console.log("\n✅ Search Results:\n");
console.dir(result, { depth: null, colors: true });
