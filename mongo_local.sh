#!/bin/bash

if [ -d ./data ]; then
	mongoimport -d webjump -c desafio --type csv --file ./csv/pyd.csv --headerline
else
	mkdir ./data && mongoimport -d webjump -c desafio --type csv --file ./csv/pyd.csv --headerline
fi
