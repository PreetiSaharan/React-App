import React from "react";
import { Table, Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useListContext } from "../context/useListContext";


const Home = () => {
  const {list} = useListContext();

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Table striped className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody> 
                {list.map((item)=>(
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
              ))}     
              </tbody>
            </Table>
            <NavLink to="/lists" className="btn btn-primary">Edit List</NavLink>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export { Home };
