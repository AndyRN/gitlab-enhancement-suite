DomainCheck(function () {
  if (window.location.href.indexOf("merge_requests") > -1) {
    // Count the number of diffs on the MR, and optionally click them to collapse each one.
    function diffs(click) {
      var count = 0;
      document
        .querySelectorAll(
          ".diff-files-holder .diff-file .file-title-flex-parent"
        )
        .forEach(function (elem) {
          var content = elem.parentNode.querySelector(".diff-content");
          if (content && content.style.display !== "none") {
            if (click) {
              elem.click();
            }
            count++;
          }
        });
      return count;
    }

    // Add the collapse all button to the existing controls.
    var addButton = setInterval(() => {
      var expandAll = document.querySelector(
        ".mr-version-menus-container .inline-parallel-buttons button"
      );
      if (expandAll) {
        var collapseAll = expandAll.cloneNode();
        collapseAll.style.display = null;
        collapseAll.textContent = "Collapse All";
        collapseAll.addEventListener("click", function () {
          diffs(true);
        });
        expandAll.insertAdjacentElement("afterend", collapseAll);
        clearInterval(addButton);
      }
    }, 1000);

    // Display the number of diffs on a merge request.
    setInterval(function () {
      chrome.runtime.sendMessage({
        action: "update_badge",
        badgeText: diffs().toString(),
      });
    }, 1000);
  }
});
