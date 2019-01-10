# Arrowhead front-end documentation

Running this project has 2 options:
1. Running and building the project by source code
2. Running the prebuilt docker container

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
4. Create a .env file in the root folder based on .env.example (all environment values are listed in the example)
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


