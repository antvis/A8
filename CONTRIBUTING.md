# How to Contribute

Firstly, it's important to understand that contributing to an open-source project is not just about submitting code to fix bugs or add features. There are many ways to contribute to an open-source project, including but not limited to:

1. Raising requirements: Submitting detailed requirements based on your business needs when the open-source project cannot meet them.
2. Documentation: Submitting PRs to fix small issues in the documentation or submitting issues to report problems and suggest improvements.
3. Discussion: Initiating discussions on your ideas, needs, and suggestions.
4. Answering questions: Helping to reply to and handle issues and discussions based on your own experience.
5. Bugfix: If you encounter problems during use and can locate the problem code and are willing to try to accept the challenge, you can submit a PR to solve the problem.
6. Feature submission: Based on discussions in issues and discussions, submit a PR after implementation for the benefit of all open-source users.
7. Ecosystem operation: Adding ecosystem content to an open-source project through your abilities, such as blogs, case studies, solutions, and extensions.

If you have any questions, feel free to submit an issue (<https://github.com/antvis/g-device-api/issues>) or directly modify and submit a PR (<https://github.com/antvis/g-device-api/pulls>). The following mainly introduces the operational guidelines for several types of open-source contributions.

## How to debug project code?

> When learning the project code or solving bugs and submitting features for the project, debugging and running the code is necessary. Here is how to start and debug the project.

-   Clone the project and install dependencies:

```bash
git clone git@github.com:antvis/g-device-api.git

cd g-device-api

npm install
```

-   Start a local debugging case:

We use [Vite](https://vitejs.dev/) to build the preview environment. Going through `npm run dev` can open the preview page.

```bash
npm run dev
```

## What are the requirements for contributing PR?

In order to ensure the long-term code quality and stability of the project, a PR needs to meet the following requirements at least:

-   Commit Message format
-   Automation testing requirements
-   Pull Request guidelines

### Commit Message format

Follow the [angular format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) for commit messages. This makes the commit history more clear and enables the generation of changelogs. The format should be as follows:

```text
type(scope): your commit message subject
```

`type`: The type of the commit, including the following categories:

-   feat: a new feature
-   fix: a bug fix
-   docs: changes to documentation
-   style: code style changes that do not affect the logic
-   refactor: code refactoring that does not affect the existing features
-   perf: performance improvements
-   test: adding or modifying tests
-   chore: changes to tools or utilities (including but not limited to documentation, code generation, etc.)
-   deps: dependency upgrades (2) scope The scope of the modified files. (3) subject The specific content of the modification. Example
-   fix(compile): couple of unit tests for IE9

`scope`: the scope of the commit.

`subject`: the subject of the commit.

### Automation testing requirements

This project has two parts of automated testing:

-   Unit tests: tests for data modules or functions, located in `__tests__/unit/`.
-   Integration tests: tests the rendering results of the entire visualization chart by comparing screenshots, located in `__tests__/integration/`.

For all changes, unit tests or integration tests should be submitted to cover the modified parts. Additionally, run `npm run test` locally to ensure the CI runs successfully.

### Automation release

It can automatically create GitHub Releases and automatically associate the release to the corresponding issue.

-   Create `release` branch from `next`
-   Checkout dev branch from `release`, run changeset and commit

```bash
pnpm run changeset
git add ./
git commit -a -m "chore: commit changeset"
```

-   Merge dev branch into `release` branch, CI version process will create a `Version Package` PR
-   Merge `release` into `next` branch

In addition, all API deprecations need to be `deprecate` prompted on the current stable version and guaranteed to be compatible on the current stable version until a new version is released.

### Pull Request guidelines

Since no one can guarantee how long it will be until they remember, please provide the following information when submitting a Pull Request for convenient historical reference:

-   Requirement (usually associated with an issue or comment)
-   Reason for the upgrade (different from the issue, briefly describe why it needs to be addressed)
-   Framework testing points (can be associated with test files, no need for detailed description, just key points)
-   Concerns (for users, optional, usually for incompatible updates, additional prompts are required)

For any other questions, please submit a discussion for help. We look forward to your contribution.
