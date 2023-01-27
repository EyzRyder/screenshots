const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
    const browser = await puppeteer.launch({
//      headless: false,
//      slowMo: 0, 
        defaultViewport: {
            width: 1272,
            height: 900
        }
    });

    function MetaTag() {
        const getMetatag = (name) =>
            $(`meta[name=${name}]`).attr('content') ||
            $(`meta[property="og:${name}"]`).attr('content') ||
            $(`meta[property="og:${name}"]`).attr('content');


        return {
            title: $('title').first().text(),
            favicon: $('link[rel="shortcut icon"]').attr('href'),
            description: getMetatag('description'),
            img: getMetatag("image"),
            author: getMetatag('author'),
        }
    }

    const page = await browser.newPage();
    await page.goto("https://github.com", { waitUntil: "domcontentloaded", });

    await page.screenshot({ path: "img/image.png" });

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    });


    const $ = cheerio.load(pageData.html);

    const element = $(".p-name ")

    console.log(element.text());
    console.log(await MetaTag());


    await browser.close();
})()
