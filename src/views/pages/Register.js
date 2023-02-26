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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { useState } from 'react'
import { useHistory,Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import qs from 'qs';
const Register = () => {

  const initialValue = {
    matricno: '',
};

const[error, setError]= useState('');
const [formData, setFormData]= useState(initialValue);
const [data, setData]= useState({});

const history = useHistory();

const handleSubmit = (e) =>
{
  e.preventDefault();
   validate(e);
  const matricno = e.target.matricno.value;
  const baseurl  = 'http://localhost:5000';
  //const baseurl = "https://pokeapi.co/";
  var headers = 
  {
    'content-type': 'application/x-www-form-urlencoded',
     // 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmVjNzZlODNkNTY4NzBkZjY2MmM0NjA2MDdjNGVhMGQ1OTdiNTQ2Njg2ODczMGNjMWFlZWE1NWYwMDYyMTcwNTA3MmY0YjNhZTNmZmE5YTYiLCJpYXQiOjE2NzY0OTUzNTEuMDAwNDYxLCJuYmYiOjE2NzY0OTUzNTEuMDAwNDY1LCJleHAiOjE3MDgwMzEzNTAuOTgxMTc3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.yRrnZFUs_6pL9CN8k9vHrpwKWqVhdURbRqw3UdCf6IkthM5KYjAa5sZUdVBeeZn6clCWBdRIZcl4uZ_Nw-Fc_dxMtb0_DyWQ26ORXIe4Ov--MzjfEwgAfyAe3TRL970V2FawkKoVMDRh1F32j_CHYvS-14B78sxah-k_kvyPeNQLeXlHflt5o7kaK7uHQ64oo-WvlNh0h_1mINYs08xR4b82xKDUbQ8ZNaX76aWgpQJ2t875FCuAgf8PVgebrKlq1kaZ9tB28MfdEzZIEa9r5JQdjtu0s9ESzKTPZTLq5wmrN7V0EHbHPdiuc5IAo7Wfc7zkghCOWE-IDdte9NItecIAXI50sRAo3RlEbeRx3b9hrKaoHfwH_Ftx1QkXsUSor1YlyO91rEA2rILf-zrtxZfqVh-3MPaPIuk7kE8IUdGgJwH7ytUoAUJ0Nvny9w0UEznbC_c6OmWS7QYOuHKd7SouDFNn6eo-Gq6-5DVueKMkz2FAvcdpBz9F8B57kacOueYNtpT4jKaDnLN1OiDkhIvxWBU_cXZfyQFUYqAeeaA7aTRgo6iuuVH9Xcvbbz3tWPWAxgw_2XxynuIbOSRU64pB8P6t-x1cxcxyYdC5iimQPGqsGr287HyrQocWnRzg02w3i4oF9KWBhenGvR59GIdYtxTeueCf2Jk8UU5Z6ME'
  };
    
     
       axios.post(`${baseurl}/api/v1/registration`, qs.stringify({ 'matricno': matricno}), { headers })
        .then((response)=>
        {
          //console.log(response.data[0].surname);
            
          if(response.data.length ===0) 
          {
            setError("Please Supply Valid Student Matriculation Number"); 
            return;
          }
          
            if(response.data.length > 0) 
            {
                
                ConfirmApplication(matricno,response.data[0].surname,response.data[0].othernames)
            }
          setError('');

          
        })
        .catch((err)=>{
          
            console.log(err);

        })  

};

function ConfirmApplication(mat,sname,oname)
{
  const url = 'http://localhost:5000/api/v1/apply';  
  axios.post(url,{ matricno:mat})
  .then((response)=>
  {
     console.log(response.data);
     //console.log(response.data.length());
    
      if(response.data) 
      {
         
          // window.localStorage.setItem('surname',sname );
          // window.localStorage.setItem('othername',oname );
          // window.localStorage.setItem('matricno',mat );
          // window.localStorage.setItem('email',response.data.email );
  
          history.push('/auth/confirmpasscode',{matricno:mat, email:response.data.email});  
      }
      else 
      {
        // window.localStorage.setItem('surname',sname );
        // window.localStorage.setItem('othername',oname );
        // window.localStorage.setItem('matricno',mat );
       // window.localStorage.setItem('email',response.data.data.email );
         history.push('/auth/apply',{surname: sname, 
                                     othername:oname,
                                     matricno:mat,
                                    });
      }
    setError('');

    
  })
  .catch((err)=>{
    
      console.log(err);

  })  

}

const validate =(e)=>{
  let result = true;
  const mat = e.target.matricno.value;
  if (mat === null || mat==='')
  {
    result = false;
    toast.error('Please Enter Your Matric Number');
   
  }
  return result;
}

  return (
    <>
    
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
          <ToastContainer position="top-center"></ToastContainer>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Please Enter Your Matric. NO</small>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Matriculation No." 
                      type="text" 
                      name="matricno"
                      value={formData.matricno} 
                      className="form-control"
                      id="matricno" 
                      onChange={(e) =>setFormData({...formData, matricno: e.target.value})}
                    />
                  </InputGroup>
                </FormGroup>
              
              
                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                  Submit
                  </Button>
                  {error &&
                      <div className="alert alert-danger">
                                                         { error }
                                                </div>  
                     }
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>

    </>
  );
};

export default Register;
