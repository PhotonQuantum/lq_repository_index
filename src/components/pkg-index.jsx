import React from 'react';
import {useRequest} from "@umijs/hooks";
import moment from "moment";
import {Td, Th, Tr} from "../styles";

export const PkgIndex = ({filterName, failedPkgs}) => {
    const {data, loading} = useRequest(
        {
            url: "meta.json",
            method: "get",
            params: {"ts": Date.now()}
        },
        {
            initialData: [],
            formatResult: res => {
                return res.map(pkg => (
                    {
                        name: pkg.name,
                        version: pkg.version,
                        last_build: moment(pkg.last_built * 1000).fromNow(),
                        filename: pkg.filename
                    }))
            }
        });
    const filterFunc = (pkg, filter) => {
        try {
            const re = new RegExp(filter);
            return re.test(pkg.name);
        } catch (e) {
            return pkg.name.includes(filter);
        }
    }
    return (
        <table>
            <tr>
                <Th>Name</Th>
                <Th>Version</Th>
                <Th>Last Build</Th>
                <Th center>Download</Th>
            </tr>
            {!loading ? data.filter(pkg => filterFunc(pkg, filterName)).map((pkg) => (
                <Tr key={pkg.name} warn={failedPkgs.includes(pkg.name)}>
                    <Td>{pkg.name}</Td>
                    <Td>{pkg.version}</Td>
                    <Td>{pkg.last_build}</Td>
                    <Td center><a href={pkg.filename} target="_blank">Link</a></Td>
                </Tr>
            )) : <p>Loading...</p>}
        </table>
    )
}