DomainCheck(function () {
  if (window.location.href.indexOf("jobs") > -1) {
    // Add the copy job output button to the existing controls.
    var addButton = setInterval(() => {
      var showCompleteRaw = document.querySelector(
        ".build-trace-container .controllers .btn"
      );
      if (showCompleteRaw) {
        var copyJobOutput = showCompleteRaw.cloneNode(true);
        copyJobOutput.style.marginRight = "8px";
        copyJobOutput.setAttribute("title", "Copy job output");
        copyJobOutput.removeAttribute("href");
        copyJobOutput.addEventListener("click", function () {
          var jobOutput = "";
          document
            .querySelectorAll(".job-log .log-line")
            .forEach(function (elem) {
              jobOutput =
                jobOutput + elem.querySelector("span").textContent + "\r\n";
            });
          var tempInput = document.createElement("textarea");
          tempInput.textContent = jobOutput;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        });
        showCompleteRaw.insertAdjacentElement("beforebegin", copyJobOutput);
        clearInterval(addButton);
      }
    }, 1000);
  }
});
