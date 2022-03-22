domainCheck(() => {
  if (window.location.href.indexOf("merge_requests") > -1) {
    // Count the number of diffs on the MR, and optionally click them to collapse each one.
    // Provide a fileExtension to only target those files with this function.
    function diffs(click, fileExtension) {
      var count = 0;
      document
        .querySelectorAll(
          ".diff-files-holder .diff-file .file-title-flex-parent"
        )
        .forEach((elem) => {
          if (
            fileExtension == null ||
            elem.parentNode
              .querySelector(".file-header-content .file-title-name")
              .title.endsWith(fileExtension)
          ) {
            var content = elem.parentNode.querySelector(".diff-content");
            if (content && content.style.display !== "none") {
              if (click) {
                elem.click();
              }
              count++;
            }
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
        if (diffs(false, ".xml") > 0) {
          var collapseAllXml = expandAll.cloneNode();
          collapseAllXml.style.display = null;
          collapseAllXml.textContent = "Collapse all XML";
          collapseAllXml.addEventListener("click", () => {
            var count = diffs(true, ".xml");
            var keepCollapsing = setInterval(() => {
              if (count > 0) {
                count = diffs(true, ".xml");
              } else {
                clearInterval(keepCollapsing);
              }
            }, 100);
          });

          expandAll.insertAdjacentElement("afterend", collapseAllXml);
        }

        var collapseAll = expandAll.cloneNode();
        collapseAll.style.display = null;
        collapseAll.textContent = "Collapse all";
        collapseAll.addEventListener("click", () => {
          var count = diffs(true);
          var keepCollapsing = setInterval(() => {
            if (count > 0) {
              count = diffs(true);
            } else {
              clearInterval(keepCollapsing);
            }
          }, 100);
        });

        expandAll.insertAdjacentElement("afterend", collapseAll);

        clearInterval(addButton);
      }
    }, 1000);

    // Display the number of diffs on a merge request.
    setInterval(() => {
      chrome.runtime.sendMessage({
        action: "update_badge",
        badgeText: diffs().toString(),
      });
    }, 1000);
  }
});
