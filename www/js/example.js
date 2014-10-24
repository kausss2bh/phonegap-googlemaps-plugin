/**
 * For debug purpose, catch JavaScript errors.
 */
window.onerror = function(message, file, line) {
  var error = [];
  error.push('---[error]');
  if (typeof message == "object") {
    var keys = Object.keys(message);
    keys.forEach(function(key) {
      error.push('[' + key + '] ' + message[key]);
    });
  } else {
    error.push(line + ' at ' + file);
    error.push(message);
  }
  alert(error.join("\n"));
};

/**
 * Start from here
 */
var map = null;
$(document).on("deviceready", function() {
  
  $("li[action]").click(function() {
    $("#menulist").panel("close");
    
    var action = $(this).attr("action");
    loadPage(action);
  });
  
  /**
   * The side menu overlays above the map, but it's not the children of the map div.
   * In this case, you must call map.setClickable(false) to be able to click the side menu.
   */
  function onSideMenuClose() {
    if (map) {
      map.setClickable(true);
    }
  }
  
  function onSideMenuOpen() {
    if (map) {
      map.setClickable(false);
    }
  }
  
  $("#menulist").panel({
    "close": onSideMenuClose,
    "open": onSideMenuOpen
  });
  
  loadPage("test_page1");
});

/**
 * Change the embed page view.
 * @param {Object} map
 * @param {String} pageName
 */
function loadPage(pageName) {
  $(document).trigger("pageLeave");
  $.get("./pages/" + pageName + ".html", function(html) {
    $("#container").html("");
    $("#container").html(html);
    $.mobile.activePage.trigger("create");
    
    setTimeout(function() {
      $(document).trigger("pageLoad");
    }, 1000);
  });
}