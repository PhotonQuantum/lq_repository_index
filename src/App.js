import React, {useState} from "react";
import moment from "moment";
import {GlobalStyles} from 'twin.macro';
import "tailwindcss/dist/base.min.css"
import {useRequest} from "@umijs/hooks";
import {Article, Bottom, Container, Input, ScrollContainer, Title} from "./styles";
import {Intro} from "./components/intro";
import {PkgIndex} from "./components/pkg-index";

function App() {
    const {data: lastUpdate, loading: lastLoading} = useRequest(
        {
            url: "lastupdate",
            method: "get",
            params: {"ts": Date.now()}
        },
        {
            initialData: 0,
            onSuccess: (data, _) => queryFailedPkgs(data[0]),
            formatResult: res => [res, moment(res * 1000).fromNow()]
        })
    const {data: failedPkgs, run: queryFailedPkgs} = useRequest(
        (date) => ({
            url: `log/failed.${date}.log`,
            method: "get"
        }),
        {
            initialData: [],
            manual: true,
            formatResult: res => res.trim().split(" ")
        })
    const [filterName, setFilter] = useState("");
    return (
        <>
            <GlobalStyles/>
            <Container>
                <Title>LightQuantum's Archlinux Repository</Title>
                <hr/>
                <Article>
                    <Intro/>
                    <hr/>
                    <p>The following is a complete list of packages in this repository.</p>
                    <Input placeholder="Filter by name (regex supported)" value={filterName} onChange={(e) => {
                        setFilter(e.target.value.trim())
                    }}/>
                    <ScrollContainer>
                        <PkgIndex filterName={filterName} failedPkgs={failedPkgs}/>
                    </ScrollContainer>
                    <p>{failedPkgs && failedPkgs.length
                    && (failedPkgs.length > 1 || (failedPkgs.length === 1 && failedPkgs[0] !== ""))
                    ? "There are failed builds. " : "All builds completed successfully. "}
                        See <a href={`log/build.${lastUpdate[0]}.log`}>build log</a> for details.</p>
                    <p>Last build task was finished {!lastLoading ? lastUpdate[1] : "N/A"}.</p>
                </Article>
                <Bottom/>
            </Container>
        </>
    );
}

export default App;
