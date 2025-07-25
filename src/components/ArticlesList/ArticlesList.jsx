import React from 'react'
import ArticlesItem from '../ArticlesItem/ArticlesItem'
import LoadMore from '../LoadMore/LoadMore'

const ArticlesList = () => {
  return (
    <>
        <h1>Articlelist</h1>
        <ArticlesItem id = '1' image='https://unsplash.com/photos/programming-code-abstract-technology-background-of-software-developer-and-computer-script-ltpb_WinC3Y' author='Clark' title='When Anxiety Feels Like a Room With No Doors' description='A deeply personal reflection on living with generalized anxiety and the small rituals that help reclaim control, one breath at a time.'/>
        <LoadMore />
    </>
  )
}

export default ArticlesList