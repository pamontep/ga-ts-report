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

const propertyId = "261948992";

const {BetaAnalyticsDataClient, AlphaAnalyticsDataClient} = require('@google-analytics/data');

// Creates a client.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    entity: {
      propertyId: propertyId,
    },
    dateRanges: [
      {
        startDate: '2020-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'city',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });

  console.log('Report result:');
  response.rows.forEach(row => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });
}

runReport();

index.get('/ga-report', async (req, res, next) => {

    try {
        /*const result = await getReport();

        console.log("runReport result", result);

        res.render(1234);

        return 1;*/
    } catch (e) {
        console.log(e);
    }
});
