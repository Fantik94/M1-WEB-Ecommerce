import request from 'supertest';
import app from '../server';

describe('Registration API', () => {
  let testUserId;

  afterAll(async () => {
    if (testUserId) {
      await request(app).delete(`/users/${testUserId}`);
    }
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890'
      });

    console.log('Registration Response:', response.body, response.status);

    if (response.status !== 201) {
      console.error('Error during registration:', response.body);
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user_id');
    testUserId = response.body.user_id;
  });

  it('should not register a user with an existing email', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'anotheruser',
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '0987654321'
      });

    console.log('Existing Email Response:', response.body, response.status);

    if (response.status !== 400) {
      console.error('Error during email validation:', response.body);
    }

    expect(response.status).toBe(400);
    expect(response.text).toBe('User already exists with this email');
  });
});
