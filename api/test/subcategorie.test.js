import request from 'supertest';
import app from '../server'; // Assurez-vous que le chemin est correct
import path from 'path';

describe('SubCategories API', () => {
  let testCategoryId = 1; // Assurez-vous que cette catégorie existe dans votre base de données pour les tests
  let testSubCategoryId;

  it('should add a new sub-category', async () => {
    const response = await request(app)
      .post('/subcategories')
      .field('category_id', testCategoryId)
      .field('name', 'Test SubCategory')
      .field('description', 'A sub-category for testing')
      .attach('image', path.join(__dirname, 'test.png'));

    console.log('Add sub-category response:', response.body, response.status);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sub-category Test SubCategory added.');
    testSubCategoryId = response.body.subcategory_id;
    console.log('Test SubCategory ID:', testSubCategoryId); // Vérification de l'ID de la sous-catégorie
  });

  it('should get sub-categories for a category', async () => {
    const response = await request(app).get(`/subcategories?category_id=${testCategoryId}`);
    console.log('Get sub-categories response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get all sub-categories with category names', async () => {
    const response = await request(app).get('/allsubcategories');
    console.log('Get all sub-categories response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('category_name');
  });

  it('should update a sub-category', async () => {
    expect(testSubCategoryId).toBeDefined(); // Assurez-vous que l'ID est défini
    const response = await request(app)
      .patch(`/subcategories/${testSubCategoryId}`)
      .field('category_id', testCategoryId)
      .field('name', 'Updated SubCategory')
      .field('description', 'An updated sub-category for testing')
      .attach('image', path.join(__dirname, 'test.png'));

    console.log('Update sub-category response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Sub-category ${testSubCategoryId} updated.`);
  });

  it('should delete a sub-category', async () => {
    expect(testSubCategoryId).toBeDefined(); // Assurez-vous que l'ID est défini
    const response = await request(app).delete(`/subcategories/${testSubCategoryId}`);
    console.log('Delete sub-category response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Sub-category ${testSubCategoryId} deleted.`);
  });
});
