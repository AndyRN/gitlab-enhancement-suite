domainCheck(() => {
  if (window.location.href.indexOf("issues") > -1) {
    // Add the issue filters to the existing controls.
    var addFilters = setInterval(() => {
      var navControls = document.querySelector(".top-area .nav-controls");
      if (navControls) {
        // Copy an existing control for consistency
        var editIssues = navControls.querySelector("button");
        if (editIssues) {
          var firstControl = navControls.firstElementChild;

          // Add the toggle assigned filter
          var toggleAssigned = editIssues.cloneNode(true);
          toggleAssigned.setAttribute("title", "Toggle assigned");
          toggleAssigned.textContent = "Toggle Assigned";
          toggleAssigned.addEventListener("click", () => {
            toggleFilter("assignee_id=None", "assignee_id=Any");
          });

          firstControl.insertAdjacentElement("beforebegin", toggleAssigned);

          clearInterval(addFilters);
        }
      }
    }, 100);
  }
});
