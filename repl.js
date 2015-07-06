'use strict';

(function(sandboxedEval) {
  var input = document.getElementById('input');
  var output = document.getElementById('output');

  function createRow(text, type, error) {
    appendRow(document.createTextNode(text), type, error);
  }

  function appendRow(content, type, error) {
    var row = document.createElement('li');
    row.classList.add(type);
    if (error) {
      row.classList.add('error');
    }
    if (content instanceof Array) {
      for (var element in content) {
        row.appendChild(content[element]);
      }
    } else {
      row.appendChild(content);
    }
    output.insertBefore(row, output.lastElementChild);
    document.body.scrollTop = document.body.scrollHeight;
  }

  function runAndShowResult(value) {
    createRow(value, 'input', false);

    var result, resultString, error = false;

    try {
      result = sandboxedEval(value);
      resultString = typeof result !== 'undefined'
        ? JSON.stringify(result, null, ' ')
          .replace(/\n/g, '')
          .replace(/\{\s*/g, '{')
          .replace(/\s*\}/g, '}')
        : result;
    } catch (e) {
      resultString = e;
      error = true;
    }

    createRow(resultString, 'output', error);
  }

  input.addEventListener('submit', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var inputValue = document.getElementById('inputValue');
    var value = inputValue.value;
    inputValue.value = '';

    runAndShowResult(value);
  });
}
(function(code) {return eval(code);}));
