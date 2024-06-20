# Client Management Demo (backend)

## Overview

Backend (express js) repo. To be run in conjunction with FE [react-client-management-demo](https://github.com/chrisarmitt/react-client-management-demo)

Runs on PORT 5000 by default

## Setup

* node 20.x
* `npm install`
* `npx sequelize-cli db:migrate` - create local .sqlite db files for dev / test
* `npx sequelize-cli db:seed:all` - populate fundingSource tables with provided values
* `npm start`

## Unit Testing
* `npm test`

## Future Considerations
The following ideas were / would be considered for future enhancement given time:
* Combining FE / BE repos into a single repo
* Convert to Typescript, share models for both FE & BE, utilise tools such as [tRPC](https://trpc.io/) for type-safe API requests
* Cloud hosting via AWS CDK for SQL DB, IAM roles, WAF & API securing - many security / scalability benefits
* Improved logging (Datadog or similar)
* Github actions for CI/CD pipeline, prod, dev, test/uat env structure
* Projen for project templating and configuration management for jest, package.json dependencies, eslint, GH Workflows etc.
* Additional unit test coverage
