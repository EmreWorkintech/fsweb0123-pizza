/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Ratings').truncate()
  await knex('Order_Toppings').truncate()
  await knex('Orders').truncate()
  await knex('Toppings').truncate()
  await knex('Pizzas').truncate()
  await knex('Users').truncate()
  await knex('Roles').truncate()


  await knex('Roles').insert([
    {id: 1, name: 'Admin'},
    {id: 2, name: 'User'}
  ]);
  await knex('Users').insert([
    {id: 1, email: 'timur@pizza.com', password: '$2a$08$gGB73G42u2d0lV2s162Npef0FPLAdYuCoHD9xAyK/clGrJYnsy.eu', name: 'Timur', surname: 'Egemen', role_id: 1},
    {id: 2, email: 'emre@pizza.com', password: '$2a$08$.dB2xQcd7/UPRsXp/el.mefkXKGxr9V3s.Dx40GWWLXQsJtqnVmLW', name: 'Emre', surname: 'Şahiner', role_id: 2},
    {id: 3, email: 'erdem@pizza.com', password: '$2a$08$gGB73G42u2d0lV2s162Npef0FPLAdYuCoHD9xAyK/clGrJYnsy.eu', name: 'Erdem', surname: 'Günay', role_id: 2},
  ]);
  await knex('Pizzas').insert([
    {id: 1, name: 'Position Absolute Acı Pizza', description: 'Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.', price: 85.50},
    {id: 2, name: 'Italian Pizza', description: 'Süper italyan pizzası. Salam, sosis, turşu..', price: 125.25},
  ]);
  await knex('Toppings').insert([
    {id: 1, name: 'Pepperoni'},
    {id: 2, name: 'Sosis'},
    {id: 3, name: 'Domates'},
    {id: 4, name: 'Mısır'},
    {id: 5, name: 'Biber'},
    {id: 6, name: 'Sucuk'},
    {id: 7, name: 'Ananas'},
    {id: 8, name: 'Kabak'},
    {id: 9, name: 'Sarımsak'},
    {id: 10, name: 'Soğan'},
    {id: 11, name: 'Tavuk Izgara'},
    {id: 12, name: 'Kanada Jambonu'},
    {id: 13, name: 'Jalepeno'},
  ]);
  await knex('Orders').insert([
    {id: 1, size: 'Big', dough: 'Slim', note: 'Lorem ipsum dolor o...', count: 2, total_price: 191.00, user_id:2, pizza_id:1},
  ]);
  await knex('Order_Toppings').insert([
    {order_id: 1, topping_id: 1},
    {order_id: 1, topping_id: 2},
    {order_id: 1, topping_id: 4},
    {order_id: 1, topping_id: 7},
    {order_id: 1, topping_id: 13},
  ]);
  await knex('Ratings').insert([
    {user_id: 2, pizza_id: 1, rate: 5},
    {user_id: 2, pizza_id: 2, rate: 3},
    {user_id: 3, pizza_id: 1, rate: 4},
    {user_id: 3, pizza_id: 2, rate: 1},
  ]);
};