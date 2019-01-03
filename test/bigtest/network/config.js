// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
export default function config() {
  this.get('/orders');

  this.get('/orders/:id', (schema, request) => {
    return schema.orders.find(request.params.id).attrs;
  });
}
