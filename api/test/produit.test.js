import request from 'supertest';
import app from '../server'; 
import path from 'path';

describe('Products API', () => {
  let testCategoryId;
  let testSubCategoryId;
  let testProductId;

  beforeAll(async () => {
    // Créer une catégorie pour les tests
    const categoryResponse = await request(app)
      .post('/categories')
      .field('name', 'Test Category')
      .field('description', 'A category for testing')
      .attach('image', path.join(__dirname, 'test.png'));

    expect(categoryResponse.status).toBe(201);
    testCategoryId = categoryResponse.body.category_id;

    // Créer une sous-catégorie pour les tests
    const subCategoryResponse = await request(app)
      .post('/subcategories')
      .field('category_id', testCategoryId)
      .field('name', 'Test SubCategory')
      .field('description', 'A sub-category for testing')
      .attach('image', path.join(__dirname, 'test.png'));

    expect(subCategoryResponse.status).toBe(201);
    testSubCategoryId = subCategoryResponse.body.subcategory_id;
  });

  afterAll(async () => {
    // Supprimer la sous-catégorie de test
    await request(app).delete(`/subcategories/${testSubCategoryId}`);
    // Supprimer la catégorie de test
    await request(app).delete(`/categories/${testCategoryId}`);
  });

  it('should add a new product', async () => {
    const response = await request(app)
      .post('/products')
      .field('subcategory_id', testSubCategoryId)
      .field('name', 'Test Product')
      .field('description', 'A product for testing')
      .field('price', 99.99)
      .field('stock', 10)
      .attach('image1', path.join(__dirname, 'test.png'))
      .attach('image2', path.join(__dirname, 'test.png'))
      .attach('image3', path.join(__dirname, 'test.png'));

    console.log('Add product response:', response.body, response.status);
    if (response.status !== 201) {
      console.error('Error adding product:', response.error);
    }
    expect(response.status).toBe(201);
    testProductId = response.body.product_id;
    console.log('Test Product ID:', testProductId); // Vérification de l'ID du produit
  });

  it('should get products for a sub-category', async () => {
    const response = await request(app).get(`/categories/${testCategoryId}/subcategories/${testSubCategoryId}/products`);
    console.log('Get products response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a single product by ID', async () => {
    const response = await request(app).get(`/products/${testProductId}`);
    console.log('Get product by ID response:', response.body, response.status);
    if (response.status !== 200) {
      console.error('Error fetching product by ID:', response.error);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('product_id', testProductId);
  });

  it('should get random products', async () => {
    const response = await request(app).get('/rng-products');
    console.log('Get random products response:', response.body, response.status);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a product', async () => {
    expect(testProductId).toBeDefined(); // Assurez-vous que l'ID est défini
    const response = await request(app)
      .patch(`/products/${testProductId}`)
      .field('subcategory_id', testSubCategoryId)
      .field('name', 'Updated Product')
      .field('description', 'An updated product for testing')
      .field('price', 89.99)
      .field('stock', 5)
      .attach('image1', path.join(__dirname, 'test.png'))
      .attach('image2', path.join(__dirname, 'test.png'))
      .attach('image3', path.join(__dirname, 'test.png'));

    console.log('Update product response:', response.body, response.status);
    if (response.status !== 200) {
      console.error('Error updating product:', response.error);
    }
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Product ${testProductId} updated.`);
  });

  it('should delete a product', async () => {
    expect(testProductId).toBeDefined(); // Assurez-vous que l'ID est défini
    const response = await request(app).delete(`/products/${testProductId}`);
    console.log('Delete product response:', response.body, response.status);
    if (response.status !== 200) {
      console.error('Error deleting product:', response.error);
    }
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Product ${testProductId} deleted.`);
  });
});
