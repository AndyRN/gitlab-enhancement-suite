const domainList = document.querySelector("#domain-list");
const newDomain = document.querySelector("#new-domain");

// Load the domains for the user.
function loadDomainList() {
  chrome.storage.local.get("domains", (result) => {
    if (result.domains !== undefined) {
      domainList.textContent = "";
      result.domains.forEach((domain) => {
        addToDomainList(domain);
      });
    }
  });
}

// Add a domain to the list.
function addToDomainList(domain) {
  var domainName = document.createElement("span");
  domainName.textContent = domain;
  var deleteButton = document.createElement("img");
  deleteButton.src = "images/cross_red.png";
  deleteButton.className = "delete-domain";
  deleteButton.addEventListener("click", () => {
    chrome.storage.local.get("domains", (result) => {
      if (result.domains !== undefined) {
        const index = result.domains.indexOf(domain);
        if (index > -1) {
          result.domains.splice(index, 1);
          chrome.storage.local.set({ domains: result.domains }, () => {
            loadDomainList();
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
function saveDomain() {
  if (newDomain.value.length > 0) {
    chrome.storage.local.get("domains", (result) => {
      if (result.domains === undefined) {
        result.domains = [];
      }
      result.domains.push(newDomain.value);
      chrome.storage.local.set({ domains: result.domains }, () => {
        newDomain.value = "";
        loadDomainList();
      });
    });
  }
}

document.querySelector("#add-domain").addEventListener("click", saveDomain);
newDomain.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    saveDomain();
  }
});

loadDomainList();
