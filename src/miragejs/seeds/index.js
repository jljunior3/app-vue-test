const usersSeeder = server => {
  server.createList('user', 10);
};

export default function seeds(server) {
  usersSeeder(server);
}
