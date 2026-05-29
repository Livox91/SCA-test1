import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET / (Welcome)', () => {
    it('should return welcome message', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200);
    });
  });

  describe('GET /health (Health Check)', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('healthy');
          expect(res.body.timestamp).toBeDefined();
        });
    });
  });

  describe('GET /api/docs (Swagger)', () => {
    it('should return swagger documentation', () => {
      return request(app.getHttpServer())
        .get('/api/docs')
        .expect(301);
    });
  });

  afterAll(async () => {
    await app.close();
  });
})
