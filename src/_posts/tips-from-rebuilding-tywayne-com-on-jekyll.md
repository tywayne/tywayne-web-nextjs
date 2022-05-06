---
layout: post
title: 'Tips From Rebuilding tywayne.com on Jekyll'
date: '2017-02-24T14:55:00.000Z'
categories: jekyll
published: false
author: Ty Carlson
---

I recently rebuilt this website on [Jekyll](https://jekyllrb.com) – a static site
generator, built on Ruby, that uses Markdown/Liquid for templating. I wanted to share a few tips
based on issues I ran in to while building it. This isn't going to be a full walkthrough tutorial,
rather a heads up on various roadblocks I hit along the way.

### Creating a Custom Theme

The first hiccup I hit, or at least took a second to wrap my head around, was how themes work, and
what would be the best way to go about creating a custom theme for this site. By default, an initial
build of a Jekyll site comes with a Gem-based theme called Minima installed. The [docs](https://jekyllrb.com/docs/themes/)
show how to work with this theme, and even how to override specific files in the theme to customize
it, but this wasn't where I wanted to start. I wanted a skeleton, just the basic structure of files,
that I could edit as needed.

I did quickly find that Jekyll has a built in command to generate a new theme. This assumes that
you're creating a new gem-based theme, but it built the skeleton I wanted, and I could just remove
the gem configuration files that won't be needed.

```bash
$ jekyll new-theme my-theme-name
```

Once that is created, move the directories in the new theme into the root directory of your Jekyll
site. This should include the following:

```
├─ _includes
├─ _layouts
  ├── default.html
  ├── page.html
  └── post.html
├─ _sass
└─ assets
  └── main.scss
```

Once you have a theme structure in place, you should remove the default Minima theme from your
`_config.yml` file, so that it get loaded. To do this, simply open `_config.yml` and remove
`theme: minima`.

From there you can start building out your theme. Some things to note on this structure:

1. Everything inside of `/assets` will be placed in the `_site` folder during a build. This means
   that you should probably organize this however you'd like, with `/css`, `/js`, `/img`, etc folders.
   Additionally, any Sass (or CoffeeScript) files you include here will be compiled first and output as
   plain css/js.

2. You should use the `/assets/main.scss` file only as a list of includes from the `_sass` directory ( or installed vendor packages ).

### Utilizing values in your `_config.yml` file

This is pretty basic, and might be glaringly obvious to most, but it was something that I missed at
first, and can save some time/effort.

Any value that you put in to your `_config.yml` file can be accessed later in templates with a
Liquid tag.

```liquid
// in _config.yml
my_custom_key: 'value'

// in a template file
{% raw %}{{ site.my_custom_key }}{% endraw %}
```

This can be used as a global storage for any constant value. I personally stored my Google Analytics
ID, my CloudFront CDN URL, and a version number to append as a parameter to asset URLs for browser
cache busting. This way, in the event something needs changed, I have a single location to edit
variables, instead of having to hunt for everywhere I used them.

### Collections as Custom Post Types

Coming from the WordPress world, I was initially concerned with using a static site generated, as I
assumed there would only be structure for a single **Post** type for a blog. I was pleasantly
surprised not only to find that it was possible, but was incredibly easy to setup.

For this site, I have a [Book Reviews]({{ site.url }}/book-reviews/) section, that if I were in
WordPress, would have required creating a plugin and writing code to register/configure the post
type. Not too complex, but not completely painless either.

Registering a new Collection for my Book Reviews in Jekyll was as easy as adding this to your `_config.yml`:

```ruby
collections:
  book_reviews:
    output: true
    permalink: /book-reviews/:title/
```

Then create a directory in the root of the project with a name that matches the Collection you
created: `_book_reviews`. This folder now works just like your `_posts` folder, where each new file
is a new post.

And if you want to display an index of that collection, you can do so in any template, with a normal
loop:

```liquid
{% raw %}{% for review in site.book_reviews %}{% endraw %}
```

### Summary

That's it for now. I'm sure I'll run into more as I keep playing with it, and will share as well.
And please [feel free to tell me](mailto:tywayne@gmail.com) if any of this is categorically false,
or even just an antipattern. This is my first go at it :)

---

<!-- ``` javascript
document.addEventListener "turbolinks:load", (event) ->
    if typeof ga is 'function'
        ga 'send', 'pageview', location.pathname
``` -->
