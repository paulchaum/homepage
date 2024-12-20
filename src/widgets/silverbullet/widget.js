import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    index: {
      endpoint: "index.json",
      headers: {
        "X-Sync-Mode": "true",
      },
    },
  },
};

export default widget;
