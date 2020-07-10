#!/bin/bash

docker build -t 708570229439.dkr.ecr.us-east-1.amazonaws.com/fusion:sprint-2.0.1-quickfix .

echo "docker build is completed !!!! Starting docker push"

docker push 708570229439.dkr.ecr.us-east-1.amazonaws.com/fusion:sprint-2.0.1-quickfix

