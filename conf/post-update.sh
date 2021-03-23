#!/bin/sh

echo
echo "*** Pulling changes into Live"
echo

cd /var/www/tweetch.art || exit
unset GIT_DIR
git pull hub master

branch=$(git rev-parse --symbolic --abbrev-ref $1)
if [ "$branch" = "master" ]
then
  cd /var/www/tweetch.art/
  yarn install
  yarn build
fi

exec git-update-server-info
