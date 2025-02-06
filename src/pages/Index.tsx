import { useState, useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Greeting } from "@/components/Greeting";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster"; // ✅ Import Toaster

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // ✅ Ensure useToast is correctly used

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // fakeapi
        //const response = await fetch("https://fakestoreapi.com/products");
        //freeapi
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          price: parseFloat(item.price),
          image: item.image,
          description: item.description,
          category: item.category,
        }));
        setProducts(formattedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // ✅ Show toast when an item is added to the cart
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <>
      <Toaster /> {/* ✅ Ensure Toaster is rendered */}
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
          <div className="container max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-12">
              <Greeting />
              <Cart
                items={cartItems}
                onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
                onUpdateQuantity={(id, quantity) =>
                  setCartItems((prev) =>
                    quantity === 0
                      ? prev.filter((item) => item.id !== id)
                      : prev.map((item) => (item.id === id ? { ...item, quantity } : item))
                  )
                }
              />
            </header>

            <main>
              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
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
