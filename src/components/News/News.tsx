//CORE
import { FC } from "react"
//STYLES
import nm from "./News.module.css"

type NewsT = {
}

const News: FC<NewsT> = () => {
    return (
        <div className={nm.item}>
            <p>News</p>
        </div>
    );
}

export default News;