ENV_FILE := .env
ifneq ("$(wildcard $(ENV_FILE))","")
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
endif

##################################

# DEV - run apps locally for development

.PHONY: dev-server
dev-server:
	./server/install/dev.sh

.PHONY: dev-ui
dev-ui:
	./ui/install/dev.sh

##################################

# BUILD - build images locally using s2i

.PHONY: build-server
build-server:
	./server/install/build.sh

.PHONY: build-ui
build-ui:
	./ui/install/build.sh

.PHONY: build
build: build-server build-ui

##################################

# PUSH - push images to repository

.PHONY: push-server
push-server:
	./server/install/push.sh

.PHONY: push-ui
push-ui:
	./ui/install/push.sh

.PHONY: push
push: push-server push-ui

##################################

