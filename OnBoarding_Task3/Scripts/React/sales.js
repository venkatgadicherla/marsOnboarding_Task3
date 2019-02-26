import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from './deletemodal';
import SaleEditModal from './saleEditModal';





class Sales extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            deleteId: 0,
            saleId: 0,
            saleName: '',
            saleAddress: ''
        };
        this.setDeleteId = this.setDeleteId.bind(this);
        //this.setEditsale = this.setEditsale.bind(this);

    }
    setDeleteId(Id) {
        this.setState({ deleteId: Id });
    }
    


    componentDidMount() {

        fetch('/Sales/GetSalesList').
            then((Response) => Response.json()).
            then((findresponse) => {
                console.log(findresponse);
                this.setState({ data: findresponse })
            })






        $.get("/Sales/GetProductList", null, ProductListBind);

        // The follwing function is used to genereate the product list which is used to populate the Select box 
        //.This select box is used in the new or edit modal to add new sales order or edit the sales list
        function ProductListBind(ProductList) {
            var selectProductList = $("#selectProductId")[0];

            for (var i = 0; i < ProductList.length; i++) {
                selectProductList.add(new Option(ProductList[i].Name, ProductList[i].Id));
            }
        }

        $.get("/Sales/GetCustomerList", null, CustomerListBind);
        function CustomerListBind(CustomerList) {

            var selectCustomerList = $("#selectCustomerId")[0];

            for (var i = 0; i < CustomerList.length; i++) {
                selectCustomerList.add(new Option(CustomerList[i].Name, CustomerList[i].Id));
            }
        }
        $.get("/Sales/GetStoreList", null, StoreListBind);
        function StoreListBind(StoreList) {

            var selectStoreList = $("#selectStoreId")[0];

            for (var i = 0; i < StoreList.length; i++) {
                selectStoreList.add(new Option(StoreList[i].Name, StoreList[i].Id));
            }

        }
    }
    
    

    render() {
        return (

            <div>


                <DeleteModal deleteId={this.state.deleteId} window='/Sale/Sale' item='Sale' url='/Sales/DeleteSale?Id=' />

                <SaleEditModal modalheading='Edit Sale' editsaleId={this.state.saleId}
                    editsaleName={this.state.saleName} editsaleaddress={this.state.saleAddress} />

                <CreateButton />
                <table className="ui table">
                    <thead>
                        <tr >
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Store</th>
                            <th>Date</th>
                            <th>Action(Edit)</th>
                            <th>Action(Delete)  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableData data={this.state.data} setDeleteIdMethod={this.setDeleteId} setEditMethod={this.setEditsale} />
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
        alert(this.props.deletesaleId);
        this.props.setDeleteId_Method(this.props.deletesaleId);

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

        //The Click event the components in the modal to the values in the sale which is to be edited
   
        $('#hiddenId').val(this.props.saleId);
        $("#modalTitle").html("Edit Sale");
        $("#selectProductId").val(this.props.productId);
        $("#selectProductId").change();
        $("#selectCustomerId").val(this.props.customerId);
        $("#selectCustomerId").change();
        $("#selectStoreId").val(this.props.storeId);
        $("#selectCustomerId").change();
        $("#selectDateSale").val(this.props.saleDate.split('T')[0]);
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


        $("#modalTitle").html("Create Sale");
        $('#hiddenId').val(0);
        $("#selectProductId").select[0];
        $("#selectCustomerId").select[0];
        $("#selectStoreId").select[0];
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $("#selectDateSale").val(today);
        $('#editModal').modal('show');
    }
    render() {
        return (

            <div className="ui blue button" onClick={this.handleClick}>New sale

            </div>
        );
    }
}

class TableData extends React.Component {

    render() {
        return (
            this.props.data.map((sale, key) =>

                <tr key={key}>
                    <td>  <a href="#" >{sale.ProductName}</a></td>
                    <td>  <a href="#">{sale.CustomerName}</a></td>
                    <td>  <a href="#" >{sale.StoreName}</a></td>
                    <td>  <a href="#">{sale.Date}</a></td>
                    <td>  <EditButton saleId={sale.Id} productId={sale.ProductId} customerId={sale.CustomerId} storeId={sale.StoreId} saleDate={sale.Date}  /></td>
                    <td> <DeleteButton deletesaleId={sale.Id} setDeleteId_Method={this.props.setDeleteIdMethod} /></td>
                </tr>

            )

        );
    }


}


class saledata extends React.Component {
    render() {
        return (

            <div className="saledata">

                {this.props}
            </div>

        );

    }
}



ReactDOM.render(
    <Sales url="/GetSalesList" pollInterval={2000} />, 

    document.getElementById('root')
);
