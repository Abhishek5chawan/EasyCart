import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Greeting } from "@/components/Greeting";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { mockProducts } from "@/data/mockProducts";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      quantity === 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
          <div className="container max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-12">
              <Greeting />
              <Cart
                items={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </header>

            <main>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold">Please sign in to view this page.</p>
        </div>
      </SignedOut>
    </>
  );
};

export default Index;