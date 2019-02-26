
import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from './deletemodal';
import StoreEditModal from './storeEditModal';





class Stores extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [],
            deleteId: 0,
            storeId: 0,
            storeName: '',
            storeAddress: ''
        };
        this.setDeleteId = this.setDeleteId.bind(this);
        this.setEditstore = this.setEditstore.bind(this);

    }
    setDeleteId(Id) {
        this.setState({ deleteId: Id });
    }
    setEditstore(id, name, address) {
        this.setState({ storeaddress: address });
        this.setState({ storeId: id });
        this.setState({ storeName: name });    //storeName: name});
    }


    componentDidMount() {

        fetch('/Store/GetStoreList').
            then((Response) => Response.json()).
            then((findresponse) => {
                console.log(findresponse);
                this.setState({ data: findresponse })
            })
    }
    render() {
        return (

            <div>


                <DeleteModal deleteId={this.state.deleteId} window='/Store/Store' item='Store' url='/Store/DeleteStore?StoreId=' />

                <StoreEditModal modalheading='Edit Store' editstoreId={this.state.storeId}
                    editstoreName={this.state.storeName} editstoreaddress={this.state.storeAddress} />

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
                        <TableData data={this.state.data} setDeleteIdMethod={this.setDeleteId} setEditMethod={this.setEditstore} />
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
        alert(this.props.deletestoreId);
        this.props.setDeleteId_Method(this.props.deletestoreId);

        $('#deleteModal').modal('show');
    }

    render() {
        return (
            <div>
                <button className='ui button red' id='btn' onClick={this.handleClick}>
                    <i className='ui icon  large trash '></i> Delete  </button>


            </div>


        );
    }
}

class EditButton extends React.Component {
    //Edit button is used to update the store
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        //On click event is used to set the components of the modal as needed, display the modal reset
        //components as needed
        this.props.setEdit_Method(this.props.storeId, this.props.storeName, this.props.storeaddress);
        $("#modalTitle").html("Update store");
        $('#hiddenId').val(this.props.storeId);
        $('#lblStoreNameErr').html('');
        $('#lblAddressErr').html('');
        $('#txtStoreName').val(this.props.storeName);
        $('#txtStoreAddress').val(this.props.storeAddress);
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
    //Create button is used to create new Store 
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {

        //On Click event is used to clear the components in the modal and show a new product modal

        $("#modalTitle").html("Create store");
        $('#hiddenId').val(0);
        $('#lblStoreNameErr').html('');
        $('#lblAddressErr').html('');
        $('#txtStoreName').val('');
        $('#txtStoreAddress').val('');
        $('#btnSave').prop('disabled', true);
        $('#editModal').modal('show');

    }
    render() {
        return (

            <div className="ui blue button" onClick={this.handleClick}>New Store

            </div>
        );
    }
}

class TableData extends React.Component {

    render() {
        return (
            this.props.data.map((store, key) =>

                <tr key={key}>
                    <td>  <a href="#" >{store.Name}</a></td>
                    <td>  <a href="#">{store.Address}</a></td>
                    <td>  <EditButton storeId={store.Id} storeName={store.Name} storeAddress={store.Address} setEdit_Method={this.props.setEditMethod} /></td>
                    <td> <DeleteButton deletestoreId={store.Id} setDeleteId_Method={this.props.setDeleteIdMethod} /></td>
                </tr>

            )

        );
    }


}


class storedata extends React.Component {
    render() {
        return (

            <div className="storedata">

                {this.props}
            </div>

        );

    }
}



ReactDOM.render(
    <Stores url="/GetstoreList" pollInterval={2000} />,

    document.getElementById('root')
);




