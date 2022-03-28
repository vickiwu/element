#!/usr/bin/env sh
###
 # @Author: vickiWu
 # @Date: 2022-02-18 10:04:00
 # @LastEditTime: 2022-03-25 13:44:59
 # @LastEditors: vickiWu
 # @Description: 代码分支合并push远程分支、版本号确认更新、组件主题发布(npm pulish)。
 # @FilePath: \element\build\release.sh
### 
#运行shell脚本sh build/release.sh,合并dev分支到master分支、更新版本号、发布主题、push代码到远程仓库、发布组件库至NPM;
# -e 当命令发生错误的时候，停止脚本执行
set -e

# 合并 dev 分支到 master
git checkout master
git merge dev

# 通过 select-version-cli 确认发布版本号。
VERSION=`npx select-version-cli`
# 确认发布版本信息
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build 执行命令 npm run dist 打包构建组件
  VERSION=$VERSION npm run dist

  # ssr test 运行ssr测试 node test/ssr/require.test.js。
  node test/ssr/require.test.js            

  # publish theme 发布主题，更新版本号，与组件库保持一致。
  echo "Releasing theme-chalk $VERSION ..."
  cd packages/theme-chalk
  # 提交代码并更新package.json中的版本号 。
  npm version $VERSION --message "[release] $VERSION"
  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi
  cd ../..

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish master 和 dev 分支push 到远程分支。
  git push eleme master
  git push eleme refs/tags/v$VERSION
  git checkout dev
  git rebase master
  git push eleme dev
 # 发布组件。
  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi
fi
