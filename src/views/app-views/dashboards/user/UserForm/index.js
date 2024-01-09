import React, { useState, useEffect } from 'react'
import { Button, message, Input, Row, Col, Card, Form, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import masterService from 'services/MasterService';
import clientService from 'services/ClientService';

import { useNavigate } from 'react-router-dom';



const ADD = 'ADD'
const EDIT = 'EDIT'
const { Option } = Select;


const ClientForm = props => {

    const { mode = ADD, param } = props
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [countryList, setCountryList] = useState([])
    const [statusShow, setStatusShow] = useState(false)
    const [fileChanges, setFilechanges] = useState("");
    const [showImage, setShowImage] = useState("");
    

    const listCountryData = () => {
        const reqeustParam = {}
        try {

            const resp = masterService.getCountry(reqeustParam);
            resp.then(res => {
                //console.log(res.data)
                setCountryList(res.data)


            })
                .catch(err => {

                })

        } catch (errors) {
            console.log(errors)
        }
    }
    
    useEffect(() => {

        listCountryData();

        if (mode === EDIT) {
           // console.log('is edit')
           // console.log('props', props)
            const { id } = param
            const collegeId = parseInt(id)
            
            const reqeustParam = { college_id: collegeId }
            /* const resp = universityService.collegeCourseList(reqeustParam);
            resp.then(res => {
                //console.log(res.data)
                //listStateData(res.data.country_id)
                //listCityData(res.data.state_id)
                statusOnChange(res.data.is_active)
                setShowImage(res.data.logo)
                form.setFieldsValue({
                    name: res.data.name,
                    course_link: res.data.course_link==='undefined'?'':res.data.course_link,
                    code: res.data.code==='undefined'?'':res.data.code,
                    campus: res.data.campus==='undefined'?'':res.data.campus ,
                    address: res.data.address==='undefined'?'':res.data.address ,
                    description: res.data.description==='undefined'?'':res.data.description,
                    country_id: res.data.country_id==='undefined'?'':res.data.country_id,
                    is_active: res.data.is_active==='undefined'?'':res.data.is_active



                    
                });

            })
                .catch(err => {

                })
                */
            
            
            
        }
    }, [form, mode, param, props]);

    

    const onFinish = () => {
        setSubmitLoading(true)
        form.validateFields().then(values => {
            setTimeout(() => {
                setSubmitLoading(false)
                if (mode === ADD) {
                    //console.log(values)
                    let statusname = values.is_active === true ? 1:0
                    
                    
                    const data= new FormData()
                                    
                    data.append('name', values.name)
                    data.append('logo', fileChanges)
                    data.append('is_active', statusname)
                    data.append('country_id', values.country_id)
                    data.append('code', values.code)
                    data.append('campus', values.campus)
                    data.append('address', values.address)
                    data.append('course_link', values.course_link)
                    data.append('description', values.description)
                    //console.log(data);
                   
                   clientService.addClient(data)
                    //console.log(resp)
                    
                   message.success(`College successfully added.`);
                   navigate(`/dashboards/college`)
                   
                    

                }
                if (mode === EDIT) {
                    
                    //console.log(values)
                    
                    const { id } = param
                    const collegeId = parseInt(id)
                    //console.log(collegeId)



                    let statusname = values.is_active === true ? 1: values.is_active === 1 ? 1 : 0
                                        
                    const data= new FormData()
                     
                    
                    data.append('college_id', collegeId)
                    data.append('name', values.name)
                    data.append('logo', fileChanges)
                    data.append('is_active', statusname)
                    data.append('country_id', values.country_id)
                    data.append('code', values.code)
                    data.append('campus', values.campus)
                    data.append('address', values.address)
                    data.append('course_link', values.course_link)
                    data.append('description', values.description)
                    //console.log(data);
                   
                  clientService.editClient(data)
                                    
                  message.success(`College successfully updated.`);
                  navigate(`/dashboards/college`)

                    //message.success(`Product saved`);
                }
            }, 1500);
        }).catch(info => {
            setSubmitLoading(false)
            console.log('info', info)
            message.error('Please enter all required field ');
        });
    };

    
    const statusOnChange = (show) => {
        setStatusShow(show);
    }
    const handleFileChange = (event) => {
        setFilechanges(event.target.files[0]);
    }

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                initialValues={{
                    id:'',
                    name: '',
                    course_link:''
                    
                }}
            >

                <div className="container123" >
                    <Card title={`CLIENT ${mode}`}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="name" label="Client Name"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please enter name!'
                                        }
                                    ]
                                }
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                                                        
                            
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="address" label="Address"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please enter address!'
                                        }
                                    ]
                                }
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            
                            
                            
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                    label="State"
                                    name="country_id"
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: 'Please enter state!'
                                            }
                                        ]
                                    }
                                >
                                    <Select
                                        
                                        showSearch
                                        placeholder="Select Country"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {countryList && countryList.map((countrylist, index) => {
                                            return (

                                                <Option key={`country${index}`} value={countrylist.id}>{countrylist.name}</Option>

                                            )
                                        })
                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                    label="City"
                                    name="country_id"
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: 'Please enter city!'
                                            }
                                        ]
                                    }
                                >
                                    <Select
                                        
                                        showSearch
                                        placeholder="Select Country"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {countryList && countryList.map((countrylist, index) => {
                                            return (

                                                <Option key={`country${index}`} value={countrylist.id}>{countrylist.name}</Option>

                                            )
                                        })
                                        }

                                    </Select>
                                </Form.Item>
                            </Col>           
                            
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="is_active" label="Status">
                                <Switch onChange={statusOnChange} checked={statusShow} />
                                </Form.Item>
                            </Col>         



                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                    {mode === 'ADD' ? 'Submit' : `Save`}
                                </Button>
                            </Col>
                        </Row>


                    </Card>
                </div>
            </Form>
        </>
    )
}

export default ClientForm
