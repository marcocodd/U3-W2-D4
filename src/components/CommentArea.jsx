import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // }
const [comments, setComments] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError]=useState(false)
  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }
  useEffect(() => {
   const fetchComments = () => {
    setIsLoading(true);
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
     headers: {
      Authorization:
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiYTg1MDViMjYxNTAwMTk4YTY5NjkiLCJpYXQiOjE3MDY3OTcxMzYsImV4cCI6MTcwODAwNjczNn0.g8GkMnP6jl2Xm1PTrGmbj0dGDqT3zWqs43Wa5yL3BSA",
     },
    })
     .then((response) => {
      if (response.ok) {
       return response.json();
      } else {
       setIsLoading(false);
       setIsError(true);
       throw new Error("Errore durante il recupero dei dati");
      }
     })
     .then((comments) => {
      setComments(comments);
      setIsLoading(false);
      setIsError(false);
     })
     .catch((error) => {
      console.error("Errore:", error);
      setIsLoading(false);
      setIsError(true);
     });
   };
   if (props.asin) {
    fetchComments();
   }
  }, [props.asin, comments._id]);
  
  
  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )

}

  


export default CommentArea
