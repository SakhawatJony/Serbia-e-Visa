const Sitemap = require("react-router-sitemap").default;
const router = require("./src/router").default;

const generateSitemap = () => {
  return new Sitemap(router)
    .build("https://www.srbija-gov-rs.com/") // Replace with your website URL
    .save("./public/sitemap.xml"); // Save sitemap in the public folder
};

generateSitemap();
