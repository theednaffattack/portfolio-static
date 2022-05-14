---
layout: base.njk
title: Projects
---

# Hmmmmm.... Projects

<ul>
{% for post in collections.data.projects %}
  <li><a href="{{post.data.ghProfile}}">{{ post.data.name }}</a></li>
{% endfor %}
</ul>
