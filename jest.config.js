module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',  // Isso garante que o Jest transforme o axios
  ],
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
};