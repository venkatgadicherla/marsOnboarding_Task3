module.exports = {
    mode: "development",
    context: __dirname,
    entry: {
        
        product: "./product.js",
        customer: "./customer.js",
        store:"./store.js",
        deletemod: "./deletemodal.js",
        deleteFunction: "./deleteFunctionality.js",
        editmodal: "./editModal.js",
        customeredit: "./customerEditModal.js",
        storeedit: "./storeEditModal.js",
        sale: "./sales.js",
        saleedit:"./saleEditModal.js"
       
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name]_bundle.js" 
        
    }
    ,
    watch: true,
    module: {
        rules: [
            {

                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            }
        ]
    }
};