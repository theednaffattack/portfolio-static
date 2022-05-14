---
layout: base.njk
title: Blog
count: 11
---

<h1>{{title}}</h1>

<ul>
{% for post in collections.posts %}
  <li><a href="{{post.url}}">{{ post.data.title }}</a></li>
{% endfor %}
</ul>
