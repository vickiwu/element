
###
 # @Author: vickiWu
 # @Date: 2022-02-18 10:04:00
 # @LastEditTime: 2022-03-25 13:58:30
 # @LastEditors: vickiWu
 # @Description: 构建发行版本和开发版本内容
 # @FilePath: \element\build\deploy-ci.sh
### 
#! /bin/sh
# 定义user.name和user.email
mkdir temp_web
git config --global user.name "element-bot"
git config --global user.email "wallement@gmail.com"

if [ "$ROT_TOKEN" = "" ]; then
  echo "Bye~"
  exit 0
fi

# release 发行版本
if [ "$TRAVIS_TAG" ]; then
  # build lib 组件库构建
  npm run dist
  cd temp_web
  git clone https://$ROT_TOKEN@github.com/ElementUI/lib.git && cd lib
  rm -rf `find * ! -name README.md`
  cp -rf ../../lib/** .
  git add -A .
  git commit -m "[build] $TRAVIS_TAG"
  git tag $TRAVIS_TAG
  git push origin master --tags
  cd ../..

  # build theme-chalk 主题构建
  cd temp_web
  git clone https://$ROT_TOKEN@github.com/ElementUI/theme-chalk.git && cd theme-chalk
  rm -rf *
  cp -rf ../../packages/theme-chalk/** .
  git add -A .
  git commit -m "[build] $TRAVIS_TAG"
  git tag $TRAVIS_TAG
  git push origin master --tags
  cd ../..

  # build site 项目网站构建
  npm run deploy:build
  cd temp_web
  git clone --depth 1 -b gh-pages --single-branch https://$ROT_TOKEN@github.com/ElemeFE/element.git && cd element
  # build sub folder
  echo $TRAVIS_TAG

  SUB_FOLDER='2.15'
  mkdir $SUB_FOLDER
  rm -rf *.js *.css *.map static
  rm -rf $SUB_FOLDER/**
  cp -rf ../../examples/element-ui/** .
  cp -rf ../../examples/element-ui/** $SUB_FOLDER/
  git add -A .
  git commit -m "$TRAVIS_COMMIT_MSG"
  git push origin gh-pages
  cd ../..

  echo "DONE, Bye~"
  exit 0
fi

# build dev site 开发环境 网站构建
npm run build:file && CI_ENV=/dev/$TRAVIS_BRANCH/ node_modules/.bin/cross-env NODE_ENV=production node_modules/.bin/webpack --config build/webpack.demo.js
cd temp_web
git clone https://$ROT_TOKEN@github.com/ElementUI/dev.git && cd dev
mkdir $TRAVIS_BRANCH
rm -rf $TRAVIS_BRANCH/**
cp -rf ../../examples/element-ui/** $TRAVIS_BRANCH/
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin master
cd ../..

# push dev theme-chalk 开发环境主题构建
cd temp_web
git clone -b $TRAVIS_BRANCH https://$ROT_TOKEN@github.com/ElementUI/theme-chalk.git && cd theme-chalk
rm -rf *
cp -rf ../../packages/theme-chalk/** .
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin $TRAVIS_BRANCH
cd ../..
