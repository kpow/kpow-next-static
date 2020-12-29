import {useEffect} from 'react';
import {readRemoteFile} from 'react-papaparse'

const Loader = ({ dataResponseHandler }) => {

    useEffect(() => {
        readRemoteFile('kpow-itunes-2015-2020-lite.csv', {
            header: true,
            complete: (data) =>  dataResponseHandler(data.data)
        })
    },[])

    return (
        <div><h4 style={{textAlign: 'center'}}>Loading...</h4></div>
    );

}

export default Loader;
