/**
 *
 * Created by Smarttkow on 4/5/17.
 */

import * as express from 'express';

export const index = express.Router();

index.get('/', (req, res, next) => {
    res.render('index');
});

index.get('/info', (req, res, next) => {
    res.render('server info');
});

const propertyId = "properties/261948992";

const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Creates a client.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    entity: {
      propertyId: propertyId,
    },
    property: propertyId,
    dateRanges: [
      {
        startDate: '2020-03-31',
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

  console.log('Report result:');
  response.rows.forEach(row => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });

  return response;
}

runReport();

/*
const {AlphaAnalyticsDataClient} = require('@google-analytics/data');
const client = new AlphaAnalyticsDataClient();

async function runReport2() {
    const [response] = await client.runReport({
        entity: {
            propertyId: propertyId,
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
}
*/


//runReport2();

index.get('/ga-report', async (req, res, next) => {

    try {
        const result = await runReport();

        res.json(result);
    } catch (e) {
        console.log(e);
    }
});
