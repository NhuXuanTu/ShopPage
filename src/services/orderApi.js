function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const orderApi = {
  async createOrder(order) {
    await delay(500);

    const orders = JSON.parse(localStorage.getItem("shop_orders") || "[]");

    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const nextOrders = [newOrder, ...orders];

    localStorage.setItem("shop_orders", JSON.stringify(nextOrders));
    localStorage.setItem("shop_last_order", JSON.stringify(newOrder));

    return newOrder;
  },

  async getOrdersByUserId(userId) {
    await delay(300);

    const orders = JSON.parse(localStorage.getItem("shop_orders") || "[]");
    return orders.filter((order) => order.userId === userId);
  },

  async getLastOrder() {
    await delay(150);
    return JSON.parse(localStorage.getItem("shop_last_order") || "null");
  },
};
