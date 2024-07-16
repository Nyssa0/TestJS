class Order {
    constructor(userId, items, totalPrice) {
        this.userId = userId;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    addItem(item, price) {
        this.items.push(item);
        this.totalPrice += price;
    }
}

module.exports = Order;
