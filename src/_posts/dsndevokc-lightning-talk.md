---
layout: post
title: 'DSN+DEV+OKC Lightning Talk'
date: '2017-06-12T14:55:00.000Z'
categories: development
published: true
author: Ty Carlson
---

I recently was asked to give a short lightning talk at a DSN+DEV+OKC, a local design and development
user group meetup. I chose to give a few tips (from a developer perspective) while building out a design
system in my first few months at [Datebox](https://www.getdatebox.com)

[You can download my slides](/dsndevokc-june-2017.pdf), but I also wanted to write out the basics of what I communicated in that
talk below.

---

My name is Ty Carlson, and I am the Lead Front End Developer at Datebox.
Datebox is a local startup, providing resources for couples to strengthen their relationship through
a fun, simple, date night delivered every month.

I want to share a little bit tonight about a project I've been working on since I joined this team
in March. As with most growing web products, we are fighting against entropy. Things quickly stray
from convention and become messy and difficult to manage.

Creating a design system can reduce entropy. Use whatever word you want: design system, pattern
library, styleguide, but ultimately it is a collection of visual components, documentation of
writing style, code conventions use across your products

Here are a few tips from problems that I encountered/solved when building out a designs system:

---

#### Remember that a design system should be dynamic

Your design system is never "done". The first thing you should build is a process for
adding/editing/removing/etc. You will constantly be encountering new features or UI that need new
components. Allow for changes.

Your design system is its own product. Prioritize it or it will die or become unusable. Schedule
sprint tasks to work on it, or even give it it's own dev cycles. It should be it's own git repo, and
make it portable: gem/npm/whatever. Use semantic versioning so you can conditionally push changes
to your products that use it.

---

#### Control your colors

Every color ever used should be pre-defined.
If you find yourself dropping in a random hex value, stop.
I see a lot of code where people define colors in one-off variables,

Recently I've moved to using a single source of truth for my colors in a Sass map ( Sass's concept
of a collection of key/value pairs). Use this to build a collection of your colors, then build
a function to grab hex values from your predefined list. This keeps everything in one place, and
forces you to think about whether adding that new color is really needed.

This also allows you to dynamically build color variants for your components, and when a new color
is added to the main map, it generates new component colors as well.

---

#### Separate your spacing

The second you bake vertical spacing into a component, your designer will screw you over.
We might style this heading like so, and the next feature will be some sort of sub-heading and blows away your defaults.
Move all vertical spacing into utility classes.
Tachyons - I haven't completely jumped ship into using only utility classes, but can definitely see their value in some places.

---

#### Give your teammates the best possible tools to do their job

For your fellow developers: Document all of this code for your fellow developers. CSS is way more
complex now with pre-processors.

For your fellow designers: Provide real production ready markup. Not all designers should code, but that
doesn't mean we shouldn't make it as easy as possible for them to start if they want to.

---
