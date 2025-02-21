export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type CartItem = Guitar & {
    quantity: number;
}

// Solo funciona para un valor, aunque s epuede colocar en el parametro que recibe la función
// export type GuitarID = Guitar['id']