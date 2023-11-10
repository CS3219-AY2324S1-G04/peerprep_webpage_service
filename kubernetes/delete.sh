#!/usr/bin/env bash

kubectl delete -f ./deployments/api.yaml
kubectl delete -f ./services/api.yaml
kubectl delete -f ./hpas/api.yaml
