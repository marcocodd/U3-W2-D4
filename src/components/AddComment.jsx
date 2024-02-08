import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
//da modificare
class AddComment extends Component {
  state = {
    comment: {
      comment: '',
      rate: 1,
      elementId: this.props.asin,
    },
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        comment: {
          ...this.state.comment,
          elementId: this.props.asin,
        },
      })
    }
  }

  sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(this.state.comment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiYTg1MDViMjYxNTAwMTk4YTY5NjkiLCJpYXQiOjE3MDY3OTcxMzYsImV4cCI6MTcwODAwNjczNn0.g8GkMnP6jl2Xm1PTrGmbj0dGDqT3zWqs43Wa5yL3BSA',
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        this.setState({
          comment: {
            comment: '',
            rate: 1,
            elementId: this.props.asin,
          },
        })
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
     <div className="my-3">
      <Form data-testid="comment-area" onSubmit={this.sendComment}>
       <Form.Group className="mb-2">
        <Form.Label>Recensione</Form.Label>
        <Form.Control
         type="text"
         placeholder="Inserisci qui il testo"
         value={this.state.comment.comment}
         onChange={(e) =>
          this.setState({
           comment: {
            ...this.state.comment,
            comment: e.target.value,
           },
          })
         }
        />
       </Form.Group>
       <Form.Group className="mb-2">
        <Form.Label>Valutazione</Form.Label>
        <Form.Control
         as="select"
         value={this.state.comment.rate}
         onChange={(e) =>
          this.setState({
           comment: {
            ...this.state.comment,
            rate: e.target.value,
           },
          })
         }
        >
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
        </Form.Control>
       </Form.Group>
       <Button variant="primary" type="submit">
        Invia
       </Button>
      </Form>
     </div>
    );
  }
}

export default AddComment
