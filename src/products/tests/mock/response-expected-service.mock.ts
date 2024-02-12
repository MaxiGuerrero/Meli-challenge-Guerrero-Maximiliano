export const getAllProductsExpected = {
  paging: {
    total: 431,
    primary_results: 431,
    offset: 0,
    limit: 2,
  },
  categories: [
    'Libros Físicos',
    'Muebles para el Hogar',
    'Juegos y Juguetes',
    'Arte, Librería y Mercería',
    'Bazar y Cocina',
    'Jardin y Aire Libre',
    'Electrónica, Audio y Video',
    'Música, Películas y Series',
    'Organización para el Hogar',
    'Computación',
    'Deportes y Fitness',
    'Servicios',
  ],
  items: [
    {
      id: 'MLA1370193876',
      title: 'Cucharón Silicona Con Mango Metal Utensilio Color Pastel',
      price: {
        amount: 1,
        currency: 'ARS',
        decimals: 1290,
      },
      picture: 'http://http2.mlstatic.com/D_761558-MLA54336822993_032023-I.jpg',
      condition: 'new',
      free_shipping: false,
    },
    {
      id: 'MLA1107624257',
      title: 'Maceta Plastica Soplada N°12 Indoor 25 Unidades Souvenirs',
      price: {
        amount: 1,
        currency: 'ARS',
        decimals: 1920,
      },
      picture: 'http://http2.mlstatic.com/D_623484-MLA47821778029_102021-I.jpg',
      condition: 'new',
      free_shipping: false,
    },
  ],
};

export const getProductByIdExpected = {
  author: { lastname: '', name: '' },
  item: {
    condition: 'new',
    description:
      'Disfruta de colores vibrantes y una imagen vívida con el Smart Tv Samsung 2021 Un50au7000gczb Uhd 4k Tizen Led 50. CARACTERÍSTICAS: - PurColor: Permite que el televisor exprese una amplia gama de colores para un rendimiento de imagen óptimo y una experiencia de visualización inmersiva. - Aumento de 4K: Asegura una resolución de hasta 4K para el contenido que amas, con expresiones de color más realistas gracias a su sofisticada tecnología de asignación de color. - Rendimiento claro: Calcula y compensa automáticamente los fotogramas de la fuente de contenido. - 4K UHD: Supera los límites del FHD con 4 veces más píxeles para que tus ojos capten las imágenes nítidas y claras. Ahora puedes ver incluso los detalles más pequeños en cada escena. - Alto rango dinámico (HDR): Aumenta los niveles de luz del televisor para que puedas disfrutar de un enorme espectro de colores y detalles visuales, incluso en las escenas más oscuras. - Diseño elegante: Fabricado con un estilo minimalista impecable desde cada uno de los ángulos y un diseño ilimitado que establece estándares nuevos. - Organización de cables: Mantén tus cables ordenados y escóndelos para disminuir el desorden y mantener una apariencia perfecta en tu TV. - Acceso fácil: Accede fácilmente a tu PC, computadora portátil y teléfono móvil directamente desde tu TV. - Transmisión con un toque: Cuando toques el televisor con tu teléfono móvil, el televisor recibirá la acción y reflejará el contenido automáticamente. Podrás disfrutar de transmitir tu contenido favorito en tu televisor de forma rápida y sencilla.',
    free_shipping: undefined,
    id: 'MLA1404685051',
    picture: 'http://http2.mlstatic.com/D_770150-MLU74116121224_012024-O.jpg',
    price: { amount: 40, currency: 'ARS', decimals: 443479 },
    sold_quantity: 1,
    title: 'Smart Tv Samsung 2021 Un50au7000gczb Uhd 4k Tizen Led 50',
  },
};
