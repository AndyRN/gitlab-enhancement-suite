domainCheck(() => {
  if (window.location.href.indexOf("jobs") > -1) {
    // Add the job filters to the CI table.
    var addFilters = setInterval(() => {
      var ciTable = document.querySelector(".ci-table tbody");

      if (ciTable) {
        ciTable.querySelectorAll("tr").forEach((row) => {
          var job = row.querySelectorAll("td")[4];
          job.setAttribute("title", "Filter for this job");
          job.addEventListener("click", (event) => {
            document
              .querySelector(".ci-table tbody")
              .querySelectorAll("tr")
              .forEach((filterRow) => {
                var filterJob = filterRow.querySelectorAll("td")[4];
                if (filterJob.innerHTML !== event.target.innerHTML) {
                  filterRow.style.display = "none";
                }
              });
          });
        });

        clearInterval(addFilters);
      }
    }, 1000);
  }
});
