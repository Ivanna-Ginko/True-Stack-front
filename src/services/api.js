import axios from 'axios'


const fetchArticles = async () => {
    const response = await axios.get(
        "https://truestack.onrender.com/articles"
      );
      return response
    }




export default fetchArticles;