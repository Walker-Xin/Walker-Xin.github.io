(function(){
  function rev(s){ return (s || '').split('').reverse().join(''); }

  function convertTextSpans(){
    var nodes = document.querySelectorAll('.email-convert');
    for (var i = 0; i < nodes.length; i++){
      var el = nodes[i];
      var u = el.getAttribute('data-u');
      var d = el.getAttribute('data-d');
      if (!u || !d) continue;
      var email = rev(u) + '@' + rev(d);
      el.textContent = email;
    }
  }

  function convertLinks(){
    var links = document.querySelectorAll('.email-link-convert');
    for (var i = 0; i < links.length; i++){
      var a = links[i];
      if (a.getAttribute('href') && a.getAttribute('href').indexOf('mailto:') === 0) continue;
      var u = a.getAttribute('data-u');
      var d = a.getAttribute('data-d');
      if (!u || !d) continue;
      var email = rev(u) + '@' + rev(d);
      a.setAttribute('href', 'mailto:' + email);
    }
  }

  function run(){
    convertTextSpans();
    convertLinks();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();