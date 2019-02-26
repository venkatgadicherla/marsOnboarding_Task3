
import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from './deletemodal';
import CustomerEditModal from './customerEditModal';





class Customers extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            deleteId: 0,
            customerId: 0,
            customerName: '',
            customerAddress:''
        };
        this.setDeleteId = this.setDeleteId.bind(this);
        this.setEditcustomer = this.setEditcustomer.bind(this);

    }
    setDeleteId(Id) {
        this.setState({ deleteId: Id });
    }
    setEditcustomer(id, name, address) {
        this.setState({ customeraddress: address });
        this.setState({ customerId: id });
        this.setState({ customerName: name });    //customerName: name});
    }


    componentDidMount() {

        fetch('/Customer/GetCustomerList').
            then((Response) => Response.json()).
            then((findresponse) => {
                console.log(findresponse);
                this.setState({ data: findresponse })
            })
    }
    render() {
        return (

            <div>


                <DeleteModal deleteId={this.state.deleteId} window='/Customer/Customer' item='Customer' url='/Customer/DeleteCustomer?CustomerId=' />

                <CustomerEditModal modalheading='Edit Customer' editcustomerId={this.state.customerId}
                    editcustomerName={this.state.customerName} editcustomeraddress={this.state.customerAddress} />

                <CreateButton />
                <table className="ui table">
                    <thead>
                        <tr >
                            <th>Name</th>
                            <th>Address     </th>
                            <th>Action(Edit)    </th>
                            <th>Action(Delete)    </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableData data={this.state.data} setDeleteIdMethod={this.setDeleteId} setEditMethod={this.setEditcustomer} />
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
        alert(this.props.deletecustomerId);
        this.props.setDeleteId_Method(this.props.deletecustomerId);

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

        this.props.setEdit_Method(this.props.customerId, this.props.customerName, this.props.customeraddress);
        $("#modalTitle").html("Update customer");
        $('#hiddenId').val(this.props.customerId);
        $('#lblCustomerNameErr').html('');
        $('#lblAddressErr').html('');
        $('#txtCustomerName').val(this.props.customerName);
        $('#txtCustomerAddress').val(this.props.customerAddress);
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


        $("#modalTitle").html("Create customer");
        $('#hiddenId').val(0);
        $('#lblCustomerNameErr').html('');
        $('#lblAddressErr').html('');
        $('#txtCustomerName').val('');
        $('#txtCustomerAddress').val('');
        $('#btnSave').prop('disabled', true);
        $('#editModal').modal('show');

    }
    render() {
        return (

            <div className="ui blue button" onClick={this.handleClick}>New customer

            </div>
        );
    }
}

class TableData extends React.Component {

    render() {
        return (
            this.props.data.map((customer, key) =>

                <tr key={key}>
                    <td>  <a href="#" >{customer.Name}</a></td>
                    <td>  <a href="#">{customer.Address}</a></td>
                    <td>  <EditButton customerId={customer.Id} customerName={customer.Name} customerAddress={customer.Address} setEdit_Method={this.props.setEditMethod} /></td>
                    <td> <DeleteButton deletecustomerId={customer.Id} setDeleteId_Method={this.props.setDeleteIdMethod} /></td>
                </tr>

            )

        );
    }


}


class customerdata extends React.Component {
    render() {
        return (

            <div className="customerdata">

                {this.props}
            </div>

        );

    }
}



ReactDOM.render(
    <Customers url="/GetcustomerList" pollInterval={2000} />,

    document.getElementById('root')
);




