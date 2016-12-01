/* Rhetoric proof of concept / quick hacked up example for presentation
 * 
 * Justin Roth
 */

/* On page load, show transcript and analysis */
$( document ).ready(function() {
    $('#transcript').show();
    $('#analysis').show();
});

/* Show analysis section */
function displayAnalysis() {
   $('#analysis').show();
}

var keywords = [];
var categories = [];
var people = [];

/* Push keywords to array */
function pushWords(array, dest) {
  for (var i = 0; i < array.length; i++) {
        dest.push(array[i]);
  }
}

/* Push categories to array */
function pushCategories(array, dest) {
  for (var i = 0; i < array.length; i++) {
      console.log("object");
       console.log(array[i]);
      console.log("pushing " + array[i].label)
      dest.push(array[i].label);
  }
}

/* Parse JSON entity results from Aylien API  */
function parseEntities(results) {
    var endpoint = results[0].endpoint;
    var entities = results[0].result.entities;

    var keywordArray = entities.keyword;
    var personArray = entities.person;

    console.log(endpoint);
     console.log(entities);
      console.log(keywordArray);
      console.log(personArray);

      pushWords(keywordArray, keywords);
      if(personArray){
      pushWords(personArray, people);
      }
      // create keyword list 
      $('#analysis').show();
      HTMLKeywordList();
       HTMLPeopleList();
}

/* Parse JSON category results from Aylien API  */
function parseCategories(results) {

    console.log(results);
    var endpoint = results[2].endpoint;
    var  categoryArray= results[2].result.categories;

    console.log(endpoint);
    console.log("CAT ARRAy");
    console.log(categoryArray);

     pushCategories(categoryArray, categories);
      HTMLCategoryList();

}

/* Returns true if object contained in array */
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

/* Return unique objects in an array */
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

/* Return number of unique objects in array */
function getUnique(original) {
  var duplicates = original;
  var uniques = duplicates.unique(); 
  console.log(uniques);
  return uniques.length;// result = [1,3,4,2,8]
}

/* Count frequency of word in array */
function countFreq(word, arr) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (word == arr[i]) {
      count++;
    }
  }
  return count;
}

/* Renders Categories to the DOM */
function  HTMLCategoryList() {
     var array = categories;
      var wrap = "<div class='col-lg-12'>";
       $('#categories').append(wrap);
        var open = "<div>";
  var items = '';
  var sect = "<div class='col-lg-3'>"; 
    var sectClose = "<div>";     
  var close = "</div></div>"


  for (var i = 0; i < array.length; i++) {

      var freq = countFreq(array[i], array);
$('#numcategories').text(getUnique(categories));
      // IF WE'VE SEEN IT BEFORE, INCREMENT COUNT 
      if (freq > 1)  {
        $('#' + array[i]).text(freq);
        var fontSize = parseInt($("body").css("font-size"));
        fontSize = fontSize + 1 + "px";
        $('#' + array[i] + " txt").css({'font-size':fontSize});
        break;
      }

      // add list iten div
      items+= "<li class='list-group-item' id='" + array[i] + " txt'>" + array[i] + "<span id='" + array[i] + "' class='badge'></span>" + " </li>";
    
  }
  $('#categories').append(items + close);
}

/* Renders People to the DOM */
function HTMLPeopleList() {
  var array = people;
      var wrap = "<div class='col-lg-12'>";
       $('#people').append(wrap);
        var open = "<div>";
  var items = '';
  var sect = "<div class='col-lg-3'>"; 
    var sectClose = "<div>";     
  var close = "</div></div>"


  for (var i = 0; i < array.length; i++) {

      var freq = countFreq(array[i], array);

      // IF WE'VE SEEN IT BEFORE, INCREMENT COUNT 
      if (freq > 1)  {
        $('#' + array[i]).text(freq);
        var fontSize = parseInt($("body").css("font-size"));
        fontSize = fontSize + 1 + "px";
        $('#' + array[i] + " txt").css({'font-size':fontSize});
        break;
      }

      // add list iten div
      items+= "<h4 " + "id='" + array[i] + " txt'>" + array[i] + "<span id='" + array[i] + "' class='badge'></span>" + " </h4>";
    
  }
  $('#people').append(items + close);
}

/* Populates HTML keyword list from array */
function HTMLKeywordList() {

  var array = keywords;
  var wrap = "<div class='col-lg-12'>";
  
 $('#keywords').append(wrap);
 
  var open = "<ul class='list-group'>";
  var items = '';
  var sect = "<div class='col-lg-3'>"; 
    var sectClose = "<div>";     
  var close = "</ul></div>"

  $('#numkeywords').text(getUnique(keywords));
  for (var i = 0; i < array.length; i++) {

      console.log("freq:");
      var freq = countFreq(array[i], array);
      console.log(freq);
      // IF WE'VE SEEN IT BEFORE, INCREMENT COUNT 
      if (freq > 1)  {
        $('#' + array[i]).text(freq);
        var fontSize = parseInt($("body").css("font-size"));
        fontSize = fontSize + 1 + "px";
        $('#' + array[i] + " txt").css({'font-size':fontSize});
        break;
      }

      // add list iten div
      items+= "<li class='list-group-item' + id='" + array[i] + " txt'>" + array[i] + "<span id='" + array[i] + "' class='badge'></span>" + " </li>";
    
  }
  $('#analysis').append(items + close);
}

/* Send POST request with transcript for analysis  */
postText = function(string) {
    var http = new XMLHttpRequest();

    var data = {
        txt: string
    }

    http.open("POST", "/submit.json");

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
    //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
          var res = JSON.parse(http.responseText);
          parseEntities(res.results);
          parseCategories(res.results);
      }
    }

    console.log("Sending  object" + JSON.stringify(data));
    http.send(JSON.stringify({data}));
}

/* Auto-activate speech recognition */
if ('webkitSpeechRecognition' in window) {
  var recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  var full_transcript = '';

    // start callback
    recognition.onstart = function() {
      console.log("speech recognition begun");
    }
    // error callback
    recognition.onerror = function(event) {
      console.log(event);
    }
    // end callback
    recognition.onend = function() {
      console.log("speech recognition ended");
    }

    // result callback
   recognition.onresult = function( event ) {
    var final_transcript = '';
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
       if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
      final_transcript = capitalize(final_transcript);
      var l = linebreak(interim_transcript);
    if (final_transcript) {
      full_transcript+= final_transcript;
      $('#transcript').show();
      postText(full_transcript);
      $('#final' ).text(full_transcript);
    } else {
      $('#interim' ).text(l);
    }
      
  };
  recognition.start();
}

function startAnalysis() {
    recognition.start();
}

function stopAnalysis() {
    recognition.stop();
}

function resetAnalysis() {
    recognition.stop();

    $('#final' ).text('');
    $('#interim' ).text('');
    $('#keywords').text('');
     $('#categories').text('');
}

/* Formatting functions */
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
