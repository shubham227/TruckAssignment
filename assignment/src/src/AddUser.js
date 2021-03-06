import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const AddUser = () => {
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            history.push('/')
        }
    },[])
    const createUser = async (data) => {
        const user_response =    await fetch('https://reqres.in/api/users', {
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
                   "Access-Control-Allow-Origin": "*",
                   "Accept": "application/json",
               },
               mode: 'cors',
               body: JSON.stringify(data)
       });
       
       user_response.json().then((res) => {
           var user   ={
               Name:res.name,
               Email:res.email,
               Phone: res.phone,
               Username: res.username
           }
           alert( JSON.stringify(user));
           history.push('./admin');
       })
       
       
       }
       const onFinish = (values) => {
           createUser(values);
       
       };
       
       
       const onFinishFailed = (errorInfo) => {
           console.log('Failed:', errorInfo);
       };
    return (
        <div>
            <div>Add User</div>

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your Name' }]}
                >
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input placeholder="Enter usernaname" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email' }]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone' }]}
                >
                    <Input placeholder="Enter Phone" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>

        </div>


    )
}

export default AddUser;