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
import React, { useState, useEffect }  from 'react'
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "components/Headers/Header.js";
import {useHistory} from 'react-router-dom';
import dateFormat from "dateformat";
import axios from "axios";
  const Index = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(()=>{
    let username = sessionStorage.getItem('matricno');
     if(username===null || username==='' || username==='undefined')
     {
         history.push('/auth/home')
     }
  },[]);
  const matricno= sessionStorage.getItem('matricno');

   


  useEffect(() =>{ 
    loaddata(matricno);
  },[]);

//Fetch Applicant Records
const loaddata = async(mat)=>
{
     const url ='http://localhost:5000/api/v1/transcriptrecord';
     const response =await axios.post(url,{matricno: matricno});
    // console.log(response.data);
     setData(response.data)
};

   const deleteRecord = (gid,mat) => 
   {
        if(window.confirm('Are you sure you want to cancel this record'))
        {
             const url ='http://localhost:5000/api/v1/deleteapplication/'+gid;  
             const response = axios.get(url);
             toast.success("Transcript was successfully deleted")
            setTimeout(() => loaddata(matricno), 500)
      
        };
   }
   const payNow = (gid) => 
   {
      sessionStorage.removeItem("guid");
      sessionStorage.setItem('guid', gid);
      history.push('/admin/prepay',{ guid: gid});
   };

   const completeApp = (gid) => 
   {
      sessionStorage.removeItem("guid");
      sessionStorage.setItem('guid', gid);
      history.push('/admin/confirmation',{ guid: gid});
   };
  return (
    <>
      <Header />
      {/* Page content */}
      <ToastContainer position="top-center"></ToastContainer>
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
               
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>  */}
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
          
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Transcript Record</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Not Completed
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Matric.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Programme</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                
                <tbody>
                {data && data.filter(data=>data.issubmitted===0).map((item,i)=>
                                                      
                    <tr key={item.guid}>
                       
                      <td> {++i}</td>
                      <td>{item.matricno}</td>
                      <td>{item.names}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.programme}</td>
                      <td>{item.state}</td>
                      <td>{item.country}</td>
                      <td>{item.ispaid}</td>
                      <td>{
                        dateFormat(item.created_at, "dd-mm-yyyy,hh:mm:ss TT")
                       
                   
                      }</td>
                      <td>
                       {item.ispaid===1  && <Button  color="success"  onClick={() => completeApp(item.guid)}
                          size="sm">
                       
                      
                        Complete Now
                        </Button> 
                     }
                    
                     {item.ispaid===0
                      &&
                        <Button
                        color="success"
                      
                        onClick={() => payNow(item.guid)}
                        size="sm"
                      >
                     
                    
                      Pay Now
                      </Button> 
                    }
                     {item.ispaid===0  &&
                      <Button
                      color="danger"
                    
                      onClick={() =>deleteRecord(item.guid, item.matricno)}
                      size="sm"
                    >
                      Cancel
                    </Button>
                    }
                      </td>

                    </tr>
                    
                  )
                 } 
                </tbody>
              </Table>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Index;
