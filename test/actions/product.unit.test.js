import productAcciones from "../../src/actions/product/product"

/**
 * El objetivo del test unitario es probar el comportamiento específico
 * de cada función en productAcciones
 */
describe('Test products acciones', () => {
    beforeEach(() => {
        // Para que cada prueba quede limpia, borrar los products
        productAcciones.clearProducts()
    })

    /**
     * Test de la función getProducts
     * Caso de prueba:
     * 1. Se acaba de iniciar el proyecto, no hay product registrado
     *    => Debería retornar un arreglo vacío
     */
    test('Debería retornar un arreglo vacío', async () => {
        const products = productAcciones.getProducts()
        expect(products.length).toBe(0)
    })

    /**
     * Test de la función createProduct
     * Caso de prueba:
     * 1. Se cree un product con los datos correctos
     *    => Debería retornar un arreglo con el product
     */
    test('Debería retornar un arreglo vacío', async () => {
        const newProduct = getMockProduct1()
        const result = productAcciones.createProduct(newProduct)
        const products = productAcciones.getProducts()

        expect(products.length).toBe(1)
        expect(products[0]).toEqual(result)
        expect(result.id).toBe(1)
        expect(result.nombre).toBe(newProduct.nombre)
        expect(result.precio).toBe(newProduct.precio)
        expect(result.cantidad).toBe(newProduct.cantidad)
        expect(result.categorias).toBe(newProduct.categorias)
    })


    /**
     * Test de la función createProduct
     * Caso de prueba:
     * 2. Se cree un product con datos faltantes
     */
    test('Debería retornar un error', async () => {
        expect(() => productAcciones.createProduct()).toThrowError("Datos del product no proporcionados")

        const newProduct = getMockProduct1()
        delete newProduct.nombre
        expect(() => productAcciones.createProduct(newProduct)).toThrowError("Datos del product no proporcionados")

        const newProduct2 = getMockProduct1()
        delete newProduct2.precio
        expect(() => productAcciones.createProduct(newProduct2)).toThrowError("Datos del product no proporcionados")

        const newProduct3 = getMockProduct1()
        delete newProduct3.cantidad
        expect(() => productAcciones.createProduct(newProduct3)).toThrowError("Datos del product no proporcionados")

        const newProduct4 = getMockProduct1()
        delete newProduct4.categorias
        expect(() => productAcciones.createProduct(newProduct4)).toThrowError("Datos del product no proporcionados")
        
        const newProduct5 = getMockProduct1()
        newProduct5.nombre = ""
        expect(() => productAcciones.createProduct(newProduct5)).toThrowError("Datos del product no proporcionados")

        const newProduct8 = getMockProduct1()
        newProduct8.categorias = []
        expect(() => productAcciones.createProduct(newProduct8)).toThrowError("Datos del product no proporcionados")

        const products = productAcciones.getProducts()
        expect(products.length).toBe(0)
    })

    /**
     * Test de la función getProducts
     * Caso de prueba:
     * 2. Se cree un product con los datos correctos
     *    => Debería retornar un arreglo con un product
     * -> Verificado en el test de createProduct
     * 
     * 3. Se cree un product con datos faltantes
     *    => Debería retornar un error y no agregar el product
     * -> Verificado en el test de createProduct
     * 
     * 4. Se cree dos products con los datos correctos
     *    => Debería retornar un arreglo con los dos products
     */
    test('Debería retornar un arreglo con dos products', async () => {
        const newProduct = getMockProduct1()
        const newProduct2 = getMockProduct2()
        const result1 = productAcciones.createProduct(newProduct)
        const result2 = productAcciones.createProduct(newProduct2)
        const products = productAcciones.getProducts()

        expect(products.length).toBe(2)
        expect(products[0]).toEqual(result1)
        expect(products[1]).toEqual(result2)
        expect(result1.id).toBe(1)
        expect(result2.id).toBe(2)
        expect(result1.nombre).toBe(newProduct.nombre)
        expect(result1.precio).toBe(newProduct.precio)
        expect(result1.cantidad).toBe(newProduct.cantidad)
        expect(result1.categorias).toBe(newProduct.categorias)
        expect(result2.nombre).toBe(newProduct2.nombre)
        expect(result2.precio).toBe(newProduct2.precio)
        expect(result2.cantidad).toBe(newProduct2.cantidad)
        expect(result2.categorias).toBe(newProduct2.categorias)
    })

    /**
     * Test de la función getProductsByCategory
     * Caso de prueba:
     * 1. Se cree 3 products con los datos correctos, con al menos 1 categoria igual para 2 de los 3 y se busca los products por esa categoría, por orden ascendente y descendente de prceio
     *    => Debería retornar los product de la buena categoria, ordenados por precio correctamente
     */
    test('Debería retornar el product correcto', async () => {
        const newProduct = getMockProduct1()
        const newProduct2 = getMockProduct2()
        const newProduct3 = getMockProduct3()
        const result = productAcciones.createProduct(newProduct)
        const result2 = productAcciones.createProduct(newProduct2)
        const result3 = productAcciones.createProduct(newProduct3)
        
        const allProducts = productAcciones.getProducts()
        const products = productAcciones.getProductsByCategory("bebidas", "asc")
        const products2 = productAcciones.getProductsByCategory("bebidas", "desc")
        const products3 = productAcciones.getProductsByCategory("bebidas")

        expect(allProducts.length).toBe(3)
        expect(products.length).toBe(2)
        expect(products2.length).toBe(2)
        expect(products3.length).toBe(2)
        expect(products[0]).toEqual(result2)
        expect(products[1]).toEqual(result3)
        expect(products2[0]).toEqual(result3)
        expect(products2[1]).toEqual(result2)
        expect(products3).toEqual(products)
    })

    /**
     * Test de la función getProductsByCategory
     * Caso de prueba:
     * 2. Se cree 2 products con los datos correctos y se busca products de una categoria incorrecta o faltante, o con un orden incorrecto
     *    => Debería retornar un error
     */
    test('Debería retornar un error', async () => {
        const newProduct = getMockProduct1()
        const newProduct2 = getMockProduct2()
        const result = productAcciones.createProduct(newProduct)
        const result2 = productAcciones.createProduct(newProduct2)

        expect(() => productAcciones.getProductsByCategory()).toThrowError("Categoria no proporcionada")
        expect(() => productAcciones.getProductsByCategory("refrescos")).toThrowError("No product encontrado con este categoria")
        expect(() => productAcciones.getProductsByCategory("dulces", "")).toThrowError("Orden no valido")
    })

    /**
     * Test de la función updateProduct
     * Caso de prueba:
     * 1. Se cree un product con los datos correctos y se actualice el product con datos correctos (uno o varios campos)
     *    => Debería retornar el product actualizado
     */
    test('Debería retornar el product actualizado', async () => {
        const newProduct = getMockProduct1()
        const result = productAcciones.createProduct(newProduct)

        const productActualizado = getMockProduct2()
        const result2 = productAcciones.updateProduct(result.id, productActualizado)
        const products2 = productAcciones.getProducts()
        
        expect(products2.length).toBe(1)
        expect(products2[0]).toEqual(result2)
        expect(result2.id).toBe(1)
        expect(result2.nombre).toBe(productActualizado.nombre)
        expect(result2.precio).toBe(productActualizado.precio)
        expect(result2.cantidad).toBe(productActualizado.cantidad)
        expect(result2.categorias).toBe(productActualizado.categorias)

        const result3 = productAcciones.updateProduct(result.id, {nombre: "Nuevo nombre"})
        const products3 = productAcciones.getProducts()

        expect(products3.length).toBe(1)
        expect(products3[0]).toEqual(result3)
        expect(result3.id).toBe(1)
        expect(result3.nombre).toBe("Nuevo nombre")

        const result4 = productAcciones.updateProduct(result.id, {precio: 10})
        const products4 = productAcciones.getProducts()

        expect(products4.length).toBe(1)
        expect(products4[0]).toEqual(result4)
        expect(result4.id).toBe(1)
        expect(result4.precio).toBe(10)

        const result5 = productAcciones.updateProduct(result.id, {cantidad: 10})
        const products5 = productAcciones.getProducts()

        expect(products5.length).toBe(1)
        expect(products5[0]).toEqual(result5)
        expect(result5.id).toBe(1)
        expect(result5.cantidad).toBe(10)

        const result6 = productAcciones.updateProduct(result.id, {categorias: ["Nueva categoria"]})
        const products6 = productAcciones.getProducts()

        expect(products6.length).toBe(1)
        expect(products6[0]).toEqual(result6)
        expect(result6.id).toBe(1)
        expect(result6.categorias.length).toBe(1)
        expect(result6.categorias[0]).toBe("Nueva categoria")
    })

    /**
     * Test de la función updateProduct
     * Caso de prueba:
     * 2. Se cree un product con los datos correctos y se actualice el product con datos incorrectos o faltantes
     */
    test('Debería retornar un error', async () => {
        const newProduct = getMockProduct1()
        const result = productAcciones.createProduct(newProduct)

        expect(() => productAcciones.updateProduct()).toThrowError("Id del product no proporcionado")
        expect(() => productAcciones.updateProduct(2)).toThrowError("No product encontrado con este id")
        expect(() => productAcciones.updateProduct(result.id)).toThrowError("Datos del nuevo product no proporcionados")
        expect(() => productAcciones.updateProduct(result.id, {})).toThrowError("Datos del nuevo product no proporcionados")
        expect(() => productAcciones.updateProduct(result.id, {nombre: ""})).toThrowError("Datos del nuevo product no proporcionados")
        expect(() => productAcciones.updateProduct(result.id, {categorias: []})).toThrowError("Datos del nuevo product no proporcionados")
        
        const products = productAcciones.getProducts()
        expect(products[0]).toEqual(result)
    })

    /**
     * Test de la función deleteProduct
     * Caso de prueba:
     * 1. Se cree un product con los datos correctos y se elimine el product con el id correcto
     *    => Debería eliminar el product
     */
    test('Debería eliminar el product', async () => {
        const newProduct = getMockProduct1()
        const result = productAcciones.createProduct(newProduct)

        const deleted = productAcciones.deleteProduct(result.id)
        const products = productAcciones.getProducts()

        expect(products.length).toBe(0)
        expect(deleted).toEqual(1)
    })

    /**
     * Test de la función deleteProduct
     * Caso de prueba:
     * 2. Se cree un product con los datos correctos y se elimine el product con el id incorrecto o faltante
     *    => Debería retornar un error
     */
    test('Debería retornar un error', async () => {
        const newProduct = getMockProduct1()
        const result = productAcciones.createProduct(newProduct)

        expect(() => productAcciones.deleteProduct()).toThrowError("Id del product no proporcionado")
        expect(() => productAcciones.deleteProduct(2)).toThrowError("No product encontrado con este id")

        const products = productAcciones.getProducts()
        expect(products.length).toBe(1)
    })
})


function getMockProduct1 () {
    return {
        nombre: "Kit Kat",
        precio: 1.00,
        cantidad: 15,
        categorias: ["dulces", "chocolates"]
    }
}

function getMockProduct2 () {
    return {
        nombre: "Agua mineral",
        precio: 1.25,
        cantidad: 12,
        categorias: ["bebidas", "agua"]
    }
}

function getMockProduct3 () {
    return {
        nombre: "Coca-Cola",
        precio: 3.50,
        cantidad: 10,
        categorias: ["bebidas", "refrescos"]
    }
}
