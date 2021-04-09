// Update the icon or badge when content scripts require.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "update_icon") {
    chrome.browserAction.setIcon({
      path: request.iconPath,
      tabId: sender.tab.id,
    });
  }
  if (request.action === "update_badge") {
    chrome.browserAction.setBadgeText({
      text: request.badgeText > 0 ? request.badgeText : "",
      tabId: sender.tab.id,
    });
  }
});
