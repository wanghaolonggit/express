#!/bin/bash

NODE_ENV=production forever -a -l `pwd`/logs/forever.log -o `pwd`/logs/out.log -e `pwd`/logs/error.log start `pwd`/bin/www
