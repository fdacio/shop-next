import { Product } from "@/app/lib/api/types/entities";
import styles from "@/app/ui/products/home/Products.module.css";
import Image from "next/image";
import PlaceholderPhotoProduct from "@/public/products/placeholder-photo.png"
import { formatMoney } from "@/app/lib/formated";
import { Button } from "../../button";

export default function ProductsCardHome({ product }: { product: Product }) {

    function getPhoto(pathPhoto: string) {

        let srcPhoto;

        if (!pathPhoto) srcPhoto = PlaceholderPhotoProduct;
        else srcPhoto = pathPhoto

        return (<Image src={PlaceholderPhotoProduct} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Imagem do produto" priority={true}></Image>);
    }

    return (
        <div className={styles.productsCard}>
            <div className={styles.productsCardProduct}>
                <div className={styles.containerPhoto}>
                    {getPhoto(product.foto)}
                </div>
                <div className={styles.containerName}>
                    <p className={styles.textName}>{product.nome}</p>
                    <p>{product.descricao}</p>
                </div>
                <div className={styles.containerPrice}>
                    <p>{formatMoney(product.preco)}</p>
                </div>
            </div>
            <Button className="w-1/5 bg-black-500 text-yellow-500">Add Cart</Button>
        </div>
    )
}