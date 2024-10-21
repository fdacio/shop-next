import { Product } from "@/app/lib/definitions";
import styles from "@/app/ui/products/products.module.css";

export default function ProductsCardHome({ product }: { product: Product }) {

    return (
        <div className={styles.productsCard}>
            <p className={styles.textName}>{product.nome}</p>
            <p>{product.descricao}</p>
        </div>
    )
}