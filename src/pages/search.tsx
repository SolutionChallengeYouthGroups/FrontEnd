import { useState } from 'react';
import SearchBox from '../components/search_page/SearchBox'
import Results from '../components/search_page/SearchResults'

interface Props {}

const searchView = () => {

    const [search, setSearch] = useState("");
    
    return (
        <>
            <SearchBox setSearch={setSearch} />
            <Results search={search}/>
        </>
    )
}

export default searchView