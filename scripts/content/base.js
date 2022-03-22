// Only run content scripts on domains the user has specified.
function domainCheck(contentScript) {
  chrome.storage.local.get("domains", (result) => {
    if (
      result.domains !== undefined &&
      result.domains.includes(window.location.host)
    ) {
      // Show the icon in colour as a content script is active.
      chrome.runtime.sendMessage({
        action: "update_icon",
        iconPath: "../icons/icon_active.png",
      });
      return contentScript();
    }
  });
}

// Filter the query parameters on search lists.
function toggleFilter(negativeFilter, positiveFilter) {
  if (!window.location.search) {
    window.location.search = insertString(
      window.location.search,
      null,
      "?" + negativeFilter
    );
  } else {
    var negativeIndex = window.location.search.indexOf(negativeFilter);
    var positiveIndex = window.location.search.indexOf(positiveFilter);
    if (negativeIndex !== -1) {
      window.location.search = insertString(
        window.location.search,
        negativeIndex,
        positiveFilter,
        negativeFilter.length
      );
    } else if (positiveIndex !== -1) {
      window.location.search = insertString(
        window.location.search,
        positiveIndex,
        negativeFilter,
        positiveFilter.length
      );
    } else {
      window.location.search = insertString(
        window.location.search,
        null,
        "&" + negativeFilter
      );
    }
  }
}

// Insert a string into another string at the specified index, and optionally replace by an amount.
function insertString(str, index, value, replace) {
  if (!index) {
    index = str.length;
  }
  return (
    str.substr(0, index) + value + str.substr(replace ? index + replace : index)
  );
}
