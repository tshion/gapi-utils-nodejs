#!/bin/bash

# まだリリースしていないGit タグのリリースノートの推定
# ※GitHub CLI のアクセス権限等の設定が必要
#
# $1 -> リリースしようとしているGit タグ名
# $2 -> $1 があるGit ブランチ名

repoName="tshion/gapi-utils-nodejs"

latestTag=$(gh release list \
    --exclude-drafts \
    --exclude-pre-releases \
    --order desc --limit 1 \
    --json tagName --jq '.[].tagName' \
)

gh api \
    --method POST \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "/repos/$repoName/releases/generate-notes" \
    -f "tag_name=preview$1" \
    -f "target_commitish=$2" \
    -f "previous_tag_name=$latestTag"
