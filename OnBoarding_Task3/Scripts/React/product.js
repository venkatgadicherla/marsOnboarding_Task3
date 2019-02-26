
import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from './deletemodal';
import EditModal from './editModal';





class Products extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            deleteId: 0,
            productId:0,
            productName:'',
            productPrice:0
        };
        this.setDeleteId = this.setDeleteId.bind(this);
        this.setEditProduct = this.setEditProduct.bind(this);
        
    }
    setDeleteId(Id) {
        this.setState({ deleteId:Id });
    }
    setEditProduct(id,name,price) {
        this.setState({productPrice:price});
        this.setState({ productId: id });
        this.setState({ productName:name });    //productName: name});
    }


    componentDidMount() {

        fetch('/GetProductList').
            then((Response) => Response.json()).
            then((findresponse) => {
                console.log(findresponse);
                this.setState({ data: findresponse })
            })
    }
    render() {
        return (

            <div>
              

                <DeleteModal deleteId={this.state.deleteId} url='/Home/DeleteProduct?productId=' window='/Home/Product' item='Product'/>

                <EditModal modalheading='Edit Product' editProductId={this.state.productId}
                    editProductName={this.state.productName} editProductPrice={this.state.productPrice} />
               
                <CreateButton />
            <table className="ui table">
                <thead>
                    <tr >
                        <th>Name</th>
                         <th>Price     </th>
                         <th>Action(Edit)    </th>
                        <th>Action(Delete)    </th>
                    </tr>
                </thead>
                    <tbody>
                        <TableData data={this.state.data} setDeleteIdMethod={this.setDeleteId} setEditMethod={this.setEditProduct} />
                </tbody>
            </table>
</div>
        );
    }
}


class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        debugger;
        alert(this.props.deleteProductId);
        this.props.setDeleteId_Method(this.props.deleteProductId);

        $('#deleteModal').modal('show');
    }

    render() {
        return (
            <div>
                <button className='ui button red' id='btn' onClick={this.handleClick}>
                    <i className='ui icon trash'></i> Delete  </button>
               
                
            </div>


        );
    }
}

class EditButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
       
        this.props.setEdit_Method(this.props.productId, this.props.productName, this.props.productPrice);
        $("#modalTitle").html("Update Product");
        $('#hiddenId').val(this.props.productId);
        $('#lblProductNameErr').html('');
        $('#lblPriceErr').html('');
        $('#txtProductName').val(this.props.productName);
        $('#txtProductPrice').val(this.props.productPrice);
        $('#editModal').modal('show');
       
    }

    render() {
        return (
            <div>
                <button className='ui button orange' id='btn' onClick={this.handleClick}>
                    <i className='ui icon edit'></i> Edit </button>
              
        
            </div>


        );
    }
}

class CreateButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {
        
      
        $("#modalTitle").html("Create Product");
        $('#hiddenId').val(0);
        $('#lblProductNameErr').html('');
        $('#lblPriceErr').html('');
        $('#txtProductName').val('');
        $('#txtProductPrice').val('');
        $('#btnSave').prop('disabled', true);
        $('#editModal').modal('show');
        
    }
    render() {
        return (

            <div className="ui blue button" onClick={this.handleClick}>New Product
          
            </div>
            );
    }
}

class TableData extends React.Component {

    render() {
        return (
            this.props.data.map((product, key) =>

                <tr key={key}>
                    <td>  <a href="#" >{product.Name}</a></td>
                    <td>  <a href="#"><i className="dollar icon">{product.Price} </i> </a></td>
                    <td ><EditButton productId={product.Id} productName={product.Name} productPrice={product.Price} setEdit_Method={this.props.setEditMethod} /></td>
                    <td> <DeleteButton deleteProductId={product.Id} setDeleteId_Method={this.props.setDeleteIdMethod} /></td>
                </tr>

            )

        );
    }


}


class Productdata extends React.Component {
    render() {
        return (

            <div className="Productdata">

                {this.props}
            </div>

        );

    }
}



ReactDOM.render(
    <Products url="/GetProductList" pollInterval={2000} />,

    document.getElementById('root')
);


