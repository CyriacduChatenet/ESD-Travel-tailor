import fs from 'fs';

const generateRobotsTxt = () => {
  const robotsTxt = `User-agent: *
Disallow:

Sitemap: https://example.com/sitemap.xml`; // Remplacez par l'URL de votre site

  fs.writeFileSync('../public/robots.txt', robotsTxt);
};

generateRobotsTxt();