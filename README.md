NodeJS v7+ required

1. run "npm install"
2. create a .env file to the root folder based on .env.example
3. run "npm start"

Command to pull the docker image:
docker pull svetlint/arrowhead-react

Run the container:
docker run -it --rm -p 3000:5000 --name arrowhead-react-container -e REACT_APP_ARROWHEAD_SR_URL=http://arrowhead.tmit.bme.hu:8342 -e REACT_APP_ARROWHEAD_ORCH_URL=http://arrowhead.tmit.bme.hu:8340 -e REACT_APP_ARROWHEAD_GK_URL=http://arrowhead.tmit.bme.hu:8348 svetlint/arrowhead-react
