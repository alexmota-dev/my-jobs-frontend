function importAll(r: __WebpackModuleApi.RequireContext): string[] {
  return r.keys().map((key: string) => {
    const module = r(key);
    return module.default ? module.default : module;
  });
}

const imagesContext = require.context('./books', false, /\.(png|jpg|svg)$/);

const images: string[] = importAll(imagesContext);

export default images;
