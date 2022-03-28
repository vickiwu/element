#!/usr/bin/env sh
###
 # @Author: vickiWu
 # @Date: 2022-02-18 10:04:00
 # @LastEditTime: 2022-03-25 13:40:12
 # @LastEditors: vickiWu
 # @Description: 检查本地代码 dev 分支是否与线上分支存在冲突。
 # @FilePath: \element\build\git-release.sh
### 
# 运行shell脚本sh build/git-release.sh ，检查代码 dev 分支是否存在冲突(No conflicts);
git checkout dev #切换分支

# 检查本地和暂存区是否有未提交的文件
if test -n "$(git status --porcelain)"; then
  echo 'Unclean working tree. Commit or stash changes first.' >&2;
  exit 128;
fi

# 检查本地分支是否有误
if ! git fetch --quiet 2>/dev/null; then
  echo 'There was a problem fetching your branch. Run `git fetch` to see more...' >&2;
  exit 128;
fi

# 检查本地分支是否落后远程分支
if test "0" != "$(git rev-list --count --left-only @'{u}'...HEAD)"; then
  echo 'Remote history differ. Please pull changes.' >&2;
  exit 128;
fi
# 通过以上检查，代码无冲突
echo 'No conflicts.' >&2;
