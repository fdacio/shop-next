import { Product } from "@/app/lib/api/types/entities";
import styles from "@/app/ui/products/products.module.css";
import Image from "next/image";

export default function ProductsCardHome({ product }: { product: Product }) {

    return (
        <div className={styles.productsCard}>
            <div className={styles.containerPhoto}>
                {product.foto &&
                    <Image src={product.foto} width="100" height="150" overrideSrc="/override.jpg" alt="Imagem do produto" ></Image>
                }
            </div>
            <div className="w-80">
                <p className={styles.textName}>{product.nome}</p>
                <p>{product.descricao}</p>
            </div>
        </div>
    )
}