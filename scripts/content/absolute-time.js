DomainCheck(function () {
  // Display the absolute time instead of the relative time.
  function fixTime() {
    document.querySelectorAll("time").forEach(function (elem) {
      var absoluteTime = "";
      if (elem.getAttribute("title")) {
        absoluteTime = elem.getAttribute("title");
      }
      if (elem.getAttribute("data-original-title")) {
        absoluteTime = elem.getAttribute("data-original-title");
      }
      elem.textContent = absoluteTime.replace(/ G.*/, "");
    });
  }
  fixTime();
  setInterval(fixTime, 1000);
});
