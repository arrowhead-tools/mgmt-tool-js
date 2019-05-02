# Arrowhead Management Tool

This tool is providing a user interface to manage Arrowhead core systems. Currently the following core systems are supported:
1. ServiceRegistry (SQL version)
2. Authorization System (both intra- and inter-cloud authorization schemas)
3. Orchestration Store
4. Gatekeeper and Gateway settings
5. Event Handler


Running this project has 2 options:
1. Running and building the project by source code
2. Running from prebuilt Docker container

### Running the project in development mode
1. The project requires [NodeJS v7 or newer](https://nodejs.org/en/download/)
2. Check your node version with the following command:
    ```
    node -v
    ```

3. Download or check out this project, go to the root folder and execute the following command, to install all dependencies
    ```
    npm install
    ```
4. Create a `.env` file in the root folder based on `.env.example` (all environment values are listed in the example)
5. Start the development server with the following command
    ```
    npm start
    ```

### Docker image
1. Install [Docker](https://docs.docker.com/install/)
2. [Pull](https://docs.docker.com/engine/reference/commandline/pull/) the prebuilt docker image:
    ```
    docker pull svetlint/arrowhead-react
    ```
3. [Run](https://docs.docker.com/engine/reference/commandline/run/) the container with the following example command:
    ```
    docker run -it --rm -p 3000:5000 
    --name arrowhead-react-container 
    -e REACT_APP_ARROWHEAD_SR_URL=http://arrowhead.tmit.bme.hu:8342 
    -e REACT_APP_ARROWHEAD_ORCH_URL=http://arrowhead.tmit.bme.hu:8340 
    -e REACT_APP_ARROWHEAD_GK_URL=http://arrowhead.tmit.bme.hu:8348 
    svetlint/arrowhead-react
    ```

##Available environment variables
   You can use the following environment variables in the `.env` file, or in the docker run command with the `-e` flag.
   
    ```
    REACT_APP_ARROWHEAD_SR_URL=URL:port of your Service Registry Core System
    REACT_APP_ARROWHEAD_ORCH_URL=URL:port of your Orchestrator Core System
    REACT_APP_ARROWHEAD_GK_URL=URL:port or your Gatekeeper Core System
    REACT_APP_ARROWHEAD_AUTH_URL=URL:port of your Authorization Core System
    REACT_APP_ARROWHEAD_EH_URL=URL:port of your Event Handler Core System
    REACT_APP_ARROWHEAD_CHOREOGRAPHER_URL=URL:port of your Choreographer Core System
    ```
Example environment variables, for the BME public test beds

    ```
    REACT_APP_ARROWHEAD_SR_URL=http://arrowhead.tmit.bme.hu:8342
    REACT_APP_ARROWHEAD_ORCH_URL=http://arrowhead.tmit.bme.hu:8340
    REACT_APP_ARROWHEAD_GK_URL=http://arrowhead.tmit.bme.hu:8348
    REACT_APP_ARROWHEAD_AUTH_URL=http://arrowhead.tmit.bme.hu:8344
    REACT_APP_ARROWHEAD_EH_URL=http://arrowhead.tmit.bme.hu:8354
    REACT_APP_ARROWHEAD_CHOREOGRAPHER_URL=http://arrowhead.tmit.bme.hu:8356
    ```    
    
##TROUBLESHOOTING

Q: When I start the Management Tool all pages are blank. :( What should I do?
A: Either you missed to provide the correct environment variables (.env using Node or -e flag using Docker), or you've made a typo. 
