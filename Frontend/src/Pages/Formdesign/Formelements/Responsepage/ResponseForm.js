import React, { useEffect, useState } from 'react';
import UserFormpage from '../../../UserForm/UserFormPage/UserFormpage';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ResponseForm = ({formid1,responseData1}) => {


    const [responseData,setResponseData]=useState()
    const responseid=useParams()
    const responseState=useLocation.state
      


    const {token}=useSelector((state)=>state.userSlice)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // const res = await axios.get(
    //     `http://localhost:5000/form/${formid}`,
    //     config
    //   );

    useEffect(()=>{fetchResponsedata()},[])

    const fetchResponsedata = async () => {
      try {
        const res = await axios.get(
          `/form/${responseid}`,
          config
        );
        if (res.status == 200) {
          setResponseData(res);
        }
      } catch (e) {
        
      }
    };
    //useparam for userid to get data from responsetable usig axios

   
    return (
        <div>
            <UserFormpage responseData={responseData1} formid={formid1}/>
        </div>
    );
};

export default ResponseForm;