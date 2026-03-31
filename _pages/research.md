---
# layout: archive
title: "Research"
permalink: /research/
author_profile: true
description: "Research work and publications"
show_title: false
---
<!-- 
{% if site.author.googlescholar %}
You can also find my articles on [Google Scholar]({{ site.author.googlescholar }}).
{% endif %}

{% include base_path %}

## Research interests -->

I am particularly interested in high-energy astrophysical phenomena such as tidal disruption events. I also develop symbolic and numerical tools for the study of general relativity and strong-field gravity.

In the summer of 2024, I worked with [Dr. A. Mummery](https://www.ias.edu/scholars/andrew-mummery) under a summer internship at Oxford Theoretical Physics. We developed a general, analytic framework for computing the local tidal tensor along a time-like geodesic in any stationary, axisymmetric spacetime. This work has been accepted by [*Physical Review D*](https://doi.org/10.1103/xdm3-48nb) and can be accessed on arXiv: [2511.21499](https://arxiv.org/abs/2511.21499)

In the summer of 2025, I worked with [Dr. M. Rozner](https://morozner.wixsite.com/mysite) under a summer internship at Institue of Astronomy, University of Cambridge. We generalised Heggie's law to binaries with non-zero eccentricity and used numerical 3-body simulations to verify the theoretical predictions.

I am now working on my Master's dissertation, where I apply our results in relativistic tidal forces in the context of stellar dynamics to predict rates of tidal disruption events in a galaxy. This work is supervised by [Prof. J. Binney](https://www.physics.ox.ac.uk/our-people/binney) and [Dr. Y. B. Ginat](https://www.physics.ox.ac.uk/our-people/ginat) under the Dyson Fellows programme, where we learn about frontier research in galactic dynamics.

<!-- ## Publications -->

<!-- Renders publication entries from the _publications collection. -->
{% if site.publication_category %}
{% for category in site.publication_category %}
{% assign title_shown = false %}
{% for post in site.publications reversed %}
{% if post.category != category[0] %}
{% continue %}
{% endif %}
{% unless title_shown %}

### {{ category[1].title }}

{% assign title_shown = true %}
{% endunless %}
{% include archive-single.html %}
{% endfor %}
{% endfor %}
{% else %}
{% for post in site.publications reversed %}
{% include archive-single.html %}
{% endfor %}
{% endif %}
