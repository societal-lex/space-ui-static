#!/bin/bash

docker build -t 708570229439.dkr.ecr.us-east-1.amazonaws.com/niit-fusion:explore-guide-dev-hotfixes-1.1.2 .

echo "docker build is completed !!!! Starting docker push"

docker push 708570229439.dkr.ecr.us-east-1.amazonaws.com/niit-fusion:explore-guide-dev-hotfixes-1.1.2

