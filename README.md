## Introduction

This application monitors the Ethereum blockchain and make the right decision based on a given set of rules.

## System design choices

This services follows the three-layered architecture consisting of Application -> Domain -> Infrastructure. The application layer allows external applications to communicate with this service. In this case, we expose HTTP endpoints, that allow the users to do CRUD operations on Configurations. The Domain layer holds the business logic -> responsible for applying business rules to the incomming / outgoing data that is being processed in this service. Lastly, we have the Infrastructure Layer - communicating with external services (Third-party APIs), which in our case is an sqlite3 database for persisting _Configurations_, _Transactions_ and _Logs_. This service uses IoC container for injecting dependencies to enable more modular and testable code.

## Running service locally

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bobirok/rulling-system.git
   cd rulling-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   ```env
   INFURA_API_URL=your_infura_api_url_here
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

## Running service in Docker

If you prefer to run the application within a Docker container, follow these steps:

1. **Ensure Docker and Docker Compose are installed**

2. **Create a .env file**

   ```env
   INFURA_API_URL=your_infura_api_url_here
   ```

3. **Build and run the application**
   ```bash
   docker compose up
   ```

## Running tests

If you would like to run the tests of this service, you need to do the following steps:

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run tests**
   ```bash
   npm run test
   ```

## Building the service

Building this service as a Docker image is possible via the command:

```bash
npm run build-image
```

Building the service from TS to JS is possible via the command:

```bash
npm run build
```

## Implemented features

1. **CRUD for Configurations** - Allowing the user to Create, Read, Update, Delete configurations. Also, there is **hotload** of configurations. Meaning, if a new configuration is added (or removed) during run-time, it will be considered for the following transactions.
2. **Support for different configuration operators** - We can specify different rule operators such as Greater than, Less than, Equals and Includes. An exaple of how we create a configuration is shown below:

```json
{
  "configurationRules": [
    {
      "field": "value",
      "operator": "<",
      "value": 1000 // in wei for value, gasPrice, gasLimit -- in string for hash, from, to
    }
  ]
}
```

3. **Backward compatibility on configuration deletion** - We apply the so-called soft deletion of configurations. This allows us to backtrace the Configuration that triggered the storing of certain Transaction even if that config was deleted. Additionally, when the user updates a configuration this might lead to weird behaviour. For example, we may get a transaction that was matched with some config which is no longer the same. Therefore, we added a smarter update function, which soft-deletes the old version of that config and recreates a new one.

4. **Tracking system via logs** - Each mutation called on a Configuration is monitored and stored under the _Logs_ table. This is especially useful when a configuration was updated as we store the old configuration and the new one.

## Future work

There are several aspects in which this service can be improved:

1. **Have additional Configuration to parse Transactions with delayed amount of Blocks** - One of the bonus assignments that was not completed.
2. **Validation schemas for HTTP requests** - Implementing validation schemas using AJV or Zod to validate the incoming requests from the user. For instance, when creating a configuration, we want to validate whether the user's request contains a valid specification of configuration.
3. **Support for other operations** - Currently a configuration rule can support the following operations: > (Greater than), < (Less than), = (Equals), ~ (Includes). Extending these operations will allow the user to have more freedom. Extending it should be relatively simple - adding operator in _operator.ts_ and then writing the logic in _conditions.ts_ file.
4. **Various performance optimizations** - Such as, utilizing message queue, using more performant database such as InfluxDB or Redis for quicker data access and storage.
