---
layout: base.njk
title: Things to Remember
tags: posts
---

# Things to Remember

## Reading List

- "Refactoring" by Martin Fowler

<ul>
{% for book in collections.data.readingList %}
  <li><a href="{{book.url}}">{{ book.data.title }}</a></li>
{% endfor %}
</ul>
