#!/bin/bash

echo "Current Time Stamp: $(date)"
echo "Network Interfaces Information:"
echo "Interface Name  Receive-Packets  Transmit-Packets"

content=$(tail -n +3 "/proc/net/dev")

{ printf "$content"; echo; } | while read line
do
	interface=$(echo $line | awk '{print $1}' | tr -d ':')
	receivePackets=$(echo $line | awk '{print $2}')
	transmitPackets=$(echo $line | awk '{print $10}')
	echo "$interface\t\t$receivePackets\t\t $transmitPackets"
done