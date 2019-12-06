#!/bin/bash

if [ -d ./data ]; then
	docker exec MONGODB mongoimport -d webjump -c desafio --type csv --file /home/pyd.csv --headerline
else
	mkdir ./data && docker exec MONGODB mongoimport -d webjump -c desafio --type csv --file /home/pyd.csv --headerline
fi
