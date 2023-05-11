function formatResponse(data, returnArray = 1) {
    let result = data.reduce((acc,order)=>{

        recordedOrder = acc.find(item=>item.id==order.id);

        if(!recordedOrder) {
            /*
                case yeni bir order geldi ama topping yok
                    {
                        ....
                        toppings: []
                    }
            */
            if(order.topping_id == null) {

                delete order.topping_id;
                delete order.topping_name;
                order.toppings = [];

            } else {
                /*
                    case yeni bir order geldi topping var

                    {
                        ....
                        toppings: [{id: 1, name: Pepperoni}]
                    }



                */
                const topping = {id: order.topping_id, name: order.topping_name};
                delete order.topping_id;
                delete order.topping_name;
                order.toppings = [topping];
            }
            
            acc.push(order);

        } else {
                /*
                   var olan bir order sadece toppingini bir öndekine ekle

                    {
                        ....
                        toppings: [{id: 1, name: Pepperoni},
                                {id: 2, name: Sucuk},
                        ]
                    }           

                */
                const topping = {id: order.topping_id, name: order.topping_name};
                recordedOrder.toppings.push(topping);
            
        }
        return acc;
    },[])
    if(returnArray == 0){
        return result[0]
    } else {
        return result
    }
}


module.exports = {
    formatResponse,
}