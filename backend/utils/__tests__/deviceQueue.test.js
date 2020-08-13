// flexiWAN SD-WAN software - flexiEdge, flexiManage.
// For more information go to https://flexiwan.com
// Copyright (C) 2019  flexiWAN Ltd.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Module for deviceQueues Unit Test
var configs = require('../../configs')();
var deviceQueues = require('../deviceQueue')(configs.get('kuePrefix'), configs.get('redisUrl'));
const logger = require('../../logging/logging')({ module: module.filename, type: 'unit-test' });

describe('Initialization', () => {
  afterAll(() => {
    deviceQueues.shutdown();
  });

  test('Starting queue, adding and processing a job, remove on complete', async (done) => {
    let err;
    try {
      await deviceQueues.startQueue('AAA', async (rjob) => {
        logger.verbose('Processing job ID=' + rjob.id + ', data=' + JSON.stringify(rjob.data));
        expect(job.data).toEqual({
          message: { testdata: 'AAA1' },
          response: { resp: 'RRR1' },
          metadata: { target: 'AAA', username: 'unknown', org: 'unknown', init: false }
        });
        expect(rjob.id).toBe(job.id);
      });
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(undefined);
    const job = await deviceQueues.addJob('AAA', null, null, { testdata: 'AAA1' }, { resp: 'RRR1' },
      { priority: 'normal', attempts: 1, removeOnComplete: true },
      (jobid, res) => {
        logger.verbose('Job completed, res=' + JSON.stringify(res));
        expect(res).toEqual({ resp: 'RRR1' });
        done();
      });
    logger.verbose('Job ID = ' + job.id);
  });

  test('Starting queue, adding and processing a job, keep on complete', async (done) => {
    let err;
    try {
      await deviceQueues.startQueue('BBB', async (rjob) => {
        logger.verbose('Processing job ID=' + rjob.id + ', data=' + JSON.stringify(rjob.data));
        expect(job.data).toEqual({
          message: { testdata: 'BBB1' },
          response: 1,
          metadata: {
            target: 'BBB',
            username: 'user1',
            org: '4edd40c86762e0fb12000001',
            init: false
          }
        });
        expect(rjob.id).toBe(job.id);
      });
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(undefined);
    const job = await deviceQueues.addJob(
      'BBB',
      'user1',
      '4edd40c86762e0fb12000001',
      { testdata: 'BBB1' },
      1,
      { priority: 'normal', attempts: 1, removeOnComplete: false },
      (jobid, res) => {
        logger.verbose('Job completed, res=' + JSON.stringify(res));
        expect(res).toBe(1);
        done();
      }
    );
    logger.verbose('Job ID = ' + job.id);
  });

  test('Checking completed jobs', async (done) => {
    const c = await deviceQueues.getCount('complete');
    expect(c).toBe(1);
    await deviceQueues.iterateJobs('complete', (rjob) => {
      expect(rjob.data.message.testdata).toBe('BBB1');
    });
    done();
  });

  test('Chcek completed by org', async (done) => {
    await deviceQueues.iterateJobsByOrg('4edd40c86762e0fb12000001', 'complete', (rjob) => {
      logger.verbose(JSON.stringify(rjob));
    });
    done();
  });

  test('Removing completed jobs', async () => {
    await deviceQueues.removeJobs('complete', 0);
    const c = await deviceQueues.getCount('complete');
    expect(c).toBe(0);
  });

  test('Pause / Resume', async (done) => {
    let err;
    try {
      await deviceQueues.startQueue('CCC', async (rjob) => {
        logger.verbose('Processing job ID=' + rjob.id + ', data=' + JSON.stringify(rjob.data));
        expect(job.data).toEqual({
          message: { testdata: 'CCC1' },
          response: true,
          metadata: {
            target: 'CCC',
            username: 'user2',
            org: '4edd40c86762e0fb12000002',
            init: false
          }
        });
        expect(rjob.id).toBe(job.id);
      });
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(undefined);
    deviceQueues.pauseQueue('CCC');
    const job = await deviceQueues.addJob(
      'CCC',
      'user2',
      '4edd40c86762e0fb12000002',
      { testdata: 'CCC1' },
      true,
      { priority: 'normal', attempts: 1, removeOnComplete: true },
      (jobid, res) => {
        logger.verbose('Job completed, res=' + JSON.stringify(res));
        expect(res).toBe(true);
        done();
      }
    );
    logger.verbose('Job ID = ' + job.id);
    const c = await deviceQueues.getCount('inactive');
    expect(c).toBe(1);
    deviceQueues.resumeQueue('CCC');
  });
});
