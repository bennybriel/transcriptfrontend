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
  
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,Button,
    Row,

  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect }  from 'react'
  import axios from "axios";
  import dateFormat from "dateformat";
  import { useHistory } from "react-router-dom";
  import { NumericFormat } from 'react-number-format';
  const Payments = () => 
  {
    const history = useHistory();
    useEffect(()=>{
      let username = sessionStorage.getItem('matricno');
       if(username===null || username==='' || username==='undefined')
       {
           history.push('/auth/home')
       }
    },[]);
    const [datas, setDatas] = useState([]);
    const matricno=    sessionStorage.getItem('matricno');
   useEffect(() =>{ 
     loaddatas(matricno);
   },[]);
 
 //Fetch Applicant Records
 const loaddatas = async(mat)=>
 {
      const url ='http://localhost:5000/api/v1/paymenthistory';
      const response =await axios.post(url,{matricno: matricno});
      setDatas(response.data)
 };
 const DownloadReceipt = (gid) => 
 {
    
 };

 const QueryTransaction = async(tid) => 
 {
    const url ='http://localhost:5000/api/v1/querytransaction';
    const response =await axios.post(url,{tid: tid});
 };
 console.log(datas)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Payment History Logs</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SN</th>
                      <th scope="col">TransactionID</th>
                      <th scope="col">Matric.No</th>
                      <th scope="col">Description</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Response</th>              
                      <th scope="col">PaymentType</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  { datas && datas.map((item,i)=>
                                                      
                    <tr key={item.id}>
                     
                      <td> { ++i }</td>
                      <td>
                       { item.transactionID }
                      </td>
                      <td>
                       { item.matricno}
                      </td>
                      <td>
                      { item.description }
                      </td>
                      <td>
                      &#8358;{item.amount.toLocaleString()}
                      </td>
                      
                     
                      <td className="text-right">
                         { item.response	}
                      </td>
                      <td className="text-right">
                         { item.paymenttype	}
                      </td>
                      <td className="text-right">
                      { dateFormat(item.created_at, "dd-mm-yyyy,hh:mm:ss TT") }
                      </td>
                      <td>
                           {item.ispaid===1
                            &&<span className="text-right">Successful</span>
                           }
                             {item.ispaid===0
                            &&<span className="text-right">Not Successful</span>
                           }
                      </td>
                     <td>
                     {item.ispaid===1  &&
                      <Button
                         color="success"
                         onClick={() =>DownloadReceipt(item.guid)}
                        size="sm"
                       >
                        Download Receipt
                       </Button>                    
                     }
                     {item.ispaid===0  &&
                      <Button
                         color="danger"
                         onClick={() =>QueryTransaction(item.transactionID)}
                        size="sm"
                       >
                        Check Status
                       </Button>                    
                     }
                     </td>
                    </tr>
               )}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        
        </Container>
      </>
    );
  };
  
  export default Payments;
  