/**
 * @author      Kim-Christian Meyer
 * @copyright   2016 Kim-Christian Meyer
 * @license     GPL-3.0+
 */

;"use strict";


/**
 * This class holds a string replacement with a given probability for this
 * replacement to happen.
 *
 * @param {string} search      The string to search for.
 * @param {string} replace     The search string will be replaced with this string.
 * @param {double} probability Probability of this string replacement to happen
 *                             (0 = never, 1 = always).
 */
function Replacement(search, replace, probability) {
  this.search = search;
  this.replace = replace;
  this.probability = probability;
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomBoolean(probability) {
  return Math.random() >= 1.0 - probability;
}


/**
 * This function does a simple string replacement, if getRandomBoolean() returns
 * true.
 *
 * @todo Is there a better string replace algorithm?
 * @see http://stackoverflow.com/questions/2473774/javascript-replace-with-callback-performance-question
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 */
function replaceWithProbability(search, replace, probability, subject) {
  var parts = subject.split(search);
  var output = '';

  for (var i = 0; i < parts.length; i++) {
    if (i !== parts.length - 1) {
      if (getRandomBoolean(probability) === true) {
        output += parts[i] + replace;
      }
      else {
        output += parts[i] + search;
      }
    }
    else {
      output += parts[i];
    }
  }
  return output;
}


/**
 * The real translation magic.
 */
function translate(text) {
  var translation = [

    // Zahlen
    new Replacement(' eine ', ' 1 ', 1),
    new Replacement(' ein ', ' 1 ', 1),
    new Replacement(' zwei ', '2 ', 1),
    new Replacement(' drei ', '3 ', 1),
    new Replacement(' vier ', '4 ', 1),
    new Replacement(' fünf ', '5 ', 1),
    new Replacement(' sechs ', '6 ', 1),
    new Replacement(' sieben ', '6 ', 1),
    new Replacement(' acht ', '6 ', 1),
    new Replacement(' neun ', '6 ', 1),
    new Replacement(' zehn ', '6 ', 1),
    new Replacement('Eine ', ' 1 ', 1),
    new Replacement('Ein ', ' 1 ', 1),
    new Replacement('Zwei ', '2 ', 1),
    new Replacement('Drei ', '3 ', 1),
    new Replacement('Vier ', '4 ', 1),
    new Replacement('Fünf ', '5 ', 1),
    new Replacement('Sechs ', '6 ', 1),
    new Replacement('Sieben ', '6 ', 1),
    new Replacement('Acht ', '6 ', 1),
    new Replacement('Neun ', '6 ', 1),
    new Replacement('Zehn ', '6 ', 1),

    // Umlaute
    new Replacement('ä', 'e', 0.5),
    new Replacement('ö', 'öh', 0.5),
    new Replacement('ü', 'üh', 0.5),

    // Buchstaben ohne Satzkontext
    new Replacement('ins', 'in', 0.5),
    new Replacement('sisch', 'schis', 0.5),
    new Replacement('stisch', 'schtis', 0.5),
    new Replacement('ar', 'ahr', 0.5),
    new Replacement('ck', 'k', 0.5),
    new Replacement('en', 'n', 0.2),
    new Replacement('ft', 'f', 0.5),
    new Replacement('hn', 'n', 0.5),
    new Replacement('m', 'n', 0.8),  // @todo Nur innerhalb eines Wortes erlauben
    new Replacement('n', 'm', 0.8),  // @todo Nur innerhalb eines Wortes erlauben
    new Replacement('ntsch', 'nsch', 0.5),
    new Replacement('ph', 'f', 0.5),
    new Replacement('sch', 'shc', 0.5),
    new Replacement('sh', 'sch', 0.5),
    new Replacement('st', 's', 0.5),
    new Replacement('ß', 's', 0.5),
    new Replacement('tt', 'td', 0.5),
    new Replacement('th', 'tt', 0.5),
    new Replacement('tzt', 'ts', 0.5),
    new Replacement('tz', 'ts', 0.5),
    new Replacement('ur', 'uhr', 0.5),
    new Replacement('v', 'f', 0.5),
    new Replacement('v', 'w', 0.5),
    new Replacement(',', '', 1),

    // Buchstaben mit Satzkontext
    new Replacement('seid ', 'seit ', 0.5),
    new Replacement('al ', 'ahl ', 0.5),
    new Replacement('aber', 'aba', 0.5),
    new Replacement(' an ', ' in ', 0.5),
    new Replacement('auen ', 'aun ', 0.5),
    // new Replacement('e ', ' ', 0.5),
    new Replacement('on ', 'ong ', 0.8),
    // new Replacement('t ', ' ', 0.5), nur nach Konsonanten?
    new Replacement('y ', 'i ', 0.5),
    new Replacement('chnet ', 'chnen ', 0.3),
    new Replacement('chnen ', 'chnet ', 0.3)
  ];

  for (var i = 0; i < translation.length; i++) {
    text = replaceWithProbability(translation[i].search, translation[i].replace, translation[i].probability, text);
  }

  // @todo Wörter ab und zu groß schreiben
  // @todo Doppelter Buchstabe wird zu einem einfachen Buchstaben

  return text;
}


// Init
document.getElementById('translate').addEventListener('click', function(e) {
  var input,
      output;

  e.preventDefault();
  input = document.getElementById('input').value;
  output = translate(input);
  document.getElementById('output').value = output;
});
