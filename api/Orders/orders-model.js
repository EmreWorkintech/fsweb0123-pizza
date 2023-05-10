const db = require('../../data/db-config');

function getAll() {
    return db('Orders as o')
                .leftJoin('Order_Toppings as ot', 'o.id', 'ot.order_id')
                .leftJoin('Toppings as t', 'ot.topping_id', 't.id')
                .leftJoin('Pizzas as p', 'o.pizza_id', 'p.id')
                .select('o.*',
                        'p.name as pizza_name',
                        'p.description',
                        'p.price',
                        't.id as topping_id',
                        't.name as topping_name')
}

function getById(id) {
    return db('Orders as o')
            .leftJoin('Order_Toppings as ot', 'o.id', 'ot.order_id')
            .leftJoin('Toppings as t', 'ot.topping_id', 't.id')
            .leftJoin('Pizzas as p', 'o.pizza_id', 'p.id')
            .select('o.*',
                    'p.name as pizza_name',
                    'p.description',
                    'p.price',
                    't.id as topping_id',
                    't.name as topping_name')
            .where('o.id',id)
            .first()
}

function getByFilter(filter) {

}

async function create(order) {
    let id;
    //toppingleri orderdan aldık
    const newOrderToppings = order.toppings;

    //order'daki gereksiz bilgileri sildik
    delete order.toppings;

    //veritabanına ekleme işlemlerine
    await db.transaction(async trx=>{
        //önce order'ı ekliyorum ki order_id'm olsun.!!!
        [id] = await trx('Orders').insert(order);

        //her bir topping'i tabloya tek tek ekliyorum.
        if(newOrderToppings.length>0){
            newOrderToppings.forEach(async topping_id=>{
                newOrderTopping = {
                    order_id: id,
                    topping_id: topping_id
                }
                await trx('Order_Toppings').insert(newOrderTopping);
            })
        }
    })

    const newOrder = await getById(id);
    return newOrder;
}

function update(user,id) {
 //transaction
}

function remove(id) {

}

module.exports = {
    getAll,
    getById,
    getByFilter,
    create,
    update,
    remove,
}