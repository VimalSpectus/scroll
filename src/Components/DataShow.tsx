import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';


const DataShow = () => {

    const [dataState, setDataState] = useState<any>([]);
    const [pageNum, setPageNum] = useState<any>(0);

    const location = useLocation();

    let navigate = useNavigate();

    const handleClick = (item: any) => {
        navigate(`/${item.objectID}`, { state: item });
    }
    useEffect(() => {
        ApiCall(pageNum);
        setTimeout(() => {
            setPageNum(pageNum + 1);
        }, 10000);
    }, [pageNum])


    const ApiCall = (value: any) => {
        var raw = "";

        var requestOptions = {
            method: 'GET',
            body: raw,
            redirect: 'follow'
        };

        fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + value)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setDataState([...dataState, ...result.hits])
            })
            .catch(error => console.log('error', error));
    }



    return (
        <div data-testid="custom-element">
            <h1>DATA SHOW</h1>
            {dataState.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><h2>Title</h2></TableCell>
                                <TableCell align="center"><h2>Author</h2></TableCell>
                                <TableCell align="center"><h2>Create_At</h2></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataState.map((item: any) => {
                                return (
                                    <TableRow
                                        onClick={() => {
                                            handleClick(item);
                                        }}
                                        data-testid="tableRow-checkid"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{item.title}</TableCell>
                                        <TableCell align="center">{item.author}</TableCell>
                                        <TableCell align="center">
                                            {moment(item.created_at).format('DD MMM YYYY')}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <CircularProgress disableShrink />
            )}
        </div>
    )
}

export default DataShow