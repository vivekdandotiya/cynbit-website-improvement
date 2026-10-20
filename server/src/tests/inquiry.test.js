const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');

test('Cynbit Backend API Test Suite', async (t) => {

  await t.test('GET /api/health - returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'healthy');
    assert.strictEqual(res.body.service, 'Cynbit Guided Inquiry API');
    assert.ok(res.body.timestamp);
    assert.ok(res.body.database);
    assert.strictEqual(typeof res.body.uptimeSeconds, 'number');
  });

  await t.test('GET /api/services - returns Cynbit service taxonomy', async () => {
    const res = await request(app).get('/api/services');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.services));
    assert.strictEqual(res.body.data.services.length, 3);
    
    const serviceIds = res.body.data.services.map(s => s.id);
    assert.ok(serviceIds.includes('ai-automation'));
    assert.ok(serviceIds.includes('custom-software'));
    assert.ok(serviceIds.includes('digital-marketing'));
    assert.ok(Array.isArray(res.body.data.budgetTiers));
    assert.ok(Array.isArray(res.body.data.timelineOptions));
  });

  await t.test('POST /api/inquiries - rejects empty payload with 400', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({});
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
    assert.ok(Array.isArray(res.body.errors));
    assert.ok(res.body.errors.some(e => e.field === 'services'));
    assert.ok(res.body.errors.some(e => e.field === 'contact.fullName'));
    assert.ok(res.body.errors.some(e => e.field === 'contact.email'));
    assert.ok(res.body.errors.some(e => e.field === 'projectDescription'));
  });

  await t.test('POST /api/inquiries - rejects invalid email address with 400', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        services: ['ai-automation'],
        timeline: 'standard',
        budgetTier: 'tier-2',
        projectDescription: 'We need an autonomous AI agent to streamline lead operations.',
        contact: {
          fullName: 'Vivek Test',
          email: 'not-an-email-address',
          company: 'Acme Corp'
        }
      });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
    assert.ok(res.body.errors.some(e => e.field === 'contact.email'));
  });

  await t.test('POST /api/inquiries - successfully submits valid inquiry with 201', async () => {
    const payload = {
      services: ['ai-automation', 'custom-software'],
      capabilities: ['autonomous-agents', 'fullstack-web-mobile'],
      projectStage: 'greenfield',
      timeline: 'urgent',
      budgetTier: 'tier-3',
      currency: 'INR',
      projectDescription: 'We are architecting an enterprise multi-agent customer support automation platform with real-time analytics.',
      targetPlatforms: ['web', 'cloud'],
      integrations: 'OpenAI, Slack, PostgreSQL',
      contact: {
        fullName: 'Vivek Dandotiya',
        email: 'vivek.candidate@test.com',
        company: 'Dandotiya Solutions',
        industry: 'Software',
        phone: '+91 98765 00000',
        preferredContactMethod: 'video-call'
      }
    };

    const res = await request(app)
      .post('/api/inquiries')
      .send(payload);

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.data.referenceId);
    assert.match(res.body.data.referenceId, /^CYN-2026-[A-Z0-9]+$/);
    assert.strictEqual(res.body.data.status, 'RECEIVED');
    assert.ok(res.body.data.qualificationScore >= 70);
    assert.strictEqual(res.body.data.priority, 'HIGH');
    assert.strictEqual(res.body.data.contact.fullName, 'Vivek Dandotiya');

    // Test looking up the newly created inquiry by referenceId
    const lookupRes = await request(app).get(`/api/inquiries/${res.body.data.referenceId}`);
    assert.strictEqual(lookupRes.status, 200);
    assert.strictEqual(lookupRes.body.success, true);
    assert.strictEqual(lookupRes.body.data.referenceId, res.body.data.referenceId);
    assert.strictEqual(lookupRes.body.data.status, 'RECEIVED');
    // Ensure email is masked for privacy
    assert.ok(lookupRes.body.data.maskedEmail.includes('***'));
  });

  await t.test('GET /api/inquiries/:referenceId - returns 404 for unknown ID', async () => {
    const res = await request(app).get('/api/inquiries/CYN-NON-EXISTENT');
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
  });

  await t.test('GET /api/inquiries/stats - returns aggregation stats', async () => {
    const res = await request(app).get('/api/inquiries/stats');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(typeof res.body.data.totalInquiries, 'number');
    assert.ok(res.body.data.totalInquiries >= 1);
  });

  await t.test('GET /api/inquiries - returns inquiry list', async () => {
    const res = await request(app).get('/api/inquiries');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 1);
  });

  await t.test('GET /non-existent-route - returns 404 JSON', async () => {
    const res = await request(app).get('/api/unknown-endpoint');
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
  });
});
