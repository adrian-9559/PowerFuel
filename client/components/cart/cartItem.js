import { Button, Image, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import ProductService from "@services/productService";

function Cartproduct({ item }) {
  const { cart, setCart } = useAppContext();
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
        setIsLoaded(true); // Muestra el contenido del esqueleto
      }
    };
  
    fetchProducto();
  }, [item]);


  const handleQuantityChange = (id, quantity) => {
    if (quantity > 50) {
      quantity = 50;
    }
    const newCart = cart.map(product => product.product_id === id ? {...product, quantity: parseInt(quantity)} : product);
    
    setCart(newCart);
  }
  
  const handleDeleteCartProduct = (id) => {
      setCart(cart.filter(product => product.product_id !== id));
  };


    

  return (
    product && quantity && (
      <motion.section
        initial={{ opacity: 0, height: "auto" }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: "auto" }}
        transition={{ duration: 0.3 }}
        className='flex products-center justify-between w-full gap-2' // Add justify-between here
        >
      <section className="w-auto">
        <Image
          shadow="sm"
          radius="lg"
          alt={product.product_name}
          className="object-cover h-20 my-1 z-1 w-full"
          src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`}
        /> 
      </section>
      <section className='flex-grow flex flex-col gap-2'>
        <section className='products-center max-w-40'>
            <Tooltip content={product.product_name} delay={1500}>
                <p className='font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>{product.product_name}</p>
            </Tooltip>
        </section>
        <section className='flex gap-2 justify-center products-center'>
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
          <section className='flex items-center justify-center'>
            <p className="h-full">{(product.price * quantity??0).toFixed(2)} €</p>
          </section>
        </section>
      </section>
      <section className='products-center'>
        <Button
          color="danger"
          variant="light"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteCartProduct(product.product_id, event);
          }}
          className='m-1'
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
    </motion.section>
    )
  );
}

export default Cartproduct;