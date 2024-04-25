const gitlabCiNotif = async (req, res, next) => {
    try {
        const { avatarUrl, gitlabUsername, gitlabCiProjectPath, gitlabCiCommitBranch, gitlabCiPipelineStatus, gitlabCiPipelineUrl, teamsGitlabCiWebhookUrl } = req.body;

        const status = gitlabCiPipelineStatus === 'success' || gitlabCiPipelineStatus === 'failed' ? gitlabCiPipelineStatus : 'undefined';
        const icon = gitlabCiPipelineStatus === 'success' ? '✅' : gitlabCiPipelineStatus === 'failed' ? '❌' : ''

        const cardGitlabPipeline = {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: {
                        type: "AdaptiveCard",
                        body: [
                            {
                                type: "TextBlock",
                                size: "Medium",
                                weight: "Bolder",
                                text: gitlabCiProjectPath
                            },
                            {
                                type: "ColumnSet",
                                columns: [
                                    {
                                        type: "Column",
                                        items: [
                                            {
                                                type: "Image",
                                                style: "Person",
                                                url: avatarUrl,
                                                size: "Medium"
                                            }
                                        ],
                                        width: "auto"
                                    },
                                    {
                                        type: "Column",
                                        items: [
                                            {
                                                type: "TextBlock",
                                                spacing: "None",
                                                text: `**Author: ${gitlabUsername}**`,
                                                isSubtle: false,
                                                wrap: true
                                            },
                                            {
                                                type: "TextBlock",
                                                spacing: "None",
                                                text: `**Branch**: ${gitlabCiCommitBranch}`,
                                                isSubtle: false,
                                                wrap: true
                                            },
                                            {
                                                type: "TextBlock",
                                                spacing: "None",
                                                text: `**Status**: ${status} ${icon}`,
                                                isSubtle: false,
                                                wrap: true
                                            }
                                        ],
                                        width: "stretch"
                                    }
                                ]
                            },
                            {
                                type: "ActionSet",
                                actions: [
                                    {
                                        type: "Action.OpenUrl",
                                        title: "See More",
                                        style: "default",
                                        role: "Link",
                                        url: gitlabCiPipelineUrl,
                                        tooltip: "See more about pipeline"
                                    }
                                ]
                            }
                        ],
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        version: "1.6"
                    }
                }
            ]
        }

        await fetch(teamsGitlabCiWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardGitlabPipeline)
        });

        return res.json({ message: 'GitLab CI notification successfully sent to Teams.' });
    } catch (e) {
        next(e);
    }
}

module.exports = { gitlabCiNotif }