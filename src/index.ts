import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as urlParser from 'url';

const duplicateUrls = {};

const getUrl = (link) => {
    if (link.includes('http')) {
        return link;
    // } else if (link.slice(0, 1) === "#"){
    //     return `http://localhost:10000/${link}`;
    } else {
        return `http://localhost:10000/${link}`;
    }
};

const crawl = async ({url}: {url:any}) => {
    if (duplicateUrls[url])
    return;
    console.log("crawling", url);
    duplicateUrls[url] = true;

    const response = await fetch(url);
    const html = await response.text();
    // console.log("html", html);

    const $ = cheerio.load(html);
    const links = $("a").map((i, link) => link.attribs.href).get();
    // console.log(links);

    const images = $("img").map((i, links) => links.attribs.src).get();
    // console.log("images", images);
    images.forEach((imageUrl) => {
        fetch(getUrl(imageUrl)).then((response) => {
            const imgname = path.basename(imageUrl);
            // const imgFolder = fs.createWriteStream("images/myimage.jpg");
            const imgFolder = fs.createWriteStream(`images/${imgname}`);
            response.body.pipe(imgFolder);
        });
    });

    const {host} = urlParser.parse(url);
    links
    .filter(link => link.includes(host))
    .forEach(link => {
        crawl({
            url: getUrl(link),
        });
    });
};

crawl({
    url: "https://service.vic.gov.au/",
    // url: "http://localhost:10000/index.html",
});