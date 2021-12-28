var pattern = "https://slots.jackfrosttower.com/*";

function interceptResponse(requestDetails) {
  console.log("Intercepting: " + requestDetails.url);
  let filter = browser.webRequest.filterResponseData(requestDetails.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.
    str = str.replace(/\"credit\":/g, '"credit":10000');
    console.log({str})
    
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}

// function logURL(requestDetails) {
//     console.log("Logging URL: " + requestDetails.url);
// }

// browser.webRequest.onBeforeRequest.addListener(
//     logURL, 
//     { urls: [pattern] }
// );

browser.webRequest.onBeforeRequest.addListener(
    interceptResponse, 
    { urls: [pattern] },
    ["blocking"]
);


  