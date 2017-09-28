#!/bin/bash

check() {
    echo 'Checking...'
    for obj in *; do
        if [[ -d $obj ]] || [[ ${obj##*.} == js ]]; then
            ./node_modules/.bin/eslint $obj "$1"
        fi
    done
}

if [ -f './node_modules/.bin/eslint' ]; then
    check
else
    echo 'ESLint not found, installing...'
    npm install eslint --save-dev
    check
fi

