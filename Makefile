.PHONY: run push-changes connect-ssh pull-changes run-server

run: push-changes connect-ssh pull-changes run-server
push-changes:
	git add . && git commit -m 'f' && git push
connect-ssh:
	ssh akaden@158.160.14.246
pull-changes:
	git pull
run-server:
	sudo http-server -p 8080
