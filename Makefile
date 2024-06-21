.PHONY: run push-changes connect-ssh pull-changes run-server

run: push-changes connect-ssh pull-changes run-server
push-changes:
	git add . && git commit -m 'f' && git push
connect-ssh:
	ssh akaden@158.160.88.119
