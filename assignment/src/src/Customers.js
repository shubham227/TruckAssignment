import React, { useEffect, useState } from 'react';
import { Input, Space, Button, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

const duumy = [
    {
        id: 1,
        name: 'abc',
    },
    {
        id: 2,
        name: 'def',
    }
]
const onSearch = value => {
    fetchUser(value);
};

const fetchUser = async (id) => {
    let response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
        },
        mode: 'cors',
    });
    response.json().then((res) => {
        var details = {
            Id: res.data.id,
            Email: res.data.email,
            Name: res.data.first_name + ' ' + res.data.last_name

        };
        alert(JSON.stringify(details))
    })
}



const Customers = () => {
    const [heading, setHeading] = useState();
    const [tableData, setTableData] = useState([]);
    let history = useHistory();
    let i = 1;
    let masterData = [];
    const getData = async (url) => {

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
            },
            mode: 'cors',
        })
        response.json().then((item) => {
            item.data.forEach(element => {
                masterData.push(element)
            });
            if (item.total_pages > i) {
                getData(`https://reqres.in/api/users?page=${++i}`);
            }
            else {
                setTableData(masterData);
            }
        })
    }
    const deleteUser = async (id) => {
        const user_response =    await fetch(`https://reqres.in/api/users/${id}`, {
               method: 'DELETE',
               headers: {
                   "Content-Type": "application/json",
                   "Access-Control-Allow-Origin": "*",
                   "Accept": "application/json",
               },
               mode: 'cors',
               
       });
       if(user_response.status === 204){
        alert('User Deleted');
       }
       
    }
    const handleDelete = (record, tableData) => {
        if(window.confirm('Are you sure want to delete ?')){
            deleteUser(record.id);
        }
            // setTableData(tableData.filter((item) => item.id !== record.id));
        }
        useEffect(() => {
            if(!localStorage.getItem('token')){
                history.push('/')
            }
            var column = [
                {
                    title: 'Id',
                    dataIndex: 'id',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'First Name',
                    dataIndex: 'first_name',
                },
                {
                    title: 'Last Name',
                    dataIndex: 'last_name',
                },
                {
                    title: 'Action',
                    dataIndex: '',
                    render: (text, record, index) => <div><span onClick={() => history.push({
                        pathname: '/edit',
                        state: { detail: record }
                    })}>Edit</span> <span onClick={() => handleDelete(record, tableData)}>Delete</span></div>
                },
            ]
            setHeading(column);
            getData('https://reqres.in/api/users')
        }, [])
        return (
            <div>
                <div>My Customers</div>
                <Search placeholder="Search by id" onSearch={onSearch} enterButton />
                <Button type="primary" onClick={() => history.push('/add')}>Add user</Button>
                <Table
                    columns={heading}
                    dataSource={tableData}
                    bordered={true}
                    pagination={false}
                />
            </div>
        )
    }



    export default Customers; 