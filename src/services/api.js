import axios from 'axios'

const url = 'https://truestack.onrender.com/articles'


export const fetchArticles = async () => {
    const response = await axios.get(url);
      return response
    }

const config = {
     params: {
        'sortBy': 'rate',
     }
    }
export const fetchPopularArticles = async () => {
    const response = await axios.get(url, config);
      return response
    }






 