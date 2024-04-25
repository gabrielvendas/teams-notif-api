const puppeteer = require('puppeteer');

const sonarqubeNotif = async (req, res, next) => {
    try {
        const { sonarQubeUrl, teamsSonarQubeWebhookURL } = req.body;

        await page.goto(sonarQubeUrl);

        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.setViewport({
            width: 1366,
            height: 768,
        });

        await page.type('#username', 'seu-email-do-jira');
        await page.click('#login-submit');

        await new Promise(resolve => setTimeout(resolve, 500));

        await page.type('#password', 'sua-senha-do-jira');
        await page.click('#login-submit');

        await new Promise(resolve => setTimeout(resolve, 30000));

        const screenshotBufferSonar = await page.screenshot();

        await page.screenshot({ path: 'screenshot.png' });

        await new Promise(resolve => setTimeout(resolve, 5000));

        const screenshotBase64Sonar = screenshotBufferSonar.toString('base64');

        const cardSonarqube = {
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
                                        title: "View SonarQUBE Report",
                                        style: "default",
                                        role: "Link",
                                        url: sonarQubeUrl,
                                        tooltip: "View on the web the SONARQUBE tests report"
                                    }
                                ]
                            },
                            {
                                type: "Image",
                                url: "data:image/png;base64," + screenshotBase64Sonar
                            }
                        ],
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        version: "1.0"
                    }
                }
            ]
        }

        await fetch(teamsSonarQubeWebhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardSonarqube)
        });

        await browser.close();

        return res.json({ message: 'Success Screenshot' });
    } catch (e) {
        next(e);
    }
}

module.exports = { sonarqubeNotif }