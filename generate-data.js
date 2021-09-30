const faker = require('faker');
const fs = require('fs');
const { name } = require('faker/locale/zh_TW');
const { date } = require('faker');
faker.locale = 'vi';


// onsole.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.datatype.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());

//category
const randomCategoryList = (n) =>{
    if(n < 1) return [];
    const categoryList = []
    Array.from(new Array(n)).forEach(()=>{
        const category ={
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()   
        };
        categoryList.push(category);
    });
    return categoryList;
};

//product
const randomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts < 1) return [];
    const productList = []
    //random
    for(const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(()=>{
            const  product ={
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(400, 400),   
            };
            productList.push(product);
        });
    }
    return  productList;
};

(()=>{
    //random
    const categoryList = randomCategoryList(5);
    const productList = randomProductList(categoryList, 5);
    //prepare
    const db ={
        categories: categoryList,
        products: productList,
        profile:{
            name : "Po"
        },
    };
    fs.writeFile('db.json', JSON.stringify(db), ()=> {
        console.log("Generate data successfully =))");
    })
})()