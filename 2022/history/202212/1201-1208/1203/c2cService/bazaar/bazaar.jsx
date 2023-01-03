import useState from 'react';
import react from 'react';

const Bazaar = () => {
   const [bazaar, setBazaar] = useState(null);
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch('https://api.hypixel.net/skyblock/bazaar');
         const json = await response.json();
         setBazaar(json);
         setLoading(false);
      };
      fetchData();
   }, []);
   
   if (loading) {
      return <div>Loading...</div>;
   }
   
   return (
      <div>
         {bazaar.products.map((product) => (
         <div key={product.product_id}>
            <h2>{product.product_id}</h2>
            <p>{product.quick_status.buyPrice}</p>
         </div>
         ))}
      </div>
   );
}