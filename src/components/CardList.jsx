import React, { useState, useEffect } from "react";
import Search from './Search';
import Card from './Card';
import Button from './Button';

const limit = 10; // Products per page

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  // Handle pagination
  const handlePaginate = (direction) => {
    if (direction === "next") {
      setOffset(prev => prev + limit);
    } else if (direction === "previous") {
      setOffset(prev => Math.max(0, prev - limit));
    }
  };

  // Update products when offset changes
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  // Filter products by tags
  const filterTags = (searchTerm) => {
    const filteredProducts = data.filter(product => 
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setOffset(0);
    setProducts(filteredProducts.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />

      {/* Products Section */}
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => handlePaginate('previous')} 
          disabled={offset === 0}
        />
        <Button 
          text="Next" 
          handleClick={() => handlePaginate('next')} 
          disabled={offset + limit >= data.length}
        />
      </div>
    </div>
  );
}

export default CardList;
