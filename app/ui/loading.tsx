export default function Loading({ isLoading }: { isLoading: boolean }) {

    return (
        <>
            {
                isLoading && <div>Carregando</div>
            }
        </>
    );

}