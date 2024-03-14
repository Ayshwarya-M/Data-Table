import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
let customStyles = {
  headRow: {
    style: { background: "#52e2ca" }
  },
  headcells: {
    style: { color: "blue", fontSize: "18px" }

  },
  cells: {
    style: {
      color: "#206156", fontSize: "14px"
    }

  }
}
function Table() {

  let column = [
    {
      name: "CreatedBy",
      selector: row => row.createdBy,
      sortable: true
    },
    {
      name: "CategoryId",
      selector: row => row.categoryId,
      sortable: true
    },
    {
      name: "Category",
      selector: row => row.category,
      sortable: true
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true
    },

    {
      name: "Action",
      cell: row => (
        <div>
          <Button onClick={() => handleEdit(row.categoryId)}>Edit</Button> &nbsp;
          <Button onClick={() => handledelete(row.categoryId)}>Delete</Button>

        </div>
      )
    }
  ]
  let handleEdit = (id) => {
    let res = records.filter(item => item.categoryId == id)
    res.map(val => {
      setResult({
        ...result,
        category: val.category,
        description: val.description,
        createdBy: 1,
        categoryId: val.categoryId
      })
      setText("update")
      setEdit(true)
    })
  }
 

  let [text, setText] = useState("save")
  let [edit, setEdit] = useState(false)
  const [result, setResult] = useState({ createdBy: 1, categoryId: '', category: '', description: '' });
  let [records, setRecords] = useState([])
  const handleChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("http://catodotest.elevadosoftwares.com/Category/GetAllCategories").then(res => {
      setRecords(res.data.categoryList)
    })
  }, []);


  let handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit")
    if (edit) {

      handleUpdate()
    }
    else {
      handleSave()
    }

  }

  let handleSave = () => {
    let data = {
      category: result.category,
      description: result.description,
      createdBy: 1,
      categoryId: 0,
    }
    axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)
    console.log(data)
    alert("saved")
  }

  let handleUpdate = () => {
    let data = {
      category: result.category,
      description: result.description,
      createdBy: 1,
      categoryId: result.categoryId
    }
    console.log(data)
    axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)
    console.log(data)
    alert("Update")
  }
  let handleCancel = () => {
    setResult({
      category:"",
      description:"",
      createdBy: 1,
      categoryId:"",
    })

  }
  let handledelete = (id) => {
     let data={
      categoryId:id,
      removedRemarks:"Test",
      createdBy:1
  }
   axios.post("http://catodotest.elevadosoftwares.com/Category/RemoveCategory",data);
  
 }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control type="name" name="category" value={result.category} onChange={handleChange} placeholder="category" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control type="name" name="description" value={result.description} onChange={handleChange} placeholder="description" />
          </Col>
        </Form.Group>
        <Button variant="primary" type='submit'>{text}</Button>{' '}
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>{' '}
        
      </Form>

      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={13}
        paginationRowsPerPageOptions={[7, 14, 21, 28, 35]}
        selectableRows
        selectableRowsHighlight
        highlightOnHover
      />
    </div>
  );
}

export default Table;
