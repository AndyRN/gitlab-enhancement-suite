// Update the icon or badge when content scripts require.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "update_icon") {
    chrome.browserAction.setIcon({
      path: message.iconPath,
      tabId: sender.tab.id,
    });
  }

  if (message.action === "update_badge") {
    chrome.browserAction.setBadgeText({
      text: message.badgeText > 0 ? message.badgeText : "",
      tabId: sender.tab.id,
    });
  }

  return true;
});
