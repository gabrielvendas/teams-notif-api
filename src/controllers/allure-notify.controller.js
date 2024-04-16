const puppeteer = require('puppeteer');

const allureNotify = async (req, res, next) => {
    try {
        const { allureReportUrl, teamsAllureWebhookUrl } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(allureReportUrl);

        await new Promise(resolve => setTimeout(resolve, 5000));

        await page.setViewport({
            width: 1366,
            height: 768,
        });

        const screenshotBuffer = await page.screenshot();

        await new Promise(resolve => setTimeout(resolve, 5000));

        const screenshotBase64 = screenshotBuffer.toString('base64');

        const cardAllureReport = {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: {
                        type: "AdaptiveCard",
                        body: [
                            {
                                type: "ActionSet",
                                actions: [
                                    {
                                        type: "Action.OpenUrl",
                                        title: "View Allure Report",
                                        style: "default",
                                        role: "Link",
                                        url: allureReportUrl,
                                        tooltip: "View on the web the tests report"
                                    }
                                ]
                            },
                            {
                                type: "Image",
                                url: "data:image/png;base64," + screenshotBase64
                            }
                        ],
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        version: "1.0"
                    }
                }
            ]
        }

        await fetch(teamsAllureWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardAllureReport)
        });

        await browser.close();

        return res.json({ message: 'Success Screenshot' });
    } catch (e) {
        next(e);
    }
}

module.exports = { allureNotify }