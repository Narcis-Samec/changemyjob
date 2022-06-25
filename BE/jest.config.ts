module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: [
      "<rootDir>/test/setup.ts"
    ]
    //forceExit: true //use only for development!
  };