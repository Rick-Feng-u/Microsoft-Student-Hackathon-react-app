# Microsoft-Student-Hackathon-react-app
## Developing in the repo

### Yarn + Lage

This repo is set up as a monorepo using Yarn workspaces. To install yarn, please follow instructions in the [Yarn documentation](https://classic.yarnpkg.com/en/docs/install/).

For running tasks the repo has switched to using [Lage](https://github.com/microsoft/lage) for task running. The primary tasks that can be executed at the root are:

- `yarn build` - does the typescript build for all packages in the repository
- `yarn test` - will build, lint, and run any applicable tests on all packages in the repo
- `yarn bundle` - will bundle all packages in the repo
- `yarn buildci` - will build, lint, run tests, and bundle everything in the repo


## Please branch off main to work on different features!!!