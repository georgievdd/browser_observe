.PHONY: run push-changes connect-ssh pull-changes run-server hst

run: push-changes connect-ssh pull-changes run-server hst
push-changes:
	git add . && git commit -m 'f' && git push
connect-ssh:
	ssh akaden@158.160.14.246
hst:
	make
