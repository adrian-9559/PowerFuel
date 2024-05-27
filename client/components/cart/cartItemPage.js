import { Card, CardBody, Image, Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import ProductService from '@services/productService';
import { useCart } from "@hooks/useCart";
import DeleteIcon from '@icons/DeleteIcon';

function CartItemPageComponent({ item }) {
  const { cart, setCart } = useAppContext();
  const { changeQuantity } = useCart()
  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setIsLoaded(false); // Muestra el esqueleto
        const productData = await ProductService.getProductById(item.product_id);
        if (productData) {
          setQuantity(item.quantity);
          setProduct(productData);
        }
        setIsLoaded(true);
      } catch (error) { 
        console.error('Error fetching product:', error.message);
        setIsLoaded(true);
      }
    };

    fetchProducto();
  }, [item]);


  const handleQuantityChange = (id, quantity) => {
    changeQuantity(id, quantity);
  }

  const handleDeleteCartProduct = (id) => {
    setCart(cart.filter(product => product.product_id !== id));
  };

  return (
    product && quantity && (
      <Card
        isBlurred
        className="border-none bg-blue-300 bg-opacity-25 w-auto h-auto"
      >
        <CardBody>
          <section className="flex flex-row items-start gap-4 w-full">
            <section className="w-auto flex items-center justify-center">       
              <img
                alt={product.product_name}
                className="w-auto h-auto relative rounded-large"
                style={{width: '70%', height: '70%'}}
                shadow="md"
                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`}
              />
            </section>
            <section className="flex flex-col w-full">
              <section className="flex w-full">
                <section className="mt-4">
                  <h3 className="text-xl font-medium ">{product.product_name}</h3>
                </section>
                <section className="flex justify-end w-full">
                  <Button
                    isIconOnly
                    className="text-lg bg-red-500 bg-opacity-25 hover:bg-opacity-300" 
                    radius="full"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteCartProduct(product.product_id, event);
                    }}
                  >
                    <DeleteIcon
                      color="red"
                    />
                  </Button>
                </section>
              </section>
              <section className="flex w-full justify-between items-center pt-4 pr-10">
                <section>
                  {
                    quantity > 9 ? (
                      <section className='flex gap-2 justify-center products-center'> {/* Añade products-center */}
                        <Button isIconOnly onClick={() => handleQuantityChange(product.product_id, quantity - 1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </Button>
                        <Input className={`min-w-2 max-w-10 m-0`} value={quantity.toString()} readOnly/>
                        <Button isIconOnly onClick={() => handleQuantityChange(product.product_id, quantity + 1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </Button>
                      </section>
                    ) : (
                      <section className='flex gap-2 justify-center products-center mx-6'>
                        <Select
                          className='min-w-24 justify-center products-center w-auto'
                          onChange={(e) => handleQuantityChange(product.product_id, e.target.value)} 
                          aria-label="Quantity Select"
                          selectedKeys={quantity.toString()}
                        >
                          {[...Array(9).keys()].map((i) => <SelectItem key={(i+1).toString()} value={(i+1).toString()} textValue={(i+1).toString()}>{i+1}</SelectItem>)}
                          <SelectItem key="10" value="10" textValue="10">+10</SelectItem>
                        </Select>
                      </section>
                    )
                  }
                </section>
                <section>
                  <p className="justify-end">{(product.price * quantity??0).toFixed(2)} €</p>
                </section>
              </section>
            </section>
          </section>
        </CardBody>
      </Card>
    )
  );
}

export default CartItemPageComponent;