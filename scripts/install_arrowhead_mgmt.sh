#!/bin/bash

echo "Check internet connection"
if [[ ! $(ping -q -c 1 -W 1 google.com 2>&1 /dev/null; echo $?) ]]; then
        echo "no internet connection"
	exit 1
fi

echo "Change directory to Home Path"
cd ~

if [[ $(command -v git | wc -l) -eq 0 ]]; then
	read -n 1 -p "Git is not installed. Install? [y,n] " inst

        if [[ $inst =~ ^[Yy]$ ]]; then
                sudo apt-get install -y git
	else
		exit 2
	fi
fi

if [[ $(command -v node | wc -l) -eq 0 ]]; then
	read -n 1 -p "NodeJS is not installed. Install? [y,n] " inst

        if [[ $inst =~ ^[Yy]$ ]]; then
                curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
		sudo apt-get install -y nodejs
	else
		exit 3
        fi
fi

echo "Install Package Updater 'npm-check-updates'"
sudo npm install -g npm-check-updates

echo "Download Arrowhead Web Management"
git clone https://github.com/arrowhead-f/mgmt-tool-js.git arrowhead-mgmt; cd arrowhead-mgmt

echo "Update Package.json"
ncu -u

echo "Install Arrowhead Management Tool"
npm install

echo "Copy environment file"
cp .env.example .env

echo "Start Management Tool"
read -n 1 -p "Start Management Tool? [y,n] " inst

if [[ $inst =~ ^[Yy]$ ]]; then
        echo 'y' | npm start &

        echo "Wait 3 Minutes for startup"
        sleep 3m

        if [[ $(curl -v localhost:3000; echo $?) -eq 0 ]]; then
                echo "Tool successfully started"
        else
                echo "Management tool could not be started. But maybe it is still starting. Check it with fg"
        fi
fi

echo "Please change the .env file in the arrowhead-mgmt directory to your system"
exit 0
