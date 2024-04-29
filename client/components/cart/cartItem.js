import { useEffect } from "react";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import ProductService from "@services/productService";

function CartItem({ item }) {
    const { cart, setCart } = useAppContext();
    const handleQuantityChange = (id, quantity) => {
        cart.map(item => item.product_id === id ? {...item, quantity: parseInt(quantity)} : item);
        setCart(cart);
    }
    
    const handleDeleteCartProduct = (id) => {
        setCart(cart.filter(item => item.product_id !== id));
    };

  return (
    <section className='flex items-center'>
      <section>
        <Image
          shadow="sm"
          radius="lg"
          alt={item.product_name}
          className="object-cover h-20 my-1 z-1"
          src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${item.product_id}/1.png`}
        /> 
      </section>
      <section className='mx-6'>
        <section className='items-center'>
          <p className='font-semibold'>{item.product_name}</p>
        </section>
        <section className='flex w-64 justify-between items-center'>
          {
            item.quantity > 9 ? (
              <section className='flex justify-center mb-4 space-x-2'>
                <Button isIconOnly onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </Button>
                <Input className={`min-w-8 max-w-${item.quantity.toString().length * 2 + 6} m-0`} value={item.quantity.toString()} readOnly/>
                <Button isIconOnly onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </Button>
              </section>
            ) : (
              <Select
                className='w-1/3 my-1 text-center'
                onChange={(e) => handleQuantityChange(item.product_id, e.target.value)} 
                aria-label="Quantity Select"
                selectedKeys={item.quantity.toString()}
              >
                {[...Array(9).keys()].map((i) => <SelectItem key={(i+1).toString()} value={(i+1).toString()} textValue={(i+1).toString()}>{i+1}</SelectItem>)}
                <SelectItem key="10" value="10" textValue="10">+10</SelectItem>
              </Select>
            )
          }
          <p>{(item.price * item.quantity??0).toFixed(2)} €</p>
        </section>
      </section>
      <section className='items-center'>
        <Button
          color="danger"
          variant="light"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteCartProduct(item.product_id, event);
          }}
          className=''
          isIconOnly
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </Button>
      </section>
    </section>
  );
}

export default CartItem;