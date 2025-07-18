//REMINDER -- using doppler for secrets
const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const apiKey = process.env.CIVITAI_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

const csvWriter = createCsvWriter({
  path: "output.csv",
  header: [
    { id: "url", title: "URL" },
    { id: "status", title: "Status" },
    { id: "title", title: "Title" },
    { id: "modelId", title: "Model ID" },
    { id: "versionId", title: "Version ID" },
    { id: "baseModel", title: "Base Model" },
    { id: "trainedWords", title: "Trained Words" },
    { id: "tags", title: "Tags" },
    { id: "nsfw", title: "NSFW" },
    { id: "description", title: "Description" },
    { id: "image", title: "Image URL" },
    { id: "downloadUrl", title: "Download URL" },
    { id: "category", title: "Categories" },
  ],
});

const urls = [
  "https://civitai.com/models/1618540/illustration-factory?modelVersionId=1931631",
  "https://civitai.com/models/995002/70s-sci-fi-movie?modelVersionId=1880459",
  "https://civitai.com/models/545264/impressionism?modelVersionId=1873289",
  "https://civitai.com/models/1668508/90s-comics-grit?modelVersionId=1888536",
  "https://civitai.com/models/1714472/yfg-beyond-glitch-flux?modelVersionId=1940160",
  "https://civitai.com/models/1710248/ink-77r?modelVersionId=1935377",
  "https://civitai.com/models/1724588/retrowave-style-fluxillustrious?modelVersionId=1951699",
  "https://civitai.com/models/1631581/80s-commercial-essential-1983?modelVersionId=2004386",
  "https://civitai.com/models/1710948/obscura-ce?modelVersionId=1936271",
  "https://civitai.com/models/1738552/lines-and-flat?modelVersionId=1967570",
  "https://civitai.com/models/1744024/suspiria-cinematic-style-flux-sdxl?modelVersionId=1973815",
  "https://civitai.com/models/1763256/retro-dark-fantasy?modelVersionId=1995489",
  "https://civitai.com/models/1717747/cybernetic-robots?modelVersionId=1943921",
  "https://civitai.com/models/1684739/minimal-art?modelVersionId=1906796",
  "https://civitai.com/models/1706365/lamartn-nostalgic-art-style-or-lam-panda?modelVersionId=1931024",
  "https://civitai.com/models/1765733/dieselpunk-propaganda-art?modelVersionId=1998300",
  "https://civitai.com/models/766366/horror-77r?modelVersionId=1934143",
  "https://civitai.com/models/1734980/film-emulation?modelVersionId=1966828",
  "https://civitai.com/models/1723722/lazy-haze-film-photography-vibes-for-sdxl-flux?modelVersionId=1950781",
  "https://civitai.com/models/1729845/eye-full-ce?modelVersionId=1957757",
  "https://civitai.com/models/1718894/dg-77r?modelVersionId=1945225",
  "https://civitai.com/models/1716956/pixelart-77r",
  "https://civitai.com/models/1743845/70s-giallo-thriller?modelVersionId=1973607",
  "https://civitai.com/models/1713299/watercolor-painting?modelVersionId=1938815",
  "https://civitai.com/models/1687643/mark-maggiori-style?modelVersionId=1910065",
  "https://civitai.com/models/1687774/coles-phillips-style-for-flux?modelVersionId=1910216",
  "https://civitai.com/models/1634407/cinematic-painting-realistic-classic-style-f1d-pony?modelVersionId=1850006",
  "https://civitai.com/models/1684500/george-barbier-illustration-style?modelVersionId=1906524",
  "https://civitai.com/models/1728324/lamartpg-groovy-poster-or-lam-panda?modelVersionId=1955990",
  "https://civitai.com/models/1715672/80s-df-77r?modelVersionId=1941552",
  "https://civitai.com/models/1633939/modern-mtg-style?modelVersionId=1906808",
  "https://civitai.com/models/1714010/one-thousand-and-one-nights-sinbad-tales-1970s-1950s-cinematic-film-style-f1d?modelVersionId=1939642",
  "https://civitai.com/models/1747045/graffity-flux?modelVersionId=1977219",
  "https://civitai.com/models/1726694/future-y2k-flux-v1?modelVersionId=1954089",
  "https://civitai.com/models/1723784/daride-a-d4r1d3-dark-rides-flumes-haunted-houses-animatronics-and-more?modelVersionId=1950777",
  "https://civitai.com/models/1702580/american-futuristic-moon-sci-fi-style-or-lam-panda?modelVersionId=1926822",
  "https://civitai.com/models/1696214/80s-new-wave-post-punk-aesthetics?modelVersionId=1919696",
  "https://civitai.com/models/1772404/paintart-style-019?modelVersionId=2005949",
  "https://civitai.com/models/1727227/liquid-chromatic-style-flux-or-616-minutes?modelVersionId=1954733",
  "https://civitai.com/models/1758499/vintage-dnd-style-flux?modelVersionId=1990198",
  "https://civitai.com/models/1744476/midjourneyv7-style-for-flux?modelVersionId=1974325",
  "https://civitai.com/models/1732455/artsy-fartsy-film-poster?modelVersionId=1960751",
  "https://civitai.com/models/1666669/code-world?modelVersionId=1886456",
  "https://civitai.com/models/1731331/retro-surrealism-core-1982?modelVersionId=1959453",
  "https://civitai.com/models/1708253/gongbisilk?modelVersionId=1933146",
  "https://civitai.com/models/1753860/future-retro?modelVersionId=1984867",
  "https://civitai.com/models/1757723/soft-cyberpunk-ce?modelVersionId=1989374",
  "https://civitai.com/models/1705175/dual-echo?modelVersionId=1929691",
  "https://civitai.com/models/1370366/the-artist-style-or-research-or-symbolism?modelVersionId=1928713",
  "https://civitai.com/models/1723637/special-edition-space-worlds-cities?modelVersionId=1950634",
  "https://civitai.com/models/1653793/straitjacket-cinematic-style-f1d?modelVersionId=1871924",
  "https://civitai.com/models/1732240/storybook-sketches?modelVersionId=1960506",
  "https://civitai.com/models/1709688/cosmic-swirl-background-lora?modelVersionId=1934758",
  "https://civitai.com/models/1680591/yctng?modelVersionId=1921154",
  "https://civitai.com/models/1690309/xutagawa-hiroshige-ukiyo-elib?modelVersionId=1912992",
  "https://civitai.com/models/1692775/flux-chinese-style?modelVersionId=1915772",
  "https://civitai.com/models/1309535/unfazed-flat-colored-aesthetic-radiant-style?modelVersionId=1949169",
  "https://civitai.com/models/1612420/gpt-styles-for-ilandflux-or-shrekman-styles-mix?modelVersionId=2006107",
  "https://civitai.com/models/1260139/medieval-manuscript-style-fluxkontext?modelVersionId=1420893",
  "https://civitai.com/models/1691490/shadow-and-highlight-enhancement-shadow-focus-cinematic-style-f1d-pony?modelVersionId=1914311",
  "https://civitai.com/models/1763647/semi-real-core?modelVersionId=1995883",
  "https://civitai.com/models/1713178/amateur-photos-90s-77r?modelVersionId=1938683",
  "https://civitai.com/models/458750/silent-hill-cinematic-horror-style-xl-f1d",
  "https://civitai.com/models/856587/horror-style-photos-flux",
  "https://civitai.com/models/851668/kft-horror-theme-flux",
  "https://civitai.com/models/854230/horror-eyeshine-flux",
  "https://civitai.com/models/863136/70s-horror-movie-sd1-sdxl-pony-flux",
  "https://civitai.com/models/863576/horror-cam",
  "https://civitai.com/models/716979/analog-horror-v1",
  "https://civitai.com/models/712318/1980s-horror-v2",
  "https://civitai.com/models/711600/80s-horror",
  "https://civitai.com/models/1260244/japanese-horror-movie",
  "https://civitai.com/models/785197/victorian-gothic-horror",
  "https://civitai.com/models/923225/2010s-folk-horror-movie-sd1-sdxl-pony-flux",
  "https://civitai.com/models/848732/grosz-art-style-universal-monsters-horror-movie-posters",
  "https://civitai.com/models/525200/alan-wake-cinematic-style-dark-style-xl-f1d",
  "https://civitai.com/models/753019/retro-anime-77r",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const categorizeTags = (tagsString) => {
  if (!tagsString) return ["uncategorrized"];
  const tags = tagsString
    .toLowerCase()
    .split(",")
    .map((t) => t.trim());
  const categories = [
    "character",
    "style",
    "concept",
    "clothing",
    "base model",
    "poses",
    "background",
    "tool",
    "vehicle",
    "objects",
    "assets",
    "animal",
    "action",
  ];
  const category = [];

  for (const tag of tags) {
    if (categories.some((s) => tag.includes(s))) category.push(tag);
  }

  return {
    category: category.join(", ") || "uncategorized",
  };
};

const scrape = async () => {
  const records = [];

  for (const url of urls) {
    try {
      console.log(`Processing ${url}`);
      const modelId = url.match(/models\/(\d+)/)?.[1];
      if (!modelId) throw new Error("Invalid model ID in URL");

      // fetch versions list
      const { data: modelData } = await axios.get(
        `https://civitai.com/api/v1/models/${modelId}`,
        { headers }
      );
      let versionToUse;

      // try to find flux version by name or baseModel
      versionToUse = modelData.modelVersions.find(
        (v) =>
          v.name?.toLowerCase().includes("flux") ||
          v.baseModel?.toLowerCase().includes("flux")
      );

      // fallback to latest version if no flux found
      if (!versionToUse) versionToUse = modelData.modelVersions[0];

      if (!versionToUse) throw new Error("No versions found for model");

      const versionId = versionToUse.id;

      // fetch version details
      const { data: versionData } = await axios.get(
        `https://civitai.com/api/v1/model-versions/${versionId}`,
        { headers }
      );

      const tagsString = modelData.tags.map((t) => t).join(", ") || "";

      const cats = categorizeTags(tagsString);
      console.log(cats.category);
      records.push({
        url,
        status: 200,
        title: versionData.model.name,
        modelId,
        versionId,
        baseModel: versionData.baseModel,
        trainedWords: versionData.trainedWords?.join(", ") || "",
        tags: tagsString,
        nsfw: versionData.model.nsfw,
        description: versionData.description || "",
        image: versionData.images[0]?.url || "",
        downloadUrl: versionData.files[0]?.downloadUrl || "",
        category: cats.category || "",
      });

      await sleep(300);
    } catch (error) {
      console.error(
        `Error processing ${url}:`,
        error.response?.status || error.message
      );
      records.push({
        url,
        status: error.response?.status || "error",
        title: "",
        modelId: "",
        versionId: "",
        baseModel: "",
        trainedWords: "",
        tags: "",
        nsfw: "",
        description: "",
        image: "",
        downloadUrl: "",
        category: "uncategorized",
      });
      await sleep(1000);
    }
  }

  await csvWriter.writeRecords(records);
  console.log("CSV written successfully.");
};

scrape();
