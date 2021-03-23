/**
 *
 * Created by Smarttkow on 4/5/17.
 */
import * as express from 'express';
const {AlphaAnalyticsDataClient} = require('@google-analytics/data');

export const index = express.Router();

index.get('/', (req, res, next) => {
    res.render('index');
});

index.get('/ga-report', async (req, res, next) => {

    try {
        const result = await getReport();

        console.log("runReport result", result);

        res.render(1234);

        return 1;
    } catch (e) {
        console.log(e);
    }
});

async function getReport() {
    const client = new AlphaAnalyticsDataClient();
    const propertyID = "261948992" //add the propert id of the project that will be used

    const [response] = await client.runReport({
        entity: {
            propertyId: 1,
        },
        dateRanges: [
            {
            startDate: '2020-01-28',
            endDate: 'today',
            },
        ],
        dimensions: [ 
            {
                name: 'eventName'
            },
            {
                name: 'date'
            }
        ],
        metrics: [
            {
            name: 'eventCount',
            },
        ],
        limit: -1,
        orderBys: [
            {
                desc: false,
                dimension: {
                    dimensionName: "date",
                    orderType: "NUMERIC"
                }
            }
        ] 
    });

    return response;
}