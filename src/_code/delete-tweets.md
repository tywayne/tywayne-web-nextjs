---
title: delete-tweets
layout: code
published: true
date: '2022-12-29T03:53:00.000Z'
excerpt: Lambda function, deployable to AWS Lambda for deleting tweets after a number of days.
archived: true
link: https://github.com/tywayne/delete-tweets
twitter_card: summary
---

I've been a [Twitter user](https://twitter.com/tywayne) since 2007. It has always felt like the social media platform that I resonated with the most. Facebook is trash, Instagram is okay but I'm never going to do reels, and LinkedIn is...well LinkedIn.

Having been on the platform for so many years, I found myself wanting to remove some of the more cringe worthy posts from yesteryear, as well as prevent such cringe from inevitably cropping up in the future.

Thus the tweet deleter was born. Wrote a little Lambda function in TypeScript that I can run every hour, find all of my tweets and/or favorites, and delete them if they've crossed my threshold (currently set to 48hrs.)
