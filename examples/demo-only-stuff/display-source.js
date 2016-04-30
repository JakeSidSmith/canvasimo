'use strict';

(function () {

  var scripts = document.getElementsByTagName('script');

  var leadingAndTrailingSpaces = /(^[\s\r\n]*)|([\s\r\n]*$)/g;

  function removeIndentation (code) {
    var leadingSpaces = /^[ \t]*(?=\S)/gm.exec(code);

    if (!leadingSpaces) {
      return code;
    }

    var matchXLeadingSpaces = new RegExp('^' + leadingSpaces, 'g');
    var lines = code.split(/[\n\r]/g);

    for (var i = 0; i < lines.length; i += 1) {
      lines[i] = lines[i].replace(matchXLeadingSpaces, '');
    }

    return lines.join('\n').replace(leadingAndTrailingSpaces, '');
  }

  function removeFirstLine (code) {
    return code.replace(/^.*[\n\r]+/, '');
  }

  for (var i = 0; i < scripts.length; i += 1) {
    var script = scripts[i];

    if (!script.getAttribute('do-not-document')) {
      var pre = document.createElement('pre');
      pre.innerHTML = removeFirstLine(removeIndentation(script.innerHTML));

      script.parentNode.insertBefore(pre, script);
    }
  }

})();
