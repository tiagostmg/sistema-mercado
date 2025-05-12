class Purchase {
  id: number;
  productId: number;
  clientId: number;
  quantity: number;
  date: Date;

  constructor(id: number, productId: number, clientId: number, quantity: number, date: Date) {
    this.id = id;
    this.productId = productId;
    this.clientId = clientId;
    this.quantity = quantity;
    this.date = date;
  }
}