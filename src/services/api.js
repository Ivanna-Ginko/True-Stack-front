import axios from 'axios'



export const fetchArticles = async () => {
    const response = await axios.get("https://truestack.onrender.com/articles");
      return response
    }

const config = {
     params: {
        'sortBy': 'rate',
     }
    }
export const fetchPopularArticles = async () => {
    const response = await axios.get("https://truestack.onrender.com/articles", config);
      return response
    }






 