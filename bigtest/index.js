import "babel-polyfill";
import "../src/style.css";

// require all modules ending in "-test" from the current directory and
// all subdirectories (using webpack's require.context)
const requireTest = require.context("./tests/", true, /-test/);
requireTest.keys().forEach(requireTest);
