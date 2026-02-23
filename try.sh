#!/bin/bash
dir="./files"


for file in "$dir"/*
do
   if [ -f  "$file" ]
   then
       ./decrypt.sh "$file"
   fi


done

