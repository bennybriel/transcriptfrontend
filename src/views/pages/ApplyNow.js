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

  const ApplyNow = () => {
    useEffect(()=>{
      let username = sessionStorage.getItem('matricno');
       if(username===null || username==='' || username==='undefined')
       {
           history.push('/auth/home')
       }
    },[]);
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const history = useHistory();
 
    const [values, setValues] = useState([]);
    const [valuesCountry, setValueCountry] = useState([]);
    const [valuesState, setValueState] = useState([]);
    const [userinfo, setUserinfo] = useState([]);

    const matricno  = sessionStorage.getItem('matricno');
    const email     = sessionStorage.getItem('email')
    const surname   = sessionStorage.getItem('surname');
    const othername = sessionStorage.getItem('othername');
    const phone = sessionStorage.getItem('phone');
    
    //let userinfo=[];
   

//  useEffect(() => { LoadUserData(matricno);})
     
           
//       //console.log(userinfo)
//    function LoadUserData(mat)
//     {
//            const url ='http://localhost:5000/api/v1/usersdata';
//            const response = axios.post(url,{matricno: mat})
//             .then((response)=>
//             {
              
//               setUserinfo(response.data)
//             })
//             .catch((err)=>{
                
//                 console.log(err);
//             })  
//     }

    
    const urlP ='http://localhost:8001/api/v1/FetchProgrammes' ///'https://ldaas.lautech.edu.ng/api/departments';
    var headers = 
    {
        'Access-Control-Allow-Origin': '*',
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Access-Token':'zh8o1sxdIp0xHatJAmeFHQEXmTmGzped6xhTipZ1b72uEGRsafQjvyomIivg43s6'
    };
  
    

 
  //Fetch Programmes
    useEffect(() => { 
      fetch(urlP, {headers})
      .then((data)=>data.json())
      .then((val)=>setValues(val.data))
      .catch((error) => console.log(error));
    },[]);
  
//Fetch Country
const urlC ='http://localhost:5000/api/v1/country'
useEffect(() => { 
  fetch(urlC)
  .then((data)=>data.json())
  .then((val)=>setValueCountry(val))
  .catch((error) => console.log(error));
},[]);

let handleCountryChange = (e) => {
  var value = e.target.value;
  LoadState(value);
}

//console.log(userData[0].matric);
function LoadState(value) 
{
  const urlS ='http://localhost:5000/api/v1/country/'+value;
   axios.get(urlS)
  .then((response)=>
  {
     //console.log(response.data.data);
      setValueState(response.data.data);  
  })
  .catch((err)=>{
    
      console.log(err);
  })  
};


const handleSubmit = (e) =>
{
  e.preventDefault();
  


  const url = 'http://localhost:8000/api/v1/transcripts/';
  var headers = 
  {
     'Accept':'application/json',
     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmVjNzZlODNkNTY4NzBkZjY2MmM0NjA2MDdjNGVhMGQ1OTdiNTQ2Njg2ODczMGNjMWFlZWE1NWYwMDYyMTcwNTA3MmY0YjNhZTNmZmE5YTYiLCJpYXQiOjE2NzY0OTUzNTEuMDAwNDYxLCJuYmYiOjE2NzY0OTUzNTEuMDAwNDY1LCJleHAiOjE3MDgwMzEzNTAuOTgxMTc3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.yRrnZFUs_6pL9CN8k9vHrpwKWqVhdURbRqw3UdCf6IkthM5KYjAa5sZUdVBeeZn6clCWBdRIZcl4uZ_Nw-Fc_dxMtb0_DyWQ26ORXIe4Ov--MzjfEwgAfyAe3TRL970V2FawkKoVMDRh1F32j_CHYvS-14B78sxah-k_kvyPeNQLeXlHflt5o7kaK7uHQ64oo-WvlNh0h_1mINYs08xR4b82xKDUbQ8ZNaX76aWgpQJ2t875FCuAgf8PVgebrKlq1kaZ9tB28MfdEzZIEa9r5JQdjtu0s9ESzKTPZTLq5wmrN7V0EHbHPdiuc5IAo7Wfc7zkghCOWE-IDdte9NItecIAXI50sRAo3RlEbeRx3b9hrKaoHfwH_Ftx1QkXsUSor1YlyO91rEA2rILf-zrtxZfqVh-3MPaPIuk7kE8IUdGgJwH7ytUoAUJ0Nvny9w0UEznbC_c6OmWS7QYOuHKd7SouDFNn6eo-Gq6-5DVueKMkz2FAvcdpBz9F8B57kacOueYNtpT4jKaDnLN1OiDkhIvxWBU_cXZfyQFUYqAeeaA7aTRgo6iuuVH9Xcvbbz3tWPWAxgw_2XxynuIbOSRU64pB8P6t-x1cxcxyYdC5iimQPGqsGr287HyrQocWnRzg02w3i4oF9KWBhenGvR59GIdYtxTeueCf2Jk8UU5Z6ME'
  };

    const userData = 
    {
      email: e.target.email.value,
      password: e.target.matricno.value,
      matricno: e.target.matricno.value,
      programme: e.target.programme.value,
      state: e.target.state.value,
      country: e.target.country.value,
      surname:    e.target.surname.value,
      othername:  e.target.othername.value,
      phone:e.target.phone.value,

    };
    axios.post(url, userData,{headers}).then((response) => {
      console.log(response.data);
      if(response.status===201)
      {
        sessionStorage.clear();
        sessionStorage.setItem("email", e.target.email.value);
        sessionStorage.setItem('guid',response.data.guid );
        history.push('/admin/prepay',  {email: e.target.email.value, guid: response.data.guid});
                                      
      }
    })
    .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });

};




    return (
        
      <>
         <UserHeader />
        {/* Page content */}
   
        <Container className="mt--7" fluid>
             <ToastContainer position="top-center"></ToastContainer>
            <Row>
            
                <Col className="order-xl-1" xl="10">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Transcript Application Page  [{ matricno }]</h3>
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
                        <Col lg="3">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Matric No.
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="matricno"
                                type="text"
                                value={ matricno  }
                                placeholder="Receipient Email"
                                name="matricno"
                                required 
                                readOnly
                                />
                            </FormGroup>
                            </Col>
                                <Col lg="4">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                    >
                                    SurName
                                    </label>
                                    <Input
                                    className="form-control-alternative"                         
                                    id="surname"
                                    type="text"
                                    value={ surname  }
                                    placeholder="Surname"
                                    name="surname"
                                    required 
                                    readOnly
                                    />
                                </FormGroup>
                                </Col>

                                <Col lg="5">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                    >
                                    Othername
                                    </label>
                                    <Input
                                    className="form-control-alternative"                         
                                    id="name"
                                    type="text"
                                    value={ othername }
                                    placeholder="Othername"
                                    name="othername"
                                    required 
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
                                Email
                                </label>
                                <Input
                                className="form-control-alternative"                         
                                id="email"
                                type="text"
                                value={ email }
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
                                Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="phone"
                                placeholder="Receipient Phone Number"
                                type="text"
                                name="phone"
                                value={phone}
                                required 
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col lg="5">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Programme
                                </label>
                                <select name="programme" id="programme" className="form-control" required>
                                                {
                                                     values.map((opts,i)=><option key={i} value={opts.programmeid}>{opts.name}</option>)
                                                }        
                                </select>
                            </FormGroup>
                            </Col>
                            <Col lg="4">
                            <FormGroup>
                                <label
                                 className="form-control-label"
                                 htmlFor="input-first-name"
                                 >
                                 Country
                                 </label>
                                 <select name="country" id="country" onChange={handleCountryChange} className="form-control" required>
                                               <option value="">Country</option>
                                               {
                                                      valuesCountry.map((item,i)=>
                                                      <option key={i} value={item.countryid}>{item.country}</option>)
                                                    
                                                      
                                                }   

                                                
                                                 
                                             </select>
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
                                <select name="state" id="state" className="form-control" required>
                                             <option value="">State</option>
                                                {
                                                      valuesState.map((stat,i)=><option key={i}>{stat.state}</option>)
                                                }    
                                </select>
                            </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                           
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
     
      </>
    );
  };
  
  export default ApplyNow;
  