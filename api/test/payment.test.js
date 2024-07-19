import request from 'supertest';
import app from '../server.js';

describe('Payments API', () => {
  let testUserId = 5;
  let testPaymentId;

  describe('POST /payments/:user_id', () => {
    it('should add a new payment method', async () => {
      const res = await request(app)
        .post(`/payments/${testUserId}`)
        .send({
          numero_carte: '1234567812345678',
          date_expiration_carte: '2025-12-31',
          cvc_carte: '123',
          nom_carte: 'Test User'
        });

      console.log('POST /payments/:user_id response:', res.body);

      expect(res.status).toBe(201);
      expect(res.text).toBe(`Payment added successfully for user ${testUserId}.`);

      // Récupérez l'ID du paiement ajouté pour les tests suivants
      const payments = await request(app).get(`/payments/${testUserId}`);
      testPaymentId = payments.body[0].payments_id;
    });
  });

  describe('GET /payments/:user_id', () => {
    it('should get all payment methods for a user', async () => {
      const res = await request(app).get(`/payments/${testUserId}`);

      console.log('GET /payments/:user_id response:', res.body);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('PATCH /payments/:user_id/:payments_id', () => {
    it('should update a payment method', async () => {
      const res = await request(app)
        .patch(`/payments/${testUserId}/${testPaymentId}`)
        .send({
          numero_carte: '8765432187654321'
        });
  
      console.log('PATCH /payments/:user_id/:payments_id response:', res.body, res.status);
  
      expect(res.status).toBe(200);
      expect(res.text).toBe(`Payment ${testPaymentId} for user ${testUserId} updated successfully.`);
    });
  });

  describe('DELETE /payments/:user_id/:payments_id', () => {
    it('should delete a payment method', async () => {
      const res = await request(app).delete(`/payments/${testUserId}/${testPaymentId}`);

      console.log('DELETE /payments/:user_id/:payments_id response:', res.body);

      expect(res.status).toBe(200);
      expect(res.text).toBe(`Payment ${testPaymentId} for user ${testUserId} deleted successfully.`);
    });
  });
});
