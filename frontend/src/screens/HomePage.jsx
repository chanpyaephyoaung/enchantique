import ProductList from "../components/Products/ProductList.jsx";
import Container from "../components/UI/Container.jsx";

const HomePage = () => {
   return (
      <Container type="page">
         <h2 className="text-xl text-clr-black md:text-3xl font-medium mb-9">Our Products</h2>
         <ProductList />
      </Container>
   );
};
export default HomePage;
