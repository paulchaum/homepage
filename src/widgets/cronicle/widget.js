import genericProxyHandler from "utils/proxy/handlers/generic";

const widget =  {
  api: "{url}/{endpoint}?api_key={api_key}&limit={limit}" ,
  proxyHandler: genericProxyHandler ,

  mappings:  {
    info:  {
      endpoint: "api/app/get_history/v1" ,
    },
  },
};

export default widget;
