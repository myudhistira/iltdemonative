const Hapi = require('@hapi/hapi');

const contacts = [
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
];

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'POST',
    path: '/contacts',
    handler: (request, h) => {
      const newContact = request.payload;
      contacts.push(newContact);
      return h.response().code(201);
    }
  });

  server.route({
    method: 'GET',
    path: '/contacts',
    handler: (request, h) => {
      return h.response(contacts).code(200);
    }
  });

  server.route({
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: (request, h) => {
      const id = request.params.id;
      const index = contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        contacts.splice(index, 1);
        return h.response().code(200);
      }
      return h.response().code(404);
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
