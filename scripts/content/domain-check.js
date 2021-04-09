// Only run content scripts on domains the user has specified.
function DomainCheck(contentScript) {
  chrome.storage.local.get("domains", function (result) {
    if (
      result.domains !== undefined &&
      result.domains.includes(window.location.host)
    ) {
      // Show the icon in colour as a content script is active.
      chrome.runtime.sendMessage({
        action: "update_icon",
        iconPath: "icons/icon_active.png",
      });
      return contentScript();
    }
  });
}
