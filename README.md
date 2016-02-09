# aws-lambda-canary <img width="300" style="float:right" alt="login with github" src="https://cloud.githubusercontent.com/assets/194400/12914756/33a00ec6-cf1e-11e5-80f8-848c3ad45ecd.jpg">

Canary project for lambda services on AWS

[![CodeShip Status](https://codeship.com/projects/babc13f0-9cdb-0133-9aee-22509ada1533/status?branch=master)](https://codeship.com/projects/127276)
[![codecov.io](https://codecov.io/github/numo-labs/aws-lambda-canary/coverage.svg?branch=master)](https://codecov.io/github/numo-labs/aws-lambda-canary?branch=master)
[![Dependency Status](https://david-dm.org/numo-labs/aws-lambda-canary.svg)](https://david-dm.org/numo-labs/aws-lambda-canary)
[![devDependency Status](https://david-dm.org/numo-labs/aws-lambda-canary/dev-status.svg)](https://david-dm.org/numo-labs/aws-lambda-canary#info=devDependencies)


## Why?

The *purpose* of the "*Canary*" is to give people a *gentle*
introduction to how we build AWS Lambda based Event-driven Microservices
in Numo Labs.


## What?

Canary is a *demo* Lambda service that is meant to show
everyone on the team how a project should be setup and tested.

## How?

To run this project locally, simply `git clone` it and `npm install`
to get all the dependencies.

### *Required* Environment Variables

To run this project, you will need to have the following
Environment Variables set:

+ AWS_ACCESS_KEY_ID
+ AWS_SECRET_ACCESS_KEY
+ IAM_ROLE

Copy/paste this export list into your text editor,
add the appropriate values (*request form project lead if you don't have them*),
then paste the complete export list into your environment.

```sh
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export IAM_ROLE=
```
