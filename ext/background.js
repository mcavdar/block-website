const bullshit = "https://giphy.com/explore/this-is-bullshit"

async function getUserInput() {
    let data = await browser.storage.sync.get('websites');
    return data.websites || []; // Return an empty array if no input is saved
}

async function handleUpdated(tabId, changeInfo, tabInfo) {
  let websites = await getUserInput();

  const isAllowedUrl = (url) => {
    return websites.some(website => url.startsWith(website));
  };

  if (!tabInfo.url.startsWith(bullshit) && !changeInfo.url.startsWith(bullshit) && isAllowedUrl(tabInfo.url)){
    let updating = browser.tabs.update({ url: bullshit });
  }
}


browser.tabs.onUpdated.addListener(handleUpdated);