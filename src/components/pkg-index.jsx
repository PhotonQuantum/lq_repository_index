import {useRequest} from "@umijs/hooks";
import moment from "moment";
import {Td, TdCenter, Th, ThCenter} from "../styles";
import React from "react";

export const PkgIndex = ({filterName}) => {
    const {data, loading} = useRequest("meta.json",
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
                <ThCenter>Download</ThCenter>
            </tr>
            {!loading ? data.filter(pkg => filterFunc(pkg, filterName)).map((pkg) => (
                <tr key={pkg.name}>
                    <Td>{pkg.name}</Td>
                    <Td>{pkg.version}</Td>
                    <Td>{pkg.last_build}</Td>
                    <TdCenter><a href={pkg.filename} target="_blank">Link</a></TdCenter>
                </tr>
            )) : <p>Loading...</p>}
        </table>
    )
}