#!/bin/bash


model=$(lspci | grep -i "ethernet" | awk -F: '{print $3}')
cardIdentifier=$(ip link show | awk 'NR==3{print $2}' | tr -d ':')
speed=$(ethtool "$cardIdentifier" | grep "Speed:" | awk '{print $2}')
duplex=$(ethtool "$cardIdentifier" | grep "Duplex:" | awk '{print $2}')
link=$(ethtool "$cardIdentifier" | grep "Link detected:" | awk '{print $3}')
macAddress=$(ip link show "$cardIdentifier" | awk '/link\/ether/ {print $2}')

echo "\nNetwork card model:$model"
echo "Network card identifier: $cardIdentifier"
echo "Channel speed: $speed"
echo "Duplex mode: $duplex"
echo "Link detected: $link"
echo "MAC address: $macAddress\n"

ipv4=$(ifconfig "$cardIdentifier" | grep -w "inet" | awk '{print $2}')
ipv6=$(ifconfig "$cardIdentifier" | grep -w "inet6" | awk '{print $2}')
mask=$(ifconfig "$cardIdentifier" | grep "netmask" | awk '{print $4}')
gateway=$(ip route | grep "default" | awk '{print $3}')
dns=$(cat /etc/resolv.conf | grep "nameserver " | awk '{print $2}' | tr '\n' ';')

echo "IPv4 address: $ipv4; IPv6 address: $ipv6"
echo "Subnet mask: $mask"
echo "Default gateway: $gateway"
echo "DNS servers: $dns\n"

read -p "Do you want to configure static IP? [Y/n] " choice

if [ "$choice" = "Y" ]; then
	sudo ifconfig "$cardIdentifier" 10.100.0.2 netmask 255.255.255.0
	sudo ip route add 10.100.0.1 dev "$cardIdentifier" >/dev/null 2>&1
	sudo ip route add default via 10.100.0.1 >/dev/null 2>&1
	echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf >/dev/null 2>&1
	echo "Successfully finished configuring $cardIdentifier in static mode!"
fi

read -p "Do you want to configure dynamic IP? [Y/n] " choice

if [ "$choice" = "Y" ]; then
	sudo dhclient -r -q "$cardIdentifier" >/dev/null 2>&1
	sudo dhclient -q "$cardIdentifier" >/dev/null 2>&1
	echo "Successfully finished configuring $cardIdentifier in dynamic mode!"
fi

