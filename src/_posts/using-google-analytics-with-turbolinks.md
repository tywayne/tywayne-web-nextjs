---
layout: post
title: 'Using Google Analytics with Turbolinks'
date: '2017-02-26T14:55:00.000Z'
categories: development
published: false
author: Ty Carlson
---

I recently wrote about a few [roadblocks and tips I found]({{ site.baseurl }}{% post_url 2017-02-24-tips-from-rebuilding-tywayne-com-on-jekyll %}) while rebuilding this site on
[Jekyll](https://jekyllrb.com). Another somewhat related issue I ran into, was how do I make sure
Google Analytics is getting page views sent when using [Turbolinks](https://github.com/turbolinks/turbolinks)?

### The Problem

We're all familiar with Google Analytics and how it works. You add a script provided by Google,
that puts a global `ga` object with methods and values that we can use to send tracking information
to Google. Included by default in the code provided by Google is a call to send a page view.

```javascript
ga('send', 'pageview');
```

This works great on a regular site, where each page/view is a new page load, which triggers this
function to be fired and we get data on the page view. However, Turbolinks doesn't actually trigger
a new page load. It makes a request and swaps out the relevant changes in the DOM. This makes for
faster appearing websites, but also adds some complexity when dealing with JavaScript that is
intended to run on page load.

### How do we fix it?

Luckily, Turbolinks emits several events during its lifecycle, letting you hook in where needed. You
can see a full listing of its events [here](https://github.com/turbolinks/turbolinks#full-list-of-events).

The important event here is `turbolinks:load` – on this event, we can trigger the `ga.send()` function manually like so:

```javascript
// CoffeeScript
document.addEventListener "turbolinks:load", (event) ->
    if typeof ga is 'function'
        ga 'send', 'pageview', location.pathname
```

It's important to note that I checked to make sure `ga` was actually available so we don't error out
early in the event that `ga` isn't available. And now that we're calling it manually, make sure to
go back and remove the line from the code Google provided so you don't get duplicates:

```javascript
// remove this line from the code Google provided
ga('send', 'pageview');
```

And that's it! This should correctly fire the `ga.send()` function on each page load even when
Turbolinks is running.

### Extra Resources

An extremely handy tool when working with Google Analytics has been the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=en) Chrome Extension. It logs debug info into the console for every event coming from GA.

---
