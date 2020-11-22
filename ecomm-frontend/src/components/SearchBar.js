import {useHistory} from "react-router-dom";
import {React, useState} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";
import Dropdown from "react-bootstrap/cjs/Dropdown";
import '../App.css';
const SearchBar = () => {
    const history = useHistory()
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState(["ALL", 'All'])
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }
    const handleSearchClick = (event) => {
        event.preventDefault()
        history.push(`/home/list/${category[0]}/${query}`)
    }
    const ALL_CATEGORIES = [
        ['ALL', 'All'],
        ['GEN', 'General'],
        ['BOOKS', 'Books'],
        ['BEAUTY', 'Beauty'],
        ['CLOTH', 'Clothing'],
        ['MUSIC', 'Musical Instruments'],
    ]
    return (
        <Form inline>
            <Dropdown>
                <Dropdown.Toggle variant={"secondary"}>
                    {category[1]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {ALL_CATEGORIES.map(cat =>
                        <Dropdown.Item style={{color: "black"}} key={cat[0]} onSelect={() => setCategory([cat[0], cat[1]])}>{cat[1]}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
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