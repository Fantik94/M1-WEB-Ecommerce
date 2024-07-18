import request from 'supertest';
import app from '../server.js'; // Assurez-vous que le chemin vers votre fichier server.js est correct
import path from 'path';

describe('Categories API', () => {
  let testCategoryId;

  it('should add a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .field('name', 'Test Category')
      .field('description', 'A category for testing')
      .attach('image', path.resolve(__dirname, 'test.png')); // Utilisez une image de test

    console.log('Add category response:', response.body, response.status);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Category');
    expect(response.body.description).toBe('A category for testing');
    testCategoryId = response.body.category_id;
  });

  it('should get all categories', async () => {
    const response = await request(app).get('/categories');
    console.log('Get categories response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a category', async () => {
    const response = await request(app)
      .patch(`/categories/${testCategoryId}`)
      .field('name', 'Updated Test Category')
      .field('description', 'An updated category for testing')
      .attach('image', path.resolve(__dirname, 'test.png')); // Utilisez une image de test

    console.log('Update category response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Category ${testCategoryId} updated.`);
  });

  it('should delete a category', async () => {
    const response = await request(app).delete(`/categories/${testCategoryId}`);
    console.log('Delete category response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Category ${testCategoryId} deleted.`);
  });
});
