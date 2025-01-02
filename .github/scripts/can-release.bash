#!/bin/bash

# 引数で指定されたGit タグ名でリリースできるかどうか
#
# $1 -> Git タグ名
#
# 注意事項
# * GitHub CLI のアクセス権限設定が必要

if gh release view $1 --repo tshion/gapi-utils-nodejs > /dev/null; then
  echo "$1 is already released!"
  exit 1
fi
