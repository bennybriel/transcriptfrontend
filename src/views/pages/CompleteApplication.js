/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { ToastContainer, toast } from 'react-toastify';
  import React,{ useEffect, useState } from "react";
  import {useLocation,useHistory} from 'react-router-dom';
  import axios from "axios";
  import FormData from 'form-data'


  const CompleteApplication = (pros) => 
  {
    useEffect(()=>{
        let username = sessionStorage.getItem('matricno');
         if(username===null || username==='' || username==='undefined')
         {
             history.push('/auth/home')
         }
      },[]);
    const location = useLocation();
    const [data, setData] = useState([]);
    const [pay, setPay] = useState([]);
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState("");
    const matricno = localStorage.getItem("matricno");
    const gid = localStorage.getItem("guid")
   
    //Check payment status
    const history = useHistory();
    useEffect(() =>{ 
      confirmPayment(gid);
         },[]);

    //Fetch Payment Records
    const confirmPayment = async()=>
    {
        //  const url ='http://localhost:5000/api/v1/confirmation/'+gid;
        //  const response =await axios.get(url);
        //  setPay(response.data)
        //  if(pay.status==='Approved Successful')
        //  {
            // const url ='http://localhost:5000/api/v1/checksubmission/'+gid;
            // const response =await axios.get(url);
            // setPay(response)
            // console.log(pay.status)

            // if(pay.status===200)
            // {    
            //     history.push('admin/index');
            //     toast.error("Sorry!, No Payment Record Found")
            // }

        // }
    };
        

    useEffect(() =>{ 
        fetchdata(gid);
      },[]);

    const fetchdata = async(mat)=>
    {
         const url  = 'http://localhost:5000/api/v1/getoneappinfo/' + gid;
         const response =await axios.get(url);
         setData(response.data.data)
    };
    const saveFile = (e) => {
        
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    //    console.log(e.target.files[0])
      };
      //console.log(file)
    const handleSubmit = async  (e) =>
    {
        e.preventDefault();
        var headers = 
        {    
            'Accept':'application/json',
            "Content-Type": "multipart/form-data",
        };
      
        const mat = matricno;
        const tid = data.transactionID;
        const ema = e.target.email.value;
        const pho = e.target.phone.value;
        const ad1  = e.target.address1.value;
        const ad2 = e.target.address2.value;
        const cname = e.target.contactname.value;
        const coname = e.target.names.value;
        const tlabel = e.target.file.value;

       // console.log(file)
        let formData = new FormData();
        formData.append("transcriptlabel", file)
       // formData.append("fileName", fileName);
        //console.log('file' +file);
        console.log('file' + formData);
        const baseurl = "http://localhost:5000";
        axios.post(`${baseurl}/api/v1/completeapplications`,{
             ema,pho, coname, cname, ad1, ad2, tlabel, gid,mat, tid, formData
         }, {
                headers: {
                'Content-Type': 'multipart/form-data',
           
              
                 },
            })
         .then((response) =>
          {
               console.log(response.status)
                if(response.status===200)
                {
                    toast.success("Application Submitted Successfully!");
                    history.push('admin/index');
                    
                }
                if(response.status===210)
                {             
                    //history.push('admin/index');
                    toast.error("Sorry, TransactionID Already Used!");
                }

                if(response.status===250)
                {             
                    //history.push('admin/index');
                    toast.error("Sorry, No Successful Payment For The TransactionID!");
                }
          })
          .catch((error) => {
              if (error.response) 
              {
                console.log(error.response);
                console.log("server responded");
              } else if (error.request) {
                console.log(error);
              } else {
                console.log(error);
              }
            });
      
            
    }   

   
   return(
      <>
        <UserHeader />
        {/* Page content */}
      { data &&
        <Container className="mt--7" fluid>
             <ToastContainer position="top-center"></ToastContainer>
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Complete Application Page  [{ matricno }]</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                        User information [{ matricno }]
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                Company/Organization Name
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    name="names"
                                    id="names"
                                    placeholder="Organization Name"
                                    type="text"
                                    required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                Receipients Contact Person
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="contactname"
                                placeholder="Receipients Contact Person"
                                type="text"
                                name="contactname"
                                required 
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Receipient Email
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="email"
                                type="text"
                              
                                placeholder="Receipient Email"
                                name="email"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Receipient Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="phone"
                                placeholder="Receipient Phone Number"
                                type="text"
                                name="phone"
                               
                                required 
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Receipient Address 1
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="address1"
                                type="text"
                               
                                placeholder="Receipient Address 1"
                                name="address1"
                                required 
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 Receipient Address 2
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="address2"
                                 type="text"
                               
                                 placeholder="Receipient Address 2"
                                 name="address2"
                                
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Receipient Country
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="country"
                                type="text"
                                value={data.country}   
                                name="country"
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="3">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 State
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="state"
                                 type="text"
                                 value={ data.state }
                                 name="state"
                                 readOnly
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="3">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 TransactionID
                                 </label>
                                 <Input
                                 className="form-control-alternative"                         
                                 id="transactionID"
                                 type="text"
                                 value={ data.transactionID }
                                 name="transactionID"
                                 readOnly
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Transcript Label(Optional)
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="file"
                                type="file"
                                onChange={(e)=>{ setFile(e.target.files[0]);}}
                                name="file"
                                
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                                <div className="text-center">
                                    <Button className="mt-4" color="success" type="submit">
                                    Submit Application
                                </Button>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                    
                    
                    </form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
         
        </Container>
     }
      </>
    );
  };
  
  export default CompleteApplication;
  