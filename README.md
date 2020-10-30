# Danilkinkin site
This is my main site

## Build and start

##### Environment variables

- `SSH_PUB_KEY` The public ssh key is certified in github. Needed for private loading of dependencies
- `SSH_PRV_KEY` The private ssh key.

##### Build project
```bash
$ SSH_PRV_KEY="$SSH_PRV_KEY" SSH_PUB_KEY="$SSH_PUB_KEY" docker-compose up
```


## Example build
```bash
$ export SSH_PUB_KEY="$(cat ~/.ssh/id_rsa.pub)"
$ export SSH_PRV_KEY="$(cat ~/.ssh/id_rsa)"
$ SSH_PRV_KEY="$SSH_PRV_KEY" SSH_PUB_KEY="$SSH_PUB_KEY" docker-compose up
```
