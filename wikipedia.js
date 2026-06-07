const LANG = "en";
const API_URL = `https://${LANG}.wikipedia.org/api/rest_v1`;
const fallbackAttribution = {
  source: "Wikipedia",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
};
export async function fetchRandomArticle() {
  const response = await fetch(`${API_URL}/page/random/summary`);
  const data = await response.json();
  data.license = await fetchAttribution(data.title);
  return data;
}

export async function fetchAttribution(title) {
  const response = await fetch(
    `https://en.wikipedia.org/w/rest.php/attribution/v0-beta/pages/${title}/signals`,
  );
  const data = await response.json();

  let toReturn = fallbackAttribution;

  if (
    data &&
    data.essential &&
    data.essential.license &&
    data.essential.license.title &&
    data.essential.license.url
  ) {
    toReturn.license = data.essential.license.title;
    toReturn.licenseUrl = data.essential.license.url;
  }
  if (
    data &&
    data.essential &&
    data.essential.source_wiki &&
    data.essential.source_wiki.site_name
  ) {
    toReturn.source = data.essential.source_wiki.site_name;
  }
  return toReturn;
}
