import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { BrandProvider } from "./BrandContext";
import { SupplierProvider } from "./SupplierContext";
import { StockProvider } from "./StockContext";
import CartProvider from "./CartContext";
import CustomerProvider from "./CustomerContext";
import { SettingProvider } from "./SettingContext";

function ContextsProvider({ children }) {
    return (
        <SettingProvider>
            <ProductProvider>
                <CategoryProvider>
                    <BrandProvider>
                        <SupplierProvider>
                            <CustomerProvider>
                                <StockProvider>
                                    <CartProvider>{children}</CartProvider>
                                </StockProvider>
                            </CustomerProvider>
                        </SupplierProvider>
                    </BrandProvider>
                </CategoryProvider>
            </ProductProvider>
        </SettingProvider>
    );
}

export default ContextsProvider;
