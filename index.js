const { chromium, firefox, webkit } = require('playwright');

(async () => {
    const browser = await chromium.launch();  // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();
    await page.goto('https://github.com');

    await page.screenshot({ path: "img/image.png" });

    // const text = await page.$eval('#e_7043762 > .e_texto.c > p > span', el => el.innerHTML);

    async function tags() {
        const getMetatag = async (name) => {
            try {
                return await page.$eval(`meta[name=${name}]`, el => el.content)
            }
            catch (err) {
                err
            }
            try {
                return await page.$eval(`meta[property="og:${name}"]`, el => el.content)
            }
            catch (err) {
                err
            }
        }
        return {
            title: await page.$eval('title', el => el.innerText),
            favicon: await page.$eval('link[rel=icon]', el => el.href),
            description: await getMetatag('description'),
            img: await getMetatag("image"),
        }
    }

    console.log(await tags());

    let html = await page.evaluate(() => {
        return document.documentElement.innerHTML
    });

    await browser.close();

})()
