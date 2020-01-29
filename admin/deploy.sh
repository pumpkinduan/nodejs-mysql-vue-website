#!/user/bin/env sh
set -env

npm run build 

cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:pumpkinduan/pumpkinduan.github.io.git master