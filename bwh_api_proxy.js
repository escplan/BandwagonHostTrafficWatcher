/**
 * An object with different URLs to fetch
 * @param {Object} ORIGINS
 */

const ORIGINS = {
  "bwh.unwall.in" : "api.64clouds.com"
}

async function handleRequest(request) {
  const url = new URL(request.url)
  // Check if incoming hostname is a key in the ORIGINS object
  let pathnames = url.pathname.split("/");
  if ((url.hostname in ORIGINS) && (pathnames[1]=="v1")) {
    const target = ORIGINS[url.hostname]
    url.hostname = target
    // If it is, proxy request to that third party origin
    console.log(url.toString());
    return await fetch(url.toString(), request)
  }

  // Otherwise, process request as normal
  return new Response("wrong host", {status: 403})
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
