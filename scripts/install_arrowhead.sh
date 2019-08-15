#!/bin/bash

if [[ $(id -u) -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

ramtotal=$(grep MemTotal /proc/meminfo | awk '{print ($2 * 1024)}')
swaptotal=$(swapon --show=SIZE --noheadings --bytes)

echo "Check internet connection"
if [[ ! $(ping -q -c 1 -W 1 google.com 2>1 /dev/null; echo $?) ]]; then
	echo "no internet connection"
	exit 2
fi

echo "Check RAM and Swap size"
if [[ $ramtotal -lt 1000000000 ]] && [[ $swaptotal -lt 2000000000 ]]; then
	echo "RAM size is lower then 1 GB and your SWAP is lower then 2 GB."
	exit 3
fi

echo "Check Java Version"
if [[ $(java -version 2>&1 | awk -F '"' '/version/ {print $2}') < "1.8" ]]; then
	echo "Installed Java Version is lower then 1.8. Please install it manually (JRE, JDK needed)."
	exit 4
fi

echo "Check maven"
if [[ $(command -v maven | wc -l) -eq 0 ]]; then
	read -n 1 -p "Maven is not installed. Install? [y,n] " inst

	if [[ $inst =~ ^[Yy]$ ]]; then
		apt-get install maven
	else
		exit 5
	fi
fi

echo "Check git"
if [[ $(command -v git | wc -l) -eq 0 ]]; then
	read -n 1 -p "Git is not installed. Install? [y,n] " inst

        if [[ $inst =~ ^[Yy]$ ]]; then
                apt-get install git
	else
		exit 6
        fi
fi

echo "Check MySql"
if [[ $(command -v mysql | wc -l) -eq 0 ]]; then
	read -n 1 -p "MySql-Server is not installed. Install? [y,n] " inst

        if [[ $inst =~ ^[Yy]$ ]]; then
                apt-get install mariadb-server

		echo "Set user permisson for root to login"
		sudo mysql -u root -D mysql -e "update user set plugin='mysql_native_password' where user='root'; flush privileges;"
	else
		exit 6
        fi
fi

echo "Check unzip"
if [[ $(command -v unzip | wc -l) -eq 0 ]]; then
	read -n 1 -p "Unzip is not installed. Install? [y,n] " inst

        if [[ $inst =~ ^[Yy]$ ]]; then
                apt-get install unzip
	else
		exit 7
        fi
fi

echo "Clean up"
apt-get autoremove
apt-get clean

echo "Change directory to Home directory"
cd ~

echo "Download required Debian packages and install them"
wget -c https://github.com/arrowhead-f/core-java/releases/download/4.1.0/debian_packages.zip
unzip debian_packages.zip
cd debian_packages/
dpkg --install arrowhead-*.deb

cd ..

echo "Download Arrowhead Core framework and prepare for start"
git clone https://github.com/arrowhead-f/core-java.git arrowhead
cd arrowhead
chmod a+x ./scripts/*.sh
mvn clean install

if [[ $(echo $?) -ne 0 ]]; then
	echo "Could not compile Arrowhead framework"
	exit 8
fi

echo "Setting up Database and Tables"
mysql -u root < ~/arrowhead/scripts/create_database_and_user.sql

if [[ $(sudo mysql -u root -e "show databases" | grep "arrowhead" | wc -l) -eq 1 ]]; then
	echo "Could not create user oder database"
	exit 9
fi

mysql -u root < ~/arrowhead/scripts/create_empty_arrowhead_db.sql

if [[ $(mysql -u root -D arrowhead -e "show tables" -N | grep -E "[A-Za-z]*" | wc -l) -eq 0 ]]; then
	echo "Could not create tables in database 'arrowhead'"
	exit 10
fi

read -n 1 -p "Start Arrowhead framework? [y,n] " inst

if [[ $inst =~ ^[Yy]$ ]]; then
	/bin/bash ~/arrowhead/scripts/start_insecure_coresystems.sh

	echo "Wait 3 Minutes for startup"
	sleep 3m

	if [[ $(curl -v localhost:8453; echo $?) -eq 0 ]]; then
		echo "Framework successfully started"
	else
		echo "Framework could not be started. But maybe it is still starting"
	fi
fi

echo "To start the framework start the script in ~/arrowhead/scripts/start_insecure_coresystems.sh"
exit 0
