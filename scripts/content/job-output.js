domainCheck(() => {
  if (window.location.href.indexOf("jobs") > -1) {
    // Add the copy job output button to the existing controls.
    var addButton = setInterval(() => {
      var showCompleteRaw = document.querySelector(
        ".build-log-container .controllers a"
      );

      if (showCompleteRaw) {
        var copyJobOutput = showCompleteRaw.cloneNode(true);
        copyJobOutput.style.marginRight = "8px";
        copyJobOutput.setAttribute("title", "Copy job output");
        copyJobOutput.removeAttribute("href");
        copyJobOutput.addEventListener("click", () => {
          var jobOutput = "";
          document.querySelectorAll(".job-log .log-line").forEach((elem) => {
            jobOutput =
              jobOutput + elem.querySelector("span").textContent + "\r\n";
          });
          navigator.clipboard.writeText(jobOutput);
        });

        showCompleteRaw.insertAdjacentElement("beforebegin", copyJobOutput);

        clearInterval(addButton);
      }
    }, 1000);
  }
});
