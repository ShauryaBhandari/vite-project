// src/Search.tsx

import React, { useState } from 'react';
import { Input, Checkbox, Button, List } from 'antd';
import { dummyData } from './data';
import { filter, includes } from 'lodash';

const Search: React.FC = () => {
  const [name, setName] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    const filteredData = filter(dummyData, (item) => {
      const matchName = includes(item.name.toLowerCase(), name.toLowerCase());
      const matchLocation = locations.length === 0 || locations.includes(item.location);
      return matchName && matchLocation;
    });

    setSearchResults(filteredData);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLocationChange = (checkedValues: any[]) => {
    setLocations(checkedValues);
  };

  return (
    <div>
      <Input placeholder="Search by name" value={name} onChange={handleNameChange} style={{ width: 200 }} />
      <Checkbox.Group onChange={handleLocationChange}>
        <Checkbox value="New York">New York</Checkbox>
        <Checkbox value="London">London</Checkbox>
        <Checkbox value="Paris">Paris</Checkbox>
      </Checkbox.Group>
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>

      <List
        dataSource={searchResults}
        renderItem={(item) => (
          <List.Item>
            <span>{item.name}</span>
            <span>{item.location}</span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Search;
