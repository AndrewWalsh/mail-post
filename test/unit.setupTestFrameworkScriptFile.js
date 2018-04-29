const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const fetch = require('jest-fetch-mock');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
// Mock fetch (not stubbed by jsdom - primarily used by Apollo)
global.fetch = fetch;
