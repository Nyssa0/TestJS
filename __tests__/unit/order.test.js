const Order = require('../../src/models/order');

describe('Order Model', () => {
    test('should create an order with valid inputs', () => {
        const order = new Order('1', ['baskets', 'casquette'], 10);
        expect(order).toBeDefined();
        expect(order.userId).toBe('1');
        expect(order.items.length).toBe(2);
        expect(order.totalPrice).toBe(10);
    });

    test('should calculate total price correctly', () => {
        const order = new Order('1', ['baskets', 'casquette'], 10);
        order.addItem('bonnet', 5);
        expect(order.totalPrice).toBe(15);
    });
});
