import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

function CardModule(props) {
  const {data} = props
  return (
    
        <Col md={{span:3}}>
          <Card>
            <Card.Img variant="top" src="https://picsum.photos/300/200" />
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>
               {data.description}
              </Card.Text>
              <Button variant="outline-secondary">Details</Button>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{data.muscle_type}</small>
            </Card.Footer>
          </Card>
        </Col>   
  )
}

export default CardModule