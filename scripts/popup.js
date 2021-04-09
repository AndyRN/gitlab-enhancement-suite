const domainList = document.querySelector("#domain-list");
const newDomain = document.querySelector("#new-domain");

// Load the domains for the user.
function LoadDomainList() {
  chrome.storage.local.get("domains", function (result) {
    if (result.domains !== undefined) {
      domainList.textContent = "";
      result.domains.forEach((domain) => {
        AddToDomainList(domain);
      });
    }
  });
}

// Add a domain to the list.
function AddToDomainList(domain) {
  var domainName = document.createElement("span");
  domainName.textContent = domain;
  var deleteButton = document.createElement("img");
  deleteButton.src = "images/cross_red.png";
  deleteButton.className = "delete-domain";
  deleteButton.addEventListener("click", function () {
    chrome.storage.local.get("domains", function (result) {
      if (result.domains !== undefined) {
        const index = result.domains.indexOf(domain);
        if (index > -1) {
          result.domains.splice(index, 1);
          chrome.storage.local.set({ domains: result.domains }, function () {
            LoadDomainList();
          });
        }
      }
    });
  });
  var div = document.createElement("div");
  div.className = "flex";
  div.appendChild(domainName);
  div.appendChild(deleteButton);
  var listEntry = document.createElement("li");
  listEntry.appendChild(div);
  domainList.appendChild(listEntry);
}

// Save a domain for the user.
function SaveDomain() {
  if (newDomain.value.length > 0) {
    chrome.storage.local.get("domains", function (result) {
      if (result.domains === undefined) {
        result.domains = [];
      }
      result.domains.push(newDomain.value);
      chrome.storage.local.set({ domains: result.domains }, function () {
        newDomain.value = "";
        LoadDomainList();
      });
    });
  }
}

document.querySelector("#add-domain").addEventListener("click", SaveDomain);
newDomain.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    SaveDomain();
  }
});

LoadDomainList();
