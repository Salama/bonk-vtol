#!/bin/bash
name="Bonk VTOL"
sname="bonk-vtol"
version="4.5"
description="Brings back the legendary gamemode known as VTOL to bonk.io"

tmp0=$(mktemp)
tmp1=$(mktemp)

if [ ! -d build ]; then mkdir build; fi
cd build
csplit ../injector.js /\/\*\*\*REPLACERS\*\*\*/
cat xx00 > "$tmp0"
cat ../mod/replacers.js >> "$tmp0"
cat xx01 | tail -n+2 >> "$tmp0"
csplit "$tmp0" /\/\*\*\*CONSTANTS\*\*\*/
cat xx00 > "$tmp0"
cat ../mod/constants.js >> "$tmp0"
cat xx01 | tail -n+2 >> "$tmp1"

cat ../manifest.json | jq ".name=\"$name\" | .version=\"$version\" | .description=\"$description\"" > "$tmp0"

7z a -tzip "$sname.zip" "$tmp0" "$tmp1" ../loadInjector.js ../runInjectors.js ../background.js

csplit ../userscript.js /\/\*\*\*REPLACERS\*\*\*/
cat xx00 > "$tmp0"
cat ../mod/replacers.js >> "$tmp0"
cat xx01 | tail -n+2 >> "$tmp0"
csplit "$tmp0" /\/\*\*\*CONSTANTS\*\*\*/
cat xx00 > "$tmp0"
cat ../mod/constants.js >> "$tmp0"
cat xx01 | tail -n+2 >> "$tmp0"
cat "$tmp0" | sed "s#/\*\*\*NAME\*\*\*/#$name#g" | sed "s#/\*\*\*SNAME\*\*\*/#$sname#g" | sed "s#/\*\*\*VERSION\*\*\*/#$version#g" | sed "s#/\*\*\*DESCRIPTION\*\*\*/#$description#g" > "$sname.js"
rm xx00 xx01 "$tmp0" "$tmp1"