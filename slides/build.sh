#!/bin/bash
find . -name '*.md' -not -path "./node_modules/*" | xargs -I '{}' markdown-to-slides '{}'  -o '{}'.html -s css/style.css
