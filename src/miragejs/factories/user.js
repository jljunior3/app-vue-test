/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import { Factory } from 'miragejs';

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import faker from 'faker';
faker.locale = 'pt_BR';

export default {
  user: Factory.extend({
    name() {
      return faker.fake('{{name.findName}}');
    },
    email() {
      return faker.fake('{{internet.email}}');
    },
  }),
};
