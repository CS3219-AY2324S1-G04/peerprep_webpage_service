#!/usr/bin/env bash

kubectl apply -f ./deployments/api.yaml
kubectl apply -f ./services/api.yaml
kubectl apply -f ./hpas/api.yaml
