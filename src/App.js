/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from "react";
import moment from "moment";
import tw, {GlobalStyles} from 'twin.macro';
import "tailwindcss/dist/base.min.css"
import {useRequest} from "@umijs/hooks";

const Container = tw.div`container mx-auto`
const Title = tw.p`font-sans text-2xl text-center mt-10 mb-6 px-6`
const Article = tw.article`prose mt-4 mx-auto px-6 md:px-0`
const Th = tw.th`whitespace-no-wrap`
const ThCenter = tw(Th)`text-center`;
const Td = tw.td`whitespace-no-wrap`
const TdCenter = tw(Td)`text-center`;
const ScrollContainer = tw.div`overflow-x-auto`
const Bottom = tw.div`mb-8`;
const Input = tw.input`border-2 rounded border-solid border-gray-300 hover:border-gray-600 focus:border-gray-600 px-2 py-1 w-full`

function App() {
    const {data: packages, loading: pkgLoading} = useRequest("meta.json", {initialData: []});
    const {data: lastUpdate, loading: lastLoading} = useRequest("lastupdate", {initialData: 0})
    const [filterName, setFilter] = useState("");
    let subDomain = window.location.hostname.split(".");
    subDomain.shift();
    const email = "self@" + subDomain.join(".");
    return (
        <>
            <GlobalStyles/>
            <Container>
                <Title>LightQuantum's Archlinux Repository</Title>
                <hr/>
                <Article>
                    <p>This is my archlinux repository, which contains many packages not provided by official
                        repositories and ArchlinuxCN.</p>
                    <p>You may contact me at <a href={`mailto:${email}`}>{email}</a> if you want to request a new
                        package to be added to this repository, submit a takedown request, or report a bug.</p>
                    <p>To use this repository, please add the following lines to <code>/etc/pacman.conf</code>.</p>
                    <pre>
                        [lightquantum]<br/>
                        SigLevel = Never<br/>
                        Server = https://repo.lightquantum.me
                    </pre>
                    <hr/>
                    <p>The following is a complete list of packages in this repository.</p>
                    <Input placeholder="Filter by name" value={filterName} onChange={(e) => {
                        setFilter(e.target.value.trim())
                    }}/>
                    <ScrollContainer>
                        <table>
                            <tr>
                                <Th>Name</Th>
                                <Th>Version</Th>
                                <Th>Last Build</Th>
                                <ThCenter>Download</ThCenter>
                            </tr>
                            {!pkgLoading ? packages.filter((pkg) => pkg.name.includes(filterName)).map((pkg) => (
                                <tr key={pkg.name}>
                                    <Td>{pkg.name}</Td>
                                    <Td>{pkg.version}</Td>
                                    <Td>{moment(pkg.last_built * 1000).fromNow()}</Td>
                                    <TdCenter><a href={pkg.filename} target="_blank">Link</a></TdCenter>
                                </tr>
                            )) : <p>Loading...</p>}
                        </table>
                    </ScrollContainer>
                    <p>Last build task was finished {!lastLoading ? moment(lastUpdate * 1000).fromNow() : "N/A"}.</p>
                </Article>
                <Bottom/>
            </Container>
        </>
    );
}

export default App;
