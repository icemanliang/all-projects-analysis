#!/bin/bash

curl 'https://openapi.xxx.xx/webhook/api/post' \
			-H 'Content-Type: application/json' \
			-d '
			{
					"tag": "text",
					"text": {
							"content": "\n分析项目:  全项目\n分析报告:  https://liangxin199045.github.io/all-projects-analysis/",
							"at_all": true
					}
			}'
