import axios from 'axios'

const url = 'https://truestack.onrender.com' //наш бекенд



export const fetchArticles = async () => {
    const response = await axios.get(`${url}/articles`);
      return response
    }

const config = {
     params: {
        'sortBy': 'rate',
     }
    }
export const fetchPopularArticles = async () => {
    const response = await axios.get(`${url}/articles`, config);
      return response
    }






 