import * as express from 'express';

export const index = express.Router();

index.get('/', (req, res, next) => {
    res.render('index');
});

index.get('/info', (req, res, next) => {
    res.render('server info');
});

const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Creates a client.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport(propertyId, startDate, endDate) {
  const [response] = await analyticsDataClient.runReport({
    entity: {
      propertyId: "properties/" + propertyId,
    },
    property: "properties/" + propertyId,
    dateRanges: [
      {
        startDate: startDate || '2020-01-28',
        endDate: endDate || 'today',
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

//   console.log('Report result:');
//   response.rows.forEach(row => {
//     console.log(row.dimensionValues[0], row.metricValues[0]);
//   });

  return response;
}

index.get('/ga-report', async (req, res, next) => {
    try {
        var propertyId = "261948992";
        var startDate = "";
        var endDate = "";
        if (req.query["propertyId"]) {
            propertyId = req.query["propertyId"];
        }
        if (req.query["startDate"]) {
            startDate = req.query["startDate"];
        }
        if (req.query["endDate"]) {
            endDate = req.query["endDate"];
        }

        const result = await runReport(propertyId, startDate, endDate);

        res.json(result);
    } catch (e) {
        console.log(e);
    }
});
