.PHONY: run push-changes connect-ssh pull-changes run-server

run: push-changes connect-ssh pull-changes run-server
push-changes:
	git add . && git commit -m 'f' && git push
connect-ssh:
	ssh akaden@51.250.26.130
