import React from 'react'
import { Card } from "react-bootstrap";



const ProductCard = ({ product }) => {
  return (
    <Card className="my-2 p-2 rounded">
      <div>
        <Card.Img variant="top"
        src={`http://127.0.0.1:8000/static${product.image}`}
        style={{ width: "50%", maxWidth: "1000px", height: "50%" }} />
      </div>

      <Card.Body>
        <div>
          <Card.Title as="div">
            <strong>{product.desc} </strong>
          </Card.Title>
        </div>

       

        <Card.Text as="h3"> ₪ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard