import React, {useState} from "react";
import moment from "moment";
import {GlobalStyles} from 'twin.macro';
import "tailwindcss/dist/base.min.css"
import {useRequest} from "@umijs/hooks";
import {Article, Bottom, Container, Input, ScrollContainer, Title} from "./styles";
import {Intro} from "./components/intro";
import {PkgIndex} from "./components/pkg-index";

function App() {
    const {data: lastUpdate, loading: lastLoading} = useRequest("lastupdate",
        {initialData: 0,
        formatResult: res => moment(res*1000).fromNow()})
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
                        <PkgIndex filterName={filterName}/>
                    </ScrollContainer>
                    <p>Last build task was finished {!lastLoading ? lastUpdate : "N/A"}.</p>
                </Article>
                <Bottom/>
            </Container>
        </>
    );
}

export default App;
