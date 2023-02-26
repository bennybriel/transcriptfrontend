// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
  } from "reactstrap";
  import React, { useState, useEffect }  from 'react'
  import {useLocation,useHistory} from 'react-router-dom';
  import axios from 'axios';
  const Apply = () => {
  
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const history = useHistory();
 
    const [values, setValues] = useState([]);
    const [valuesCountry, setValueCountry] = useState([]);
    const [valuesState, setValueState] = useState([]);
    const initialValue = {
        surname: location.state.surname,
        othername: location.state.othername,
        matricno: location.state.matricno,
      
      };

     
      
      const [formData, setFormData]= useState(initialValue);

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
  
  const matricno = e.target.matricno.value;

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
      surname: e.target.surname.value,
      othername: e.target.othername.value,
      phone:e.target.phone.value,

    };
    axios.post(url, userData,{headers}).then((response) => {
      //console.log(response);
      if(response.status===201)
      {
        setIsLoggedIn(true)
        localStorage.setItem('user', response.data);
        sessionStorage.setItem('surname',e.target.surname.value );
        sessionStorage.setItem('othername',e.target.othername.value );
        sessionStorage.setItem('matricno',e.target.matricno.value );
        sessionStorage.setItem('email',e.target.email.value );

        history.push('/admin/index',  {surname: e.target.surname.value, 
                                       othername:e.target.othername.value,
                                       matricno:e.target.matricno.value,
                                       email:e.target.email.value,
                                       isLoggedIn:isLoggedIn});
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


const validateEmail= (e) =>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    const { validate } = this.state;
  
    if (emailRegex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
  
    this.setState({ validate });
  }



    return (
        
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
          
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Complete Application</small>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="matricno" 
                                                                value={formData.matricno} 
                                                                className="form-control"
                                                                id="matricno" 
                                                                onChange={(e) =>setFormData({...formData, matricno: e.target.value})}
                                                                placeholder="Matriculation Number">
                                                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="surname" type="text"
                     value={ formData.surname } id="surname" 
                    onChange={e => setFormData(e.target.value)} required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="othername" type="text"
                     value={ formData.othername } 
                     id="othername"
                    onChange={e => setFormData(e.target.value)} required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <select name="programme" id="programme" className="form-control" required>
                                                {
                                                     values.map((opts,i)=><option key={i} value={opts.programmeid}>{opts.name}</option>)
                                                }        
                    </select>

                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email" id="email"
                      value={ formData.email } 
                      autoComplete="new-email" required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number"
                     type="text" name="phone"
                     id="phone"
                     required
                  
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                  
                    <label><b>Transcript Destination Country:</b>
                                            The reciepient Country is the country where the recipient body/organization/institution is situated e.g
                                            Nigeria
                                            Canada
                                            USA

                                            </label>
                                            <select name="country" id="country" onChange={handleCountryChange} className="form-control" required>
                                               <option value="">Country</option>
                                               {
                                                      valuesCountry.map((item,i)=>
                                                      <option key={i} value={item.countryid}>{item.country}</option>)
                                                    
                                                      
                                                }   

                                                
                                                 
                                             </select>
                  </InputGroup>
                </FormGroup>                                         
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                  <label><b>Transcript Destination State:</b>
                                                The recipient state in the state/region/district/province where the recipient body/organization/institution is situated e.g
                                                Oyo State
                                                Ontario
                                                Alberta

                                          </label>
                                            <select name="state" id="state" className="form-control" required>
                                             <option value="">State</option>
                                                {
                                                      valuesState.map((stat,i)=><option key={i}>{stat.state}</option>)
                                                }    
                                            </select>
                                      
                   
                  </InputGroup>
                </FormGroup>                              
                  <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                   Submit Application
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Apply;
  