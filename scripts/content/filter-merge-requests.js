DomainCheck(function () {
  if (window.location.href.indexOf("merge_requests") > -1) {
    // Add the merge request filters to the existing controls.
    var addFilters = setInterval(() => {
      var navControls = document.querySelector(".top-area .nav-controls");
      if (navControls) {
        // Copy an existing control for consistency
        var editMergeRequests = navControls.querySelector("button");
        if (editMergeRequests) {
          var firstControl = navControls.firstElementChild;
          // Add the toggle draft filter
          var toggleDraft = editMergeRequests.cloneNode(true);
          toggleDraft.setAttribute("title", "Toggle draft");
          toggleDraft.textContent = "Toggle Draft";
          toggleDraft.addEventListener("click", function () {
            toggleFilter("draft=no", "draft=yes");
          });
          firstControl.insertAdjacentElement("beforebegin", toggleDraft);
          // Add the toggle automated filter
          var toggleAutomated = editMergeRequests.cloneNode(true);
          toggleAutomated.setAttribute("title", "Toggle automated");
          toggleAutomated.textContent = "Toggle Automated";
          toggleAutomated.addEventListener("click", function () {
            toggleFilter(
              "not[label_name][]=automated",
              "label_name[]=automated"
            );
          });
          firstControl.insertAdjacentElement("beforebegin", toggleAutomated);
          // Add the toggle assigned filter
          var toggleAssigned = editMergeRequests.cloneNode(true);
          toggleAssigned.setAttribute("title", "Toggle assigned");
          toggleAssigned.textContent = "Toggle Assigned";
          toggleAssigned.addEventListener("click", function () {
            toggleFilter("assignee_id=None", "assignee_id=Any");
          });
          firstControl.insertAdjacentElement("beforebegin", toggleAssigned);
          clearInterval(addFilters);
        }
      }
    }, 100);
  }
});

function toggleFilter(negativeFilter, positiveFilter) {
  if (!window.location.search) {
    window.location.search = insert(
      window.location.search,
      null,
      "?" + negativeFilter
    );
  } else {
    var negativeIndex = window.location.search.indexOf(negativeFilter);
    var positiveIndex = window.location.search.indexOf(positiveFilter);
    if (negativeIndex !== -1) {
      window.location.search = insert(
        window.location.search,
        negativeIndex,
        positiveFilter,
        negativeFilter.length
      );
    } else if (positiveIndex !== -1) {
      window.location.search = insert(
        window.location.search,
        positiveIndex,
        negativeFilter,
        positiveFilter.length
      );
    } else {
      window.location.search = insert(
        window.location.search,
        null,
        "&" + negativeFilter
      );
    }
  }
}

function insert(str, index, value, replace) {
  if (!index) {
    index = str.length;
  }
  return (
    str.substr(0, index) + value + str.substr(replace ? index + replace : index)
  );
}
