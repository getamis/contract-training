#!/bin/bash
find . -name '*.md' | xargs -I '{}' markdown-to-slides '{}'  -o '{}'.html -s css/style.css
