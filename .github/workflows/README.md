# CD workflows

The deploy-preview workflow is triggered upon pull request to `main` branch or any of the `revamp*` branches. It will deploy the code to a pre-production environment where we can test the software in an enviroment as close to the production environment as possible. 

The deploy workflow is triggered on push to the `main` branch. It will deploy the code to the production environment automatically.

Currently, no testing is done in the code base so the workflows immediately automatically deploy only.