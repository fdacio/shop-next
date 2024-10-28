import { Product } from "@/app/lib/api/types/entities";
import styles from "@/app/ui/products/home/products.module.css";
import Image from "next/image";
import PlaceholderPhotoProduct from "@/public/products/placeholder-photo.png"

export default function ProductsCardHome({ product }: { product: Product }) {

    function getPhoto(pathPhoto: string) {
        
        let srcPhoto;

        if(!pathPhoto) srcPhoto = PlaceholderPhotoProduct;
        else srcPhoto = pathPhoto
        
        return (<Image src={PlaceholderPhotoProduct} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Imagem do produto" ></Image>) ;
    }

    return (
        <div className={styles.productsCard}>
            <div className={styles.containerPhoto}>
                {getPhoto(product.foto)}
            </div>
            <div className={styles.containerName}>
                <p className={styles.textName}>{product.nome}</p>
                <p>{product.descricao}</p>
            </div>
        </div>
    )
}