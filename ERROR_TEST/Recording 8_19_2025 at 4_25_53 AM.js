import url from 'url';
import { createRunner } from '@puppeteer/replay';

export async function run(extension) {
    const runner = await createRunner(extension);

    await runner.runBeforeAllSteps();

    await runner.runStep({
        type: 'setViewport',
        width: 1150,
        height: 1371,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
    });
    await runner.runStep({
        type: 'navigate',
        url: 'http://localhost:3000/',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'http://localhost:3000/',
                title: 'CollegeScam.io - Expose the Truth Behind Education Costs'
            }
        ]
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'section:nth-of-type(2) div:nth-of-type(2) p.text-sm'
            ],
            [
                'xpath//html/body/div/div/section[2]/div/div/div/div[2]/div/div/p[2]'
            ],
            [
                'pierce/section:nth-of-type(2) div:nth-of-type(2) p.text-sm'
            ]
        ],
        offsetY: 11.69525146484375,
        offsetX: 82.2711181640625,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'section:nth-of-type(2) div:nth-of-type(5) p.text-sm'
            ],
            [
                'xpath//html/body/div/div/section[2]/div/div/div/div[5]/div/div/p[2]'
            ],
            [
                'pierce/section:nth-of-type(2) div:nth-of-type(5) p.text-sm'
            ]
        ],
        offsetY: 6.54248046875,
        offsetX: 90.2711181640625,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Oops! Something went wrong'
            ],
            [
                'h3'
            ],
            [
                'xpath//html/body/div/div/div[1]/h3'
            ],
            [
                'pierce/h3'
            ],
            [
                'text/Oops! Something'
            ]
        ],
        offsetY: 28.1666259765625,
        offsetX: 183.3726806640625,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'div.flex > p'
            ],
            [
                'xpath//html/body/div/div/div[1]/p'
            ],
            [
                'pierce/div.flex > p'
            ]
        ],
        offsetY: 15.1689453125,
        offsetX: 173.3726806640625,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'body > div'
            ],
            [
                'xpath//html/body/div'
            ],
            [
                'pierce/body > div'
            ]
        ],
        offsetY: 743,
        offsetX: 281,
    });

    await runner.runAfterAllSteps();
}

if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    run()
}
