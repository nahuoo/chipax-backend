import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ApiModule } from './../src/api/api.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ApiModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  it('/api/char-counter (GET)', () => {
    return request(app.getHttpServer()).get('/api/char-counter').expect(200)
  })

  it('/api/episodes-locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/episodes-locations')
      .expect(200)
  })
})
