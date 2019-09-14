import React from 'react';
import Loading from './Loading'
import ErrorList from './ErrorList'

export default function ComponentWithDetail({ loading, errorList, component }) {
    if(loading)
        return <Loading loading={loading}/>
    else if(errorList)
        return <ErrorList errorList={errorList}/>
    else return component;
}