---
title: "Research"
permalink: /research/
author_profile: true
description: "Research work and publications"
show_title: true

# Edit the content below to update the Research page.
# Add a project by copying one complete list item beginning with "- title".
# The citation value must match a key in _data/bibliography.yml.
research_intro: >-
  I am particularly interested in high-energy astrophysical phenomena such as
  tidal disruption events. I also develop symbolic and numerical tools for the
  study of general relativity and strong-field gravity.

research_projects:
  - title: "DPhil research"
    summary: "Perturbation theory of the Milky Way."
    details:
      - >-
        My DPhil will focus on theoretical galactic dynamics. This project is
        supervised by [Prof J Magorrian](https://www.physics.ox.ac.uk/our-people/magorrian)
        and is supported by the Jardine Foundation Postgraduate Scholarship. I
        will be working on the dynamics of stars in our local galaxy using
        perturbation theory.

  - title: "Role of orbital inclination in loss cones"
    summary: "Inclination diffusion cannot be ignored."
    details:
      - >-
        Stars in a galaxy sometimes get killed by a supermassive black hole at the centre.
        Whether a star is swallowed (captured) or torn apart (disrupted) by a spinning black hole depends on the orientation of its orbit because the spin creates a preferred direction.
        I showed that, when calculating the rates of such extreme events, we have to account for changes in orbital orientation due to stochastic stellar encounters.
    citation: "Xin2026"

  - title: "TDE rates around spinning black holes"
    summary: "Two-dimensional loss-cone theory for TDEs."
    details:
      - >-
        As my MMathPhys dissertation, we developed a general analytic framework
        for tidal disruption event (TDE) rates in isotropic galaxies hosting
        spinning Kerr black holes. We formulated a loss cone theory that tracks
        the simultaneous diffusion of stars in both angular momentum magnitude
        and orientation. It was shown that a spinning black hole does not
        significantly change the overall TDE rate, but strongly affects the
        distribution of the orbital inclinations of disrupted stars.
      - >-
        This work is supervised by [Prof J Binney](https://www.physics.ox.ac.uk/our-people/binney).
        The project was conceived during the Dyson Fellows programme under Prof
        Binney and [Dr Y B Ginat](https://www.physics.ox.ac.uk/our-people/ginat),
        where we learn about frontier research in galactic dynamics.
    citation: "Xin2026dissertation"
    figure:
      src: "/images/research/tde_rates_vs_mass_python.png"
      alt: "Predicted tidal disruption event rates as a function of mass."
      caption: "Rates of TDE in a galaxy as a function of BH mass for different spins."

  - title: "3-body dynamics and Heggie's law"
    summary: "Extension of Heggie's law to eccentric binaries."
    details:
      - >-
        In the summer of 2025, I worked with [Dr M Rozner](https://morozner.wixsite.com/mysite)
        under a summer internship at Institute of Astronomy, University of
        Cambridge. We generalised Heggie's law to binaries with non-zero
        eccentricity and used numerical 3-body simulations to verify the
        theoretical predictions.
    citation: "Xin2025a"
    figure:
      src: "/images/research/DE_vs_ep_binney_presentation.png"
      alt: "Comparison of theoretical and simulated energy change trends for eccentric binaries."
      caption: "Diffusion coefficient of binding energy for different binary eccentricities."

  - title: "Relativistic tidal forces"
    summary: "General analytic tidal tensor framework."
    details:
      - >-
        In the summer of 2024, I worked with [Dr A Mummery](https://www.ias.edu/scholars/andrew-mummery)
        under a summer internship at Oxford Theoretical Physics. We developed a
        general, analytic framework for computing the local tidal tensor along a
        time-like geodesic in any stationary, axisymmetric spacetime.
    citation: "Xin2025"
    figure:
      src: "/images/research/eigensystem_a_0.50_Q_0.75_lambda_0.50_pro.png"
      alt: "Eigenvalue and eigendirection structure of the relativistic tidal tensor in a representative spacetime."
      caption: "Evolution of the eigenvalues of the local tidal tensor along a Kerr-Newman geodesic."
---

{% include base_path %}

<p class="research-intro">{{ page.research_intro }}</p>

{% include research-projects.html projects=page.research_projects %}
