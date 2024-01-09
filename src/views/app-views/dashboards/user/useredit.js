import React from 'react';
import ClientForm from './UserForm';
import { useParams } from 'react-router-dom';

const EditClient = () => {
	const params = useParams();
    //console.log(params)
    
    return (
		<ClientForm mode="EDIT" param={params} />
	)
}

export default EditClient;
