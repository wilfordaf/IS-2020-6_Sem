#!/bin/bash

if [ -n "$1" ]; then
    port=$1
else
    port=22
fi

echo "Checking IPs and connections on port $port...\n"

ip_list=$(netstat -nt | awk -v port="$port" '$4 ~ /:'"$port"'$/ {print $5}' | cut -d ':' -f1 | sort | uniq -c | sort -nr)

echo "IP Address | Number of Connections"
echo "---------------------------------"
echo "$ip_list" | awk '{printf "%-11s| %s\n", $2, $1}'
