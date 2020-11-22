import {useHistory} from "react-router-dom";
import {React, useState} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";

const SearchBar = () => {
    const history = useHistory()
    const [query, setQuery] = useState()
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }
    const handleSearchClick = (event) => {
        event.preventDefault()
        history.push(`/home/list/search/${query}`)
    }
    return (
        <Form inline>
            <Form.Control
                placeholder="Search"
                onChange={handleQueryChange}/>
            <Button type="submit" onClick={handleSearchClick}>
                Search
            </Button>
        </Form>
    )
}

export default SearchBar;